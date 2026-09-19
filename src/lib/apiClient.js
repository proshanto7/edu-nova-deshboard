const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRequest = async (
  endpoint,
  method = "GET",
  data = null
) => {
  if (!BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing. Please check your .env.local file."
    );
  }

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  const isFormData =
    typeof FormData !== "undefined" &&
    data instanceof FormData;

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers,
  };

  if (data !== null && method !== "GET") {
    options.body = isFormData
      ? data
      : JSON.stringify(data);
  }

  try {
    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      options
    );

    let result = null;

    const contentType =
      response.headers.get("content-type");

    if (
      contentType &&
      contentType.includes("application/json")
    ) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = text || null;
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          result?.error ||
          `Request failed with status ${response.status}`
      );
    }

    return result;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
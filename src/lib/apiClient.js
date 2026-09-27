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
      const error = new Error(
        result?.message ||
          result?.error ||
          `Request failed with status ${response.status}`
      );
      error.status = response.status;
      error.data = result;
      throw error;
    }

    return result;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

/**
 * File upload (FormData) er jonno — fetch() diye upload progress track kora jay na,
 * tai eta XMLHttpRequest use kore. Baki shob (auth header, error shape) apiRequest-er
 * moto-i rakha hoyeche, shudhu progress ta extra.
 *
 * onProgress(percent) — 0 theke 100 porjonto call hote thake, upload cholakalin.
 */
export const uploadWithProgress = (endpoint, formData, method = "POST", onProgress) => {
  if (!BASE_URL) {
    return Promise.reject(
      new Error("NEXT_PUBLIC_API_URL is missing. Please check your .env.local file.")
    );
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${BASE_URL}${endpoint}`);

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    // Upload (browser -> backend) er percent — video Cloudinary-e jaowar percent na,
    // eta shudhu browser theke tomar server porjonto koto porjonto upload hobe.
    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      let result = null;
      try {
        result = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      } catch {
        result = xhr.responseText || null;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(result);
      } else {
        const error = new Error(
          result?.message || result?.error || `Request failed with status ${xhr.status}`
        );
        error.status = xhr.status;
        error.data = result;
        reject(error);
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during upload"));
    };

    xhr.send(formData);
  });
};
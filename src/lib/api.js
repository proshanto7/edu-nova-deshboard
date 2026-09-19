import { apiRequest } from "./apiClient";

// ======================================================
// HELPER
// ======================================================

const toQueryString = (params = {}) => {
  const cleanedParams = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null && value !== "",
  );

  const queryString = new URLSearchParams(cleanedParams).toString();

  return queryString ? `?${queryString}` : "";
};
// ======================================================
// AUTH
// ======================================================

export const registerUser = (data) => apiRequest("/auth/register", "POST", data);
export const loginUser = (data) => apiRequest("/auth/login", "POST", data);
export const logoutUser = () => apiRequest("/auth/logout", "POST");
export const verifyEmailOtp = (data) => apiRequest("/auth/verify-email", "POST", data);
export const resendVerification = (data) => apiRequest("/auth/resend-verification", "POST", data);

// Step 1: email → OTP পাঠানো
export const forgotPassword = (data) => apiRequest("/auth/forgot-password", "POST", data);

// Step 2: email + OTP → resetToken পাওয়া (🆕 আগে ছিল না)
export const verifyResetOtp = (data) => apiRequest("/auth/verify-reset-otp", "POST", data);

// Step 3: resetToken + newPassword → password change (🔧 signature বদলানো, token আর URL param না)
export const resetPassword = (data) => apiRequest("/auth/reset-password", "POST", data);

// ======================================================
// USER - SELF
// ======================================================

export const getMe = () => apiRequest("/auth/me");
export const updateMe = (data) => apiRequest("/auth/me", "PATCH", data);
export const changePassword = (data) => apiRequest("/auth/change-password", "PATCH", data);
export const deactivateMe = () => apiRequest("/auth/me", "DELETE");

// ======================================================
// USERS - ADMIN (🔧 prefix /user থেকে /auth এ বদলানো)
// ======================================================

export const getAllUsers = (params = {}) => apiRequest(`/auth${toQueryString(params)}`);
export const updateUserRole = (id, data) => apiRequest(`/auth/${id}/role`, "PATCH", data);

// ======================================================
// CATEGORIES
// ======================================================

export const getCategories = (params = {}) => {
  return apiRequest(`/category${toQueryString(params)}`);
};

export const getCategory = (id) => {
  return apiRequest(`/category/${id}`);
};

export const getCategoryBySlug = (slug) => {
  return apiRequest(`/category/slug/${slug}`);
};

export const createCategory = (data) => {
  return apiRequest("/category", "POST", data);
};

export const updateCategory = (id, data) => {
  return apiRequest(`/category/${id}`, "PATCH", data);
};

export const deleteCategory = (id) => {
  return apiRequest(`/category/${id}`, "DELETE");
};

// ======================================================
// COURSES
// ======================================================

export const getCourses = (params = {}) => {
  return apiRequest(`/course${toQueryString(params)}`);
};

export const getCourse = (id) => {
  return apiRequest(`/course/${id}`);
};

export const getCourseBySlug = (slug) => {
  return apiRequest(`/course/slug/${slug}`);
};

export const createCourse = (data) => {
  return apiRequest("/course", "POST", data);
};

export const updateCourse = (id, data) => {
  return apiRequest(`/course/${id}`, "PATCH", data);
};

export const deleteCourse = (id) => {
  return apiRequest(`/course/${id}`, "DELETE");
};

// ======================================================
// LESSONS
// ======================================================

export const getLessonsForCourse = (courseId) => {
  return apiRequest(`/lesson/course/${courseId}`);
};

export const getLesson = (id) => {
  return apiRequest(`/lesson/${id}`);
};

export const createLesson = (data) => {
  return apiRequest("/lesson", "POST", data);
};

export const updateLesson = (id, data) => {
  return apiRequest(`/lesson/${id}`, "PATCH", data);
};

export const deleteLesson = (id) => {
  return apiRequest(`/lesson/${id}`, "DELETE");
};

// ======================================================
// ENROLLMENTS
// ======================================================

export const enrollStudent = (data) => {
  return apiRequest("/enrollment", "POST", data);
};

export const revokeEnrollment = (id) => {
  return apiRequest(`/enrollment/${id}/revoke`, "PATCH");
};

export const getCourseEnrollments = (courseId) => {
  return apiRequest(`/enrollment/course/${courseId}`);
};

export const getMyEnrollments = () => {
  return apiRequest("/enrollment/my");
};

// ======================================================
// PROGRESS
// ======================================================

export const markLessonComplete = (data) => {
  return apiRequest("/progress/complete", "POST", data);
};

export const markLessonIncomplete = (lessonId) => {
  return apiRequest(`/progress/${lessonId}`, "DELETE");
};

export const getMyCourseProgress = (courseId) => {
  return apiRequest(`/progress/course/${courseId}`);
};

export const getMyOverallProgress = () => {
  return apiRequest("/progress/my-overview");
};

export const getStudentProgressForCourse = (courseId, studentId) => {
  return apiRequest(`/progress/course/${courseId}/student/${studentId}`);
};

// ======================================================
// DASHBOARD
// ======================================================

export const getDashboardSummary = () => {
  return apiRequest("/dashboard/summary");
};

// ======================================================
// ACTIVITY LOG
// ======================================================

export const getActivityLogs = (params = {}) => {
  return apiRequest(`/activity-log${toQueryString(params)}`);
};

export const getLogsForTarget = (targetType, targetId) => {
  return apiRequest(`/activity-log/${targetType}/${targetId}`);
};

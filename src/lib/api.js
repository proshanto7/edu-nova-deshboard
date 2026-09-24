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

export const registerUser = (data) =>
  apiRequest("/auth/register", "POST", data);
export const loginUser = (data) => apiRequest("/auth/login", "POST", data);
export const logoutUser = () => apiRequest("/auth/logout", "POST");
export const verifyEmailOtp = (data) =>
  apiRequest("/auth/verify-email", "POST", data);
export const resendVerification = (data) =>
  apiRequest("/auth/resend-verification", "POST", data);

// Step 1: email → OTP Sent
export const forgotPassword = (data) =>
  apiRequest("/auth/forgot-password", "POST", data);

// Step 2: email + OTP → resetToken sent
export const verifyResetOtp = (data) =>
  apiRequest("/auth/verify-reset-otp", "POST", data);

// Step 3: resetToken + newPassword → password change 
export const resetPassword = (data) =>
  apiRequest("/auth/reset-password", "POST", data);

// ======================================================
// USER - SELF
// ======================================================

export const getMe = () => apiRequest("/auth/me");
export const updateMe = (data) => apiRequest("/auth/me", "PATCH", data);
export const changePassword = (data) =>
  apiRequest("/auth/change-password", "PATCH", data);
export const deactivateMe = () => apiRequest("/auth/me", "DELETE");

// ======================================================
// USERS - ADMIN ONLY
// ======================================================

export const getAllUsers = (params = {}) =>
  apiRequest(`/auth${toQueryString(params)}`);
export const updateUserRole = (id, data) =>
  apiRequest(`/auth/${id}/role`, "PATCH", data);
export const updateUserStatus = (id, isActive) =>
  apiRequest(`/auth/${id}/status`, "PATCH", { isActive });

// Create, Update, Delete user - ADMIN ONLY
export const createUser = (data) => apiRequest("/auth", "POST", data);
export const updateUser = (id, data) =>
  apiRequest(`/auth/${id}`, "PATCH", data);
export const deleteUser = (id) => apiRequest(`/auth/${id}`, "DELETE");

// ======================================================
// CATEGORIES
// ======================================================

export const getCategories = (params = {}) => {
  return apiRequest(`/categories${toQueryString(params)}`);
};

export const getCategory = (id) => {
  return apiRequest(`/categories/${id}`);
};

export const getCategoryBySlug = (slug) => {
  return apiRequest(`/categories/slug/${slug}`);
};

export const createCategory = (data) => {
  return apiRequest("/categories", "POST", data);
};

export const updateCategory = (id, data) => {
  return apiRequest(`/categories/${id}`, "PATCH", data);
};

export const deleteCategory = (id) => {
  return apiRequest(`/categories/${id}`, "DELETE");
};

// ======================================================
// COURSES
// ======================================================

export const getCourses = (params = {}) => {
  return apiRequest(`/courses${toQueryString(params)}`);
};

export const getCourse = (id) => {
  return apiRequest(`/courses/${id}`);
};

export const getCourseBySlug = (slug) => {
  return apiRequest(`/courses/slug/${slug}`);
};

export const createCourse = (data) => {
  return apiRequest("/courses", "POST", data);
};

export const updateCourse = (id, data) => {
  return apiRequest(`/courses/${id}`, "PATCH", data);
};

export const deleteCourse = (id) => {
  return apiRequest(`/courses/${id}`, "DELETE");
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

export const getStudentEnrollments = (studentId) =>
  apiRequest(`/enrollment/student/${studentId}`);

// ======================================================
// ENROLLMENT REQUESTS (student request -> admin approval)
// ======================================================

// params.status = "pending" | "approved" | "rejected" (na dile shob request)
export const getEnrollmentRequests = (params = {}) => {
  return apiRequest(`/enrollment-request${toQueryString(params)}`);
};

// Approve korle backend nijei Enrollment create kore dey
export const approveEnrollmentRequest = (id) => {
  return apiRequest(`/enrollment-request/${id}/approve`, "PATCH");
};

// reason optional — reviewNote hishebe save hoy
export const rejectEnrollmentRequest = (id, reason = "") => {
  return apiRequest(`/enrollment-request/${id}/reject`, "PATCH", { reason });
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

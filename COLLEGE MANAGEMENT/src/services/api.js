const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status} ${text}`);
  }
  return res.json();
}

// Students
export const fetchStudents = () => request("/students");
export const fetchStudent = (id) => request(`/students/${id}`);
export const createStudent = (payload) => request("/students", { method: "POST", body: JSON.stringify(payload) });
export const updateStudent = (id, payload) => request(`/students/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteStudent = (id) => request(`/students/${id}`, { method: "DELETE" });

// Courses
export const fetchCourses = () => request("/courses");
export const createCourse = (payload) => request("/courses", { method: "POST", body: JSON.stringify(payload) });
export const updateCourse = (id, payload) => request(`/courses/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteCourse = (id) => request(`/courses/${id}`, { method: "DELETE" });

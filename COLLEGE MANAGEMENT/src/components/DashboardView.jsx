import React from "react";
import { Users, BookOpen } from "lucide-react";

export default function DashboardView({ students = [], courses = [] }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-3 mb-4">CMS Dashboard</h2>
      <p className="text-gray-600">Welcome to the College Management System.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-5 shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-indigo-600">Total Students</p>
            <p className="text-4xl font-extrabold text-indigo-900">{students.length}</p>
          </div>
          <Users className="w-10 h-10 text-indigo-400" />
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5 shadow-md flex items-center justify-between">
          <div>
            <p className="text-lg font-medium text-green-600">Total Courses</p>
            <p className="text-4xl font-extrabold text-green-900">{courses.length}</p>
          </div>
          <BookOpen className="w-10 h-10 text-green-400" />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Recent Activity Summary</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            Latest registered student: <span className="font-medium text-indigo-700">{students[0]?.name ?? "N/A"}</span>
          </li>
          <li>
            Last added course: <span className="font-medium text-green-700">{courses[0]?.name ?? "N/A"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

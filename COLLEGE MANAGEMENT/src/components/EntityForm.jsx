import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function EntityForm({ entityType, currentEntity, onSave, onCancel }) {
  const isStudent = entityType === "Student";

  // initial skeleton for a NEW entity (no DB id)
  const newTemplate = isStudent
    ? { name: "", major: "", studentId: `S-${uuidv4().slice(0, 8)}` }
    : { name: "", instructor: "", courseCode: `C-${uuidv4().slice(0, 8)}` };

  const [formData, setFormData] = useState(currentEntity ? currentEntity : newTemplate);

  useEffect(() => {
    // When currentEntity changes, set the form. Otherwise for add, set a fresh template.
    setFormData(currentEntity ? currentEntity : newTemplate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For create: do NOT include DB `id`. For update: ensure id is present.
    const payload = { ...formData };
    // Remove any helper props (like __type)
    delete payload.__type;
    onSave(payload);
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-2xl border border-indigo-100">
      <h3 className="text-2xl font-bold mb-6 text-indigo-700">
        {currentEntity ? `Edit ${entityType}` : `Add New ${entityType}`}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">{entityType} Name:</span>
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg p-2.5"
            placeholder={isStudent ? "E.g., Jane Doe" : "E.g., Intro to React"}
          />
        </label>

        {isStudent ? (
          <>
            <label className="block">
              <span className="text-gray-700 font-medium">Student ID (Unique):</span>
              <input
                name="studentId"
                value={formData.studentId || ""}
                readOnly
                className="mt-1 block w-full rounded-lg bg-gray-50 p-2.5 text-gray-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium">Major:</span>
              <input
                name="major"
                value={formData.major || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg p-2.5"
                placeholder="E.g., Computer Science"
              />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className="text-gray-700 font-medium">Course Code (Unique):</span>
              <input
                name="courseCode"
                value={formData.courseCode || ""}
                readOnly
                className="mt-1 block w-full rounded-lg bg-gray-50 p-2.5 text-gray-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium">Instructor:</span>
              <input
                name="instructor"
                value={formData.instructor || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg p-2.5"
                placeholder="E.g., Dr. Smith"
              />
            </label>
          </>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 text-white bg-indigo-600 rounded-lg">
            Save {entityType}
          </button>
        </div>
      </form>
    </div>
  );
}

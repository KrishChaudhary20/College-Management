import React from "react";
import { PlusCircle, Trash2, Edit2 } from "lucide-react";

export default function EntityListView({ entityType, data = [], onAdd, onEdit, onDelete }) {
  const isStudent = entityType === "Student";
  const header = isStudent ? ["ID", "Name", "Major", "Actions"] : ["Code", "Name", "Instructor", "Actions"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">{entityType} Management</h2>
        <button onClick={onAdd} className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
          <PlusCircle className="w-5 h-5" />
          <span>Add New {entityType}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        {data.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No {entityType.toLowerCase()}s found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>{header.map((h, i) => <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-50/30">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{isStudent ? item.studentId : item.courseCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{isStudent ? item.major : item.instructor}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => onEdit(item)} className="text-indigo-600 p-1 rounded-full hover:bg-indigo-100"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => onDelete(item.id)} className="text-red-600 p-1 rounded-full hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

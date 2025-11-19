import React, { useState, useEffect } from "react";
import DashboardView from "./components/DashboardView";
import EntityListView from "./components/EntityListView";
import EntityForm from "./components/EntityForm";
import {
  fetchStudents,
  fetchCourses,
  createStudent,
  updateStudent,
  deleteStudent,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./services/api";
import { LayoutDashboard, Users, BookOpen } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [s, c] = await Promise.all([fetchStudents(), fetchCourses()]);
      setStudents(s);
      setCourses(c);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSaveStudent = async (student) => {
    try {
      if (student.id) {
        // update by DB id
        await updateStudent(student.id, {
          name: student.name,
          major: student.major,
          studentId: student.studentId, // optional
        });
      } else {
        await createStudent({
          name: student.name,
          major: student.major,
          studentId: student.studentId,
        });
      }
      await loadAll();
      setCurrentEdit(null);
      setActiveView("students");
    } catch (err) {
      console.error("Save student failed:", err);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Delete student?")) return;
    try {
      await deleteStudent(id);
      await loadAll();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSaveCourse = async (course) => {
    try {
      if (course.id) {
        await updateCourse(course.id, {
          name: course.name,
          instructor: course.instructor,
          courseCode: course.courseCode,
        });
      } else {
        await createCourse({
          name: course.name,
          instructor: course.instructor,
          courseCode: course.courseCode,
        });
      }
      await loadAll();
      setCurrentEdit(null);
      setActiveView("courses");
    } catch (err) {
      console.error("Save course failed:", err);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    try {
      await deleteCourse(id);
      await loadAll();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (entity, type) => {
    // set entity (must include DB id)
    setCurrentEdit({ ...entity, __type: type });
    if (type === "Student") setActiveView("students");
    else setActiveView("courses");
  };

  const renderView = () => {
    if (loading) {
      return <div className="p-8 bg-white rounded-xl shadow">Loading...</div>;
    }

    if (activeView === "addStudent" || (activeView === "students" && currentEdit && currentEdit.__type === "Student")) {
      return (
        <EntityForm
          entityType="Student"
          currentEntity={currentEdit && currentEdit.__type === "Student" ? currentEdit : null}
          onSave={handleSaveStudent}
          onCancel={() => {
            setCurrentEdit(null);
            setActiveView("students");
          }}
        />
      );
    }

    if (activeView === "addCourse" || (activeView === "courses" && currentEdit && currentEdit.__type === "Course")) {
      return (
        <EntityForm
          entityType="Course"
          currentEntity={currentEdit && currentEdit.__type === "Course" ? currentEdit : null}
          onSave={handleSaveCourse}
          onCancel={() => {
            setCurrentEdit(null);
            setActiveView("courses");
          }}
        />
      );
    }

    switch (activeView) {
      case "students":
        return (
          <EntityListView
            entityType="Student"
            data={students}
            onAdd={() => {
              setCurrentEdit(null);
              setActiveView("addStudent");
            }}
            onEdit={(item) => handleEdit(item, "Student")}
            onDelete={(id) => handleDeleteStudent(id)}
          />
        );

      case "courses":
        return (
          <EntityListView
            entityType="Course"
            data={courses}
            onAdd={() => {
              setCurrentEdit(null);
              setActiveView("addCourse");
            }}
            onEdit={(item) => handleEdit(item, "Course")}
            onDelete={(id) => handleDeleteCourse(id)}
          />
        );

      case "dashboard":
      default:
        return <DashboardView students={students} courses={courses} />;
    }
  };

  const NavButton = ({ view, label, Icon }) => (
    <button
      onClick={() => {
        setActiveView(view);
        setCurrentEdit(null);
      }}
      className={`flex items-center space-x-2 py-3 px-4 rounded-lg font-medium transition duration-200 w-full justify-start
        ${activeView === view ? "bg-indigo-600 text-white shadow-lg" : "text-indigo-200 hover:bg-indigo-700 hover:text-white"}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="lg:flex">
        <aside className="lg:w-64 bg-indigo-800 text-white p-5 lg:min-h-screen shadow-2xl">
          <h1 className="text-3xl font-extrabold mb-8 text-white tracking-wider">CMS Pro</h1>

          <nav className="space-y-2">
            <NavButton view="dashboard" label="Dashboard" Icon={LayoutDashboard} />
            <NavButton view="students" label="Students" Icon={Users} />
            <NavButton view="courses" label="Courses" Icon={BookOpen} />
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">{renderView()}</div>
        </main>
      </div>
    </div>
  );
}

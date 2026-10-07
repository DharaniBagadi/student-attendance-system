import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  };

  const markAttendance = (id, status) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return {
          ...student,
          present: status,
          attendanceMarked: true,
        };
      }

      return student;
    });

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );
  };

  return (
    <div className="page">

      {/* Header */}

      <header className="header">

        <div className="logo-container">
          <img
            src="https://img.utdstc.com/icon/1c3/8d3/1c38d34aad48ca4255a01abbfcec4b63cbaf6dcc815ff46166365f8cb98c0e7f:600"
            alt="Logo"
            className="logo"
          />
        </div>

        <div>
          <h1>Student Attendance System</h1>
          <p>Mark Student Attendance</p>
        </div>

      </header>

      <main className="container">

        {/* Page Header */}

        <div className="page-top">

          <div>
            <h2>Student Attendance</h2>

            <p className="attendance-instruction">
              Mark each student as Present or Absent.
            </p>
          </div>

          <Link
            to="/"
            className="back-button"
          >
            ← Dashboard
          </Link>

        </div>

        {/* Student Table */}

        <div className="student-table">

          <table>

            <thead>

              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Attendance</th>
              </tr>

            </thead>

            <tbody>

              {students.length > 0 ? (

                students.map((student) => (

                  <tr key={student.id}>

                    <td>
                      {student.rollNo}
                    </td>

                    <td>
                      <strong>
                        {student.name}
                      </strong>
                    </td>

                    <td>
                      {student.course || "CSE"}
                    </td>

                    <td>

                      <div className="attendance-buttons">

                        {/* Present Button */}

                        <button
                          className={
                            student.present
                              ? "attendance-btn present-btn selected"
                              : "attendance-btn present-btn"
                          }
                          onClick={() =>
                            markAttendance(
                              student.id,
                              true
                            )
                          }
                        >
                          ✓ Present
                        </button>

                        {/* Absent Button */}

                        <button
                          className={
                            !student.present
                              ? "attendance-btn absent-btn selected"
                              : "attendance-btn absent-btn"
                          }
                          onClick={() =>
                            markAttendance(
                              student.id,
                              false
                            )
                          }
                        >
                          ✕ Absent
                        </button>

                      </div>

                      {/* Current Status */}

                      <div className="current-status">

                        Status:

                        <strong
                          className={
                            student.present
                              ? "status-present"
                              : "status-absent"
                          }
                        >
                          {student.present
                            ? " Present"
                            : " Absent"}
                        </strong>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    className="no-data"
                  >
                    No students added yet.

                    <br />

                    <Link to="/add-student">
                      Add New Student
                    </Link>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Students;
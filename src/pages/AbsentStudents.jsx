import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function AbsentStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const savedStudents =
      localStorage.getItem("students");

    if (savedStudents) {

      const allStudents =
        JSON.parse(savedStudents);

      const absent =
        allStudents.filter(
          (student) => !student.present
        );

      setStudents(absent);
    }

  }, []);

  return (

    <div className="page">

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

          <p>Absent Students</p>

        </div>

      </header>

      <main className="container">

        <div className="page-top">

          <h2>Absent Students</h2>

          <Link
            to="/"
            className="back-button"
          >
            ← Back to Dashboard
          </Link>

        </div>

        <div className="student-table">

          <table>

            <thead>

              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Status</th>
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
                      {student.name}
                    </td>

                    <td>

                      <span className="status absent-status">
                        Absent
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="no-data"
                  >
                    No absent students
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

export default AbsentStudents;
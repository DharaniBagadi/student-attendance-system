import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      const defaultStudents = [
        {
          id: 1,
          name: "Rahul Kumar",
          rollNo: "101",
          present: true,
        },
        {
          id: 2,
          name: "Priya Sharma",
          rollNo: "102",
          present: false,
        },
        {
          id: 3,
          name: "Arun Kumar",
          rollNo: "103",
          present: true,
        },
        {
          id: 4,
          name: "Sneha Reddy",
          rollNo: "104",
          present: false,
        },
      ];

      setStudents(defaultStudents);

      localStorage.setItem(
        "students",
        JSON.stringify(defaultStudents)
      );
    }
  }, []);

  const totalStudents = students.length;

  const presentStudents = students.filter(
    (student) => student.present
  ).length;

  const absentStudents = students.filter(
    (student) => !student.present
  ).length;

  const attendance =
    totalStudents === 0
      ? 0
      : Math.round(
          (presentStudents / totalStudents) * 100
        );

  return (
    <div className="app">

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
          <p>Manage student attendance easily</p>
        </div>

      </header>

      <main className="container">

        <h2 className="dashboard-title">
          Dashboard
        </h2>

        <div className="dashboard">

          {/* Total Students */}

          <Link
            to="/students"
            className="dashboard-link"
          >
            <div className="card clickable">

              <h3>Total Students</h3>

              <p>{totalStudents}</p>

              <span>
                View Students →
              </span>

            </div>
          </Link>

          {/* Present */}

          <Link
            to="/present"
            className="dashboard-link"
          >
            <div className="card present-card clickable">

              <h3>Present</h3>

              <p>{presentStudents}</p>

              <span>
                View Present →
              </span>

            </div>
          </Link>

          {/* Absent */}

          <Link
            to="/absent"
            className="dashboard-link"
          >
            <div className="card absent-card clickable">

              <h3>Absent</h3>

              <p>{absentStudents}</p>

              <span>
                View Absent →
              </span>

            </div>
          </Link>

          {/* Attendance */}

          <div className="card percentage-card">

            <h3>Attendance</h3>

            <p>{attendance}%</p>

          </div>

           <Link
           to="/add-student"
           className="dashboard-link">
           <div className="card add-student-card-dashboard clickable">

           <h3>Add New Student</h3>

           <p>+</p>

           <span>
           Add Student →
           </span>

            </div>
          </Link>

          

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
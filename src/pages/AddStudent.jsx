import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function AddStudent() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !rollNo || !email || !phone || !course) {
      alert("Please fill all fields.");
      return;
    }

    const savedStudents =
      localStorage.getItem("students");

    const students = savedStudents
      ? JSON.parse(savedStudents)
      : [];

    const rollExists = students.some(
      (student) => student.rollNo === rollNo
    );

    if (rollExists) {
      alert("This roll number already exists.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      rollNo: rollNo,
      email: email,
      phone: phone,
      course: course,
      present: false,
      totalClasses: 1,
    };

    students.push(newStudent);

    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );

    alert("Student added successfully!");

    setName("");
    setRollNo("");
    setEmail("");
    setPhone("");
    setCourse("");

    navigate("/students");
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
          <p>Add New Student</p>
        </div>

      </header>

      {/* Main */}

      <main className="container">

        <div className="page-top">

          <h2>Add New Student</h2>

          <Link
            to="/"
            className="back-button"
          >
            ← Back to Dashboard
          </Link>

        </div>

        <div className="add-student-card">

          <form
            onSubmit={handleSubmit}
            className="add-student-form"
          >

            {/* Name */}

            <div className="form-group">

              <label>
                Student Name
              </label>

              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            {/* Roll Number */}

            <div className="form-group">

              <label>
                Roll Number
              </label>

              <input
                type="text"
                placeholder="Enter roll number"
                value={rollNo}
                onChange={(e) =>
                  setRollNo(e.target.value)
                }
              />

            </div>

            {/* Email */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            {/* Phone */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

            {/* Course */}

            <div className="form-group">

              <label>
                Course / Department
              </label>

              <select
                value={course}
                onChange={(e) =>
                  setCourse(e.target.value)
                }
              >

                <option value="">
                  Select Course
                </option>

                <option value="CSE">
                  Computer Science
                </option>

                <option value="ECE">
                  Electronics
                </option>

                <option value="EEE">
                  Electrical
                </option>

                <option value="MECH">
                  Mechanical
                </option>

                <option value="CIVIL">
                  Civil
                </option>

                <option value="AI & DS">
                  AI & Data Science
                </option>

              </select>

            </div>

            {/* Buttons */}

            <div className="form-buttons">

              <button
                type="submit"
                className="add-button"
              >
                Add Student
              </button>

              <Link
                to="/students"
                className="cancel-button"
              >
                Cancel
              </Link>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddStudent;
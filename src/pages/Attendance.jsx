import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Load students from localStorage
  useEffect(() => {
    const storedStudents = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    setStudents(storedStudents);

    loadAttendance(selectedDate, storedStudents);
  }, []);

  // Load attendance for selected date
  const loadAttendance = (date, studentList = students) => {
    const storedAttendance = JSON.parse(
      localStorage.getItem(`attendance-${date}`) || "{}"
    );

    const newAttendance = {};

    studentList.forEach((student) => {
      const studentId = student.id || student.email || student.name;

      newAttendance[studentId] =
        storedAttendance[studentId] || "Absent";
    });

    setAttendance(newAttendance);
  };

  // Change date
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    loadAttendance(date);
  };

  // Mark student Present / Absent
  const markAttendance = (student, status) => {
    const studentId = student.id || student.email || student.name;

    const updatedAttendance = {
      ...attendance,
      [studentId]: status,
    };

    setAttendance(updatedAttendance);

    localStorage.setItem(
      `attendance-${selectedDate}`,
      JSON.stringify(updatedAttendance)
    );
  };

  // Save all attendance
  const saveAttendance = () => {
    localStorage.setItem(
      `attendance-${selectedDate}`,
      JSON.stringify(attendance)
    );

    alert("Attendance saved successfully!");
  };

  const presentCount = Object.values(attendance).filter(
    (status) => status === "Present"
  ).length;

  const absentCount = Object.values(attendance).filter(
    (status) => status === "Absent"
  ).length;

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div>
          <h1>Student Attendance</h1>
          <p>Mark attendance for each student</p>
        </div>

        <div className="date-section">
          <label>Select Date</label>

          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="attendance-summary">
        <div className="summary-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="summary-card">
          <h3>Present</h3>
          <p>{presentCount}</p>
        </div>

        <div className="summary-card">
          <h3>Absent</h3>
          <p>{absentCount}</p>
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-students">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student, index) => {
                const studentId =
                  student.id || student.email || student.name;

                return (
                  <tr key={studentId}>
                    <td>{index + 1}</td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.phone || "N/A"}</td>

                    <td>
                      <div className="attendance-buttons">
                        <button
                          className={
                            attendance[studentId] === "Present"
                              ? "present active"
                              : "present"
                          }
                          onClick={() =>
                            markAttendance(student, "Present")
                          }
                        >
                          ✓ Present
                        </button>

                        <button
                          className={
                            attendance[studentId] === "Absent"
                              ? "absent active"
                              : "absent"
                          }
                          onClick={() =>
                            markAttendance(student, "Absent")
                          }
                        >
                          ✕ Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      {students.length > 0 && (
        <div className="save-section">
          <button className="save-attendance" onClick={saveAttendance}>
            Save Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;

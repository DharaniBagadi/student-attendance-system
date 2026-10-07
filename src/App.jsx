import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import PresentStudents from "./pages/PresentStudents";
import AbsentStudents from "./pages/AbsentStudents";
import AddStudent from "./pages/AddStudent";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />

        <Route path="/present" element={<PresentStudents />} />

        <Route path="/absent" element={<AbsentStudents />} />

        <Route path="/attendance" element={<Attendance />} />

        <Route path="/add-student" element={<AddStudent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
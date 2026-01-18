import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { AuthProvider } from "../auth/AuthContext";
import { EmployeeProvider } from "../employees/EmployeeContext";
import ProtectedRoute from "../auth/ProtectedRoute";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </EmployeeProvider>
    </AuthProvider>
  );
}

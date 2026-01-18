import { useState } from "react";
import Header from "../component/Header";
import EmployeeTable from "../employees/EmployeeTable";
import EmployeeForm from "../employees/EmployeeForm";
import { useEmployees } from "../employees/EmployeeContext";

export default function Dashboard() {
  const { employees } = useEmployees();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      {/* Top Header */}
      <Header />

      {/* Summary + Action */}
      <div className="header" style={{ marginTop: 20 }}>
        <div className="stats">
          <div className="stat">
            <h4>Total Employees</h4>
            <p>{employees.length}</p>
          </div>

          <div className="stat">
            <h4>Active Employees</h4>
            <p>{employees.filter((e) => e.active).length}</p>
          </div>
        </div>

        {/* ✅ ADD EMPLOYEE BUTTON */}
        <button onClick={() => setShowForm(true)}>+ Add Employee</button>
      </div>

      {/* Employee List */}
      <EmployeeTable />

      {/* Add Employee Modal */}
      {showForm && (
        <div className="modal-backdrop">
          <EmployeeForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useEmployees } from "./EmployeeContext";
import EmployeeForm from "./EmployeeForm";
import { Employee } from "./EmployeeContext";

export default function EmployeeTable() {
  const { employees, deleteEmployee, updateEmployee } = useEmployees();
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = employees.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());

    const matchesGender =
      genderFilter === "all" || e.gender.toLowerCase() === genderFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && e.active) ||
      (statusFilter === "inactive" && !e.active);

    return matchesSearch && matchesGender && matchesStatus;
  });

  return (
    <div className="card">
      <div className="filters">
        <input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ marginTop: 16 }}>No employees found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id}>
                {/* ✅ PROFILE IMAGE */}
                <td>
                  <img
                    src={emp.image || "/avatar-placeholder.png"}
                    alt={emp.name}
                    height={80}
                    width={80}
                    className="avatar"
                  />
                </td>

                <td>{emp.name}</td>
                <td>{emp.gender}</td>

                <td>
                  <input
                    type="checkbox"
                    checked={emp.active}
                    onChange={() =>
                      updateEmployee({ ...emp, active: !emp.active })
                    }
                  />
                </td>

                <td className="actions">
                  <button
                    className="secondary"
                    onClick={() => setEditEmployee(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() => {
                      if (confirm("Delete this employee?")) {
                        deleteEmployee(emp.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editEmployee && (
        <div className="modal-backdrop">
          <EmployeeForm
            employee={editEmployee}
            onClose={() => setEditEmployee(null)}
          />
        </div>
      )}
    </div>
  );
}

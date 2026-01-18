import { useState, useRef } from "react";
import { useEmployees } from "./EmployeeContext";
import { Employee } from "./EmployeeContext";
import { v4 as uuid } from "uuid";

interface Props {
  onClose: () => void;
  employee?: Employee | null;
}

export default function EmployeeForm({ onClose, employee }: Props) {
  const { addEmployee, updateEmployee } = useEmployees();

  const [form, setForm] = useState<Employee>(
    employee || {
      id: "",
      name: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      image: "",
    }
  );

  // Track newly created blob URL
  const newImageRef = useRef<string | null>(null);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 300 * 1024) {
      alert("Image must be less than 300KB");
      return;
    }

    const base64 = await toBase64(file);
    setForm((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.gender || !form.dob || !form.state) {
      alert("Please fill all required fields");
      return;
    }

    if (employee) {
      updateEmployee(form);
    } else {
      addEmployee({ ...form, id: uuid() });
    }

    onClose();
  };

  // Cleanup only the newly created image
  const handleClose = () => {
    if (newImageRef.current) {
      URL.revokeObjectURL(newImageRef.current);
    }
    onClose();
  };

  return (
    <div className="modal">
      <h3>{employee ? "Edit Employee" : "Add Employee"}</h3>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />

      <select
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      >
        <option value="">Select State</option>
        <option value="Delhi">Delhi</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
      </select>

      <label className="checkbox">
        Active
        <input
          style={{ width: "20%" }}
          type="checkbox"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
        />
      </label>

      <input type="file" accept="image/*" onChange={handleImage} />

      {form.image && (
        <img
          src={form.image}
          width={60}
          height={60}
          alt="Preview"
          className="preview"
        />
      )}

      <div className="modal-actions">
        <button onClick={handleSubmit}>{employee ? "Update" : "Save"}</button>
        <button className="secondary" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

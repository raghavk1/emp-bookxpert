import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/storage";

export interface Employee {
  id: string;
  name: string;
  gender: string;
  dob: string;
  state: string;
  active: boolean;
  image?: string;
}

interface ContextType {
  employees: Employee[];
  addEmployee: (e: Employee) => void;
  updateEmployee: (e: Employee) => void;
  deleteEmployee: (id: string) => void;
}

const EmployeeContext = createContext<ContextType | null>(null);

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ✅ Load from localStorage on first render
  const [employees, setEmployees] = useState<Employee[]>(() =>
    storage.get<Employee[]>("employees", [])
  );

  // ✅ Persist on every change
  useEffect(() => {
    storage.set("employees", employees);
  }, [employees]);

  const addEmployee = (emp: Employee) => {
    setEmployees((prev) => [...prev, emp]);
  };

  const updateEmployee = (emp: Employee) => {
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? emp : e)));
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const ctx = useContext(EmployeeContext);
  if (!ctx) {
    throw new Error("useEmployees must be used within EmployeeProvider");
  }
  return ctx;
};

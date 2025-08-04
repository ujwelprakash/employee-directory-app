"use client";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $position: String!
    $department: String!
    $salary: Int!
  ) {
    addEmployee(
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
    }
  }
`;

export default function AddEmployeePage() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });

  const router = useRouter();
  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEmployee({
        variables: {
          name: formData.name,
          position: formData.position,
          department: formData.department,
          salary: parseInt(formData.salary),
        },
      });
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {["name", "position", "department", "salary"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 mb-1 capitalize"
            >
              {field}
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={field === "salary" ? "number" : "text"}
              name={field}
              id={field}
              placeholder={`Enter ${field}`}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>

        {error && (
          <p className="text-sm text-red-600 mt-2 text-center">
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
}

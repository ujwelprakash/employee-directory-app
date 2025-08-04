"use client";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GET_EMPLOYEES = gql`
  query GetEmployees {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  const [department, setDepartment] = useState("");
  const router = useRouter();

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        Error: {error.message}
      </p>
    );

  const filteredEmployees = department
    ? data.getAllEmployees.filter((emp: any) => emp.department === department)
    : data.getAllEmployees;

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Employee Directory</h1>
        <button
          onClick={() => router.push("/add")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-all duration-200"
        >
          + Add New Employee
        </button>
      </div>

      <div className="mb-6">
        <select
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow rounded-md">
        <table className="w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Position</th>
              <th className="p-3 border">Department</th>
              <th className="p-3 border text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp: any) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-100 transition-colors duration-150"
              >
                <td className="p-3 border">{emp.name}</td>
                <td className="p-3 border">{emp.position}</td>
                <td className="p-3 border">{emp.department}</td>
                <td className="p-3 border text-center">
                  <Link
                    href={`/employee/${emp.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <p className="mt-4 text-center text-gray-500">
            No employees found for selected department.
          </p>
        )}
      </div>
    </main>
  );
}

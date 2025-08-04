import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import Link from "next/link";

const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export default async function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  if (!isValidObjectId(id)) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-2xl font-semibold mb-3">
          Invalid Employee ID Format
        </h2>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  try {
    const { data } = await client.query({
      query: GET_EMPLOYEE_DETAILS,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    const employee = data?.getEmployeeDetails;

    if (!employee) {
      return (
        <div className="p-8 text-center text-red-600">
          <h2 className="text-2xl font-semibold mb-3">Employee Not Found</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      );
    }

    const formatCurrency = (amount: number) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      }).format(amount);

    return (
      <main className="p-6 sm:p-10 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Employee Details
        </h1>

        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold">Name:</span> {employee.name}
          </p>
          <p>
            <span className="font-semibold">Position:</span> {employee.position}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {employee.department}
          </p>
          <p>
            <span className="font-semibold">Salary:</span>{" "}
            {formatCurrency(employee.salary)}
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  } catch (error: any) {
    return (
      <div className="p-8 text-center text-red-600">
        <h2 className="text-xl font-semibold mb-2">
          Error loading employee: {error.message}
        </h2>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }
}

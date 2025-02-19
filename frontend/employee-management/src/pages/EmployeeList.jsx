import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    });
  }, []);

  // Handle search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterEmployees(value, selectedDepartment);
  };

  // Handle department filter
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    setSelectedDepartment(value);
    filterEmployees(searchTerm, value);
  };

  // Filter employees based on search term and department
  const filterEmployees = (search, department) => {
    let filtered = employees;

    if (search) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(search) ||
          emp.position.toLowerCase().includes(search)
      );
    }

    if (department) {
      filtered = filtered.filter((emp) => emp.department === department);
    }

    setFilteredEmployees(filtered);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Employee List</h1>

      {/* Search & Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name or Position"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-1/3 focus:ring-2 focus:ring-blue-300"
        />

        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="px-4 py-2 border rounded-lg w-1/4"
        >
          <option value="">All Departments</option>
          {Array.from(new Set(employees.map((emp) => emp.department))).map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <Link
          to="/employees/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          + Add Employee
        </Link>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Employee ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">Department</th>
              <th className="py-3 px-6 text-left">Position</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.employeeId} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6">{emp.employeeId}</td>
                  <td className="py-3 px-6">{emp.name}</td>
                  <td className="py-3 px-6">{emp.age}</td>
                  <td className="py-3 px-6">{emp.department}</td>
                  <td className="py-3 px-6">{emp.position}</td>
                  <td className="py-3 px-6 text-center">
                    <Link
                      to={`/employees/edit/${emp.employeeId}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteEmployee(emp.employeeId)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;

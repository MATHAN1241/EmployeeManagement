import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import { Link } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false); // For View Modal

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    });
  }, []);

  const openEmployeeDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  const closeEmployeeDetails = () => {
    setSelectedEmployee(null);
    setShowEmployeeDetails(false);
  };

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

  // Open Delete Confirmation Modal
  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  // Confirm Delete Action
  const confirmDelete = () => {
    if (selectedEmployee) {
      deleteEmployee(selectedEmployee.employeeId).then(() => {
        setEmployees(employees.filter(emp => emp.employeeId !== selectedEmployee.employeeId));
        setFilteredEmployees(filteredEmployees.filter(emp => emp.employeeId !== selectedEmployee.employeeId));
      });
    }
    closeModal();
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
                  <button
                      onClick={() => openEmployeeDetails(emp)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                    >
                      View
                    </button>
                    <Link
                      to={`/employees/edit/${emp.employeeId}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => openDeleteModal(emp)}
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

          {/* Employee Details Modal */}
          {showEmployeeDetails && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            <p><strong>ID:</strong> {selectedEmployee.employeeId}</p>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Age:</strong> {selectedEmployee.age}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Position:</strong> {selectedEmployee.position}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeEmployeeDetails}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;

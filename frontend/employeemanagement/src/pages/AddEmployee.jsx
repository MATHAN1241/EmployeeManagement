import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/employeeService";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    department: "",
    position: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let validationErrors = {};
    if (!employee.name.trim()) {
      validationErrors.name = "Name is required";
    } else if (!isNaN(employee.name)) {
      validationErrors.name = "Name cannot be a number";
    }
    
    if (!employee.age || isNaN(employee.age) || employee.age < 18) {
      validationErrors.age = "Age must be a number and at least 18";
    }
    
    if (!employee.department.trim()) {
      validationErrors.department = "Department is required";
    } else if (!isNaN(employee.department)) {
      validationErrors.department = "Department cannot be a number";
    }
    
    if (!employee.position.trim()) {
      validationErrors.position = "Position is required";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await addEmployee(employee);
    navigate("/employees");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 md:p-6 animate-fade-in">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full max-w-lg">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-gray-800 transition-all mb-4"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Add Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={employee.name} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium">Age:</label>
            <input 
              type="number" 
              name="age" 
              value={employee.age} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-gray-700 font-medium">Department:</label>
            <input 
              type="text" 
              name="department" 
              value={employee.department} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="block text-gray-700 font-medium">Position:</label>
            <input 
              type="text" 
              name="position" 
              value={employee.position} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;

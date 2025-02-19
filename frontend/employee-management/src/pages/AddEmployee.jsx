import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/employeeService";

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
    if (!employee.name) validationErrors.name = "Name is required";
    if (!employee.age || isNaN(employee.age) || employee.age < 18)
      validationErrors.age = "Age must be a number and at least 18";
    if (!employee.department) validationErrors.department = "Department is required";
    if (!employee.position) validationErrors.position = "Position is required";

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
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={employee.age} onChange={handleChange} />
          {errors.age && <span>{errors.age}</span>}
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" value={employee.department} onChange={handleChange} />
          {errors.department && <span>{errors.department}</span>}
        </div>
        <div>
          <label>Position:</label>
          <input type="text" name="position" value={employee.position} onChange={handleChange} />
          {errors.position && <span>{errors.position}</span>}
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;

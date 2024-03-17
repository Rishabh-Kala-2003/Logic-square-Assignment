// AddEmployeeModal.js

import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployeeModal = ({ onClose, onAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    designation: '', // Added designation state
    age: '',
    status: 'Available' // Added status state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate mandatory fields and age as integer
    if (!newEmployee.name || !newEmployee.designation || !newEmployee.age || isNaN(parseInt(newEmployee.age, 10))) {
      alert('Please fill all mandatory fields, and ensure age is a valid integer.');
      return;
    }

    // Call the parent component's function to add the new employee
    onAddEmployee(newEmployee);

    // Close the modal
    onClose();
  };

  return (
    <div className="add-employee-modal">
      <h2>Add Employee</h2>
      <label>
        Name:
        <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
      </label>
      <label>
        Designation:
        <select name="designation" value={newEmployee.designation} onChange={handleInputChange}>
          <option value="">Select Designation</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Testing">Testing</option>
          <option value="Deployment">Deployment</option>
        </select>
      </label>
      <label>
        Age:
        <input type="text" name="age" value={newEmployee.age} onChange={handleInputChange} />
      </label>
      <label>
        Status:
        <select name="status" value={newEmployee.status} onChange={handleInputChange}>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Add Employee</button>
    </div>
  );
};

export default AddEmployeeModal;

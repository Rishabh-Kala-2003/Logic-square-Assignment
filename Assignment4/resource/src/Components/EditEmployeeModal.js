// EditEmployeeModal.js

import React, { useState, useEffect } from 'react';
import './EditEmployeeModal.css';

const EditEmployeeModal = ({ employee, onClose, onUpdateEmployee }) => {
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  useEffect(() => {
    // Update edited employee when the employee prop changes
    setEditedEmployee({ ...employee });
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
  };

  const handleSubmit = () => {
    // Call the parent component's function to update the employee
    onUpdateEmployee(editedEmployee);

    // Close the modal
    onClose();
  };

  return (
    <div className="edit-employee-modal">
      <h2>Edit Employee</h2>
      <label>
        Name:
        <input type="text" name="name" value={editedEmployee.name} onChange={handleInputChange} />
      </label>
      <label>
        Designation:
        <select name="designation" value={editedEmployee.designation} onChange={handleInputChange}>
          <option value="">Select Designation</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Testing">Testing</option>
          <option value="Deployment">Deployment</option>
        </select>
      </label>
      <label>
        Age:
        <input type="text" name="age" value={editedEmployee.age} onChange={handleInputChange} />
      </label>
      <label>
        Status:
        <select name="status" value={editedEmployee.status} onChange={handleInputChange}>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
};

export default EditEmployeeModal;

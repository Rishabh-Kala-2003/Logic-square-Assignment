// EmployeeList.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './EmployeeList.css';

const EmployeeList = ({ employees, onUpdateAvailability, onEditEmployee, onDeleteEmployee }) => {
  const handleEditClick = (employee) => {
    onEditEmployee(employee);
  };

  const handleDeleteClick = (employeeId) => {
    onDeleteEmployee(employeeId);
  };

  return (
    <div className="employee-list-container">
      <ul className="employee-list">
        {employees.map((employee) => (
          <li key={employee.id} className="employee-item">
            <div>
              <p>Name: {employee.name}</p>
              <p>Designation: {employee.designation}</p>
              <p>Age: {employee.age}</p>
              <p>Status: {employee.available ? 'Available' : 'Not Available'}</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleEditClick(employee)}>
                <FontAwesomeIcon icon={faPencilAlt} /> Edit
              </button>
              <button onClick={() => handleDeleteClick(employee.id)}>
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;

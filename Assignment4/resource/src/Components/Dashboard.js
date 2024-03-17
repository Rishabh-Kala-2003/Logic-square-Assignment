// Dashboard.js

import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal'; // Import the EditEmployeeModal component
import './Dashboard.css';

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for showing edit modal
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee to edit

  useEffect(() => {
    // Fetch employees from API or localStorage
    // For now, use dummy data
    const dummyEmployees = [
      { id: 1, name: 'John Doe', designation: 'Frontend Developer', age: 30, available: true },
      { id: 2, name: 'Jane Smith', designation: 'Backend Developer', age: 35, available: false },
      // More employees...
    ];
    setEmployees(dummyEmployees);
    setTotalEmployees(dummyEmployees.length);
    setAvailableEmployees(dummyEmployees.filter(employee => employee.available).length);
  }, []);

  const handleAddEmployee = (newEmployee) => {
    // Validate new employee data
    if (!newEmployee.name || !newEmployee.designation || !newEmployee.age) {
      alert('Please fill all mandatory fields.');
      return;
    }
    if (isNaN(newEmployee.age)) {
      alert('Age must be a valid number.');
      return;
    }

    // Add the new employee
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setTotalEmployees(totalEmployees + 1);
    if (newEmployee.available) {
      setAvailableEmployees(availableEmployees + 1);
    }
    setShowAddModal(false);
    alert('Employee added successfully!');
  };

  const handleEditEmployee = (editedEmployee) => {
    // Find the index of the edited employee
    const index = employees.findIndex(employee => employee.id === editedEmployee.id);
    if (index === -1) {
      alert('Employee not found.');
      return;
    }

    // Update the employee in the list
    const updatedEmployees = [...employees];
    updatedEmployees[index] = editedEmployee;
    setEmployees(updatedEmployees);

    // Close the edit modal
    setShowEditModal(false);
    alert('Employee details updated successfully!');
  };

  const handleDeleteEmployee = (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    // Filter out the deleted employee
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);

    // Update total and available employees count
    setTotalEmployees(totalEmployees - 1);
    const deletedEmployee = employees.find(employee => employee.id === employeeId);
    if (deletedEmployee && deletedEmployee.available) {
      setAvailableEmployees(availableEmployees - 1);
    }
    alert('Employee deleted successfully!');
  };

  return (
    <div className="dashboard">
      {/* Dashboard Overview */}
      <div className="overview">
        <h2>Dashboard Overview</h2>
        <p>Total Employees: {totalEmployees}</p>
        <p>Available Employees: {availableEmployees}</p>
      </div>

      {/* Employee Listing */}
      <div className="employee-list">
        <button onClick={() => setShowAddModal(true)}>Add Employee</button>
        <EmployeeList
          employees={employees}
          onEditEmployee={(employee) => {
            setSelectedEmployee(employee);
            setShowEditModal(true);
          }}
          onDeleteEmployee={handleDeleteEmployee}
        />
      </div>

      {/* Add Employee Modal */}
      {showAddModal && <AddEmployeeModal onClose={() => setShowAddModal(false)} onAddEmployee={handleAddEmployee} />}

      {/* Edit Employee Modal */}
      {showEditModal && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onUpdateEmployee={handleEditEmployee}
        />
      )}
    </div>
  );
};

export default Dashboard;

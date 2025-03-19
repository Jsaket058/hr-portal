package com.example.hr_portal.services;

import com.example.hr_portal.models.Employee;
import com.example.hr_portal.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Fetch all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Add a new employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Delete an employee by ID
    public void deleteEmployee(int id) {
        employeeRepository.deleteById((long) id);
    }

    public Employee updateEmployee(int id, Employee updatedEmployee) {
        return employeeRepository.findById((long) id).map(employee -> {
            employee.setName(updatedEmployee.getName());
            employee.setDepartment(updatedEmployee.getDepartment());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setSalary(updatedEmployee.getSalary());
            return employeeRepository.save(employee);
        }).orElse(null);
    }
}

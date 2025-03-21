package com.example.hr_portal.repositories;

import com.example.hr_portal.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Example custom query to find employees by department
    List<Employee> findByDepartment(String department);
}

async function fetchEmployees() {
    let response = await fetch("http://localhost:8080/employees");
    let employees = await response.json();
    let tableBody = document.getElementById("employeeTableBody");
    tableBody.innerHTML = "";
    employees.forEach(emp => {
        tableBody.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.email}</td>
                <td>${emp.salary}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditModal(${emp.id}, '${emp.name}', '${emp.department}', '${emp.email}', ${emp.salary})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>`;
    });
}

async function deleteEmployee(id) {
    await fetch(`http://localhost:8080/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
}

async function addEmployee() {
    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let email = document.getElementById("email").value;
    let salary = document.getElementById("salary").value;
    await fetch("http://localhost:8080/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, department, email, salary })
    });
    fetchEmployees();
    $("#addEmployeeModal").modal("hide");
}

function openEditModal(id, name, department, email, salary) {
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editDepartment").value = department;
    document.getElementById("editEmail").value = email;
    document.getElementById("editSalary").value = salary;
    $("#editEmployeeModal").modal("show");
}

async function updateEmployee() {
    let id = document.getElementById("editId").value;
    let name = document.getElementById("editName").value;
    let department = document.getElementById("editDepartment").value;
    let email = document.getElementById("editEmail").value;
    let salary = document.getElementById("editSalary").value;
    await fetch(`http://localhost:8080/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, department, email, salary })
    });
    fetchEmployees();
    $("#editEmployeeModal").modal("hide");
}

function logout() {
    window.location.href = "login.html";
}

$(document).ready(fetchEmployees);
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ================================
// IN-MEMORY DATA STORE
// ================================

let employees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Anubhav Samanta",
    email: "anubhav.samanta@company.com",
    department: "Management",
    jobTitle: "Engineering Manager",
    status: "Active",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Abhishek Chowdhury",
    email: "abhishek.chowdhury@company.com",
    department: "Marketing",
    jobTitle: "Marketing Lead",
    status: "Active",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Avik Kulavi",
    email: "avik.kulavi@company.com",
    department: "Engineering",
    jobTitle: "System Administrator",
    status: "On Leave",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Soham Shyamal",
    email: "soham.shyamal@company.com",
    department: "Human Resources",
    jobTitle: "HR Specialist",
    status: "Active",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    department: "Design",
    jobTitle: "UI/UX Designer",
    status: "Active",
  },
  {
    id: 6,
    employeeId: "EMP006",
    name: "Rahul Verma",
    email: "rahul.verma@company.com",
    department: "Engineering",
    jobTitle: "Frontend Developer",
    status: "Pending",
  },
  {
    id: 7,
    employeeId: "EMP007",
    name: "Sneha Das",
    email: "sneha.das@company.com",
    department: "Finance",
    jobTitle: "Financial Analyst",
    status: "Active",
  },
  {
    id: 8,
    employeeId: "EMP008",
    name: "Arjun Patel",
    email: "arjun.patel@company.com",
    department: "Engineering",
    jobTitle: "Backend Developer",
    status: "On Leave",
  },
];

let nextId = 9;


// ================================
// HELPER: Generate next Employee ID
// ================================

function generateEmployeeId() {
  const maxNum = employees.reduce((max, emp) => {
    const num = parseInt(emp.employeeId.replace("EMP", ""), 10);
    return num > max ? num : max;
  }, 0);
  return `EMP${String(maxNum + 1).padStart(3, "0")}`;
}


// ================================
// GET ALL EMPLOYEES
// ================================

app.get("/api/employees", (req, res) => {
  res.json(employees);
});


// ================================
// GET SINGLE EMPLOYEE
// ================================

app.get("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
});


// ================================
// CREATE EMPLOYEE
// ================================

app.post("/api/employees", (req, res) => {
  const { name, email, department, jobTitle, status } = req.body;

  if (!name || !email || !department || !jobTitle) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newEmployee = {
    id: nextId++,
    employeeId: generateEmployeeId(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    department,
    jobTitle: jobTitle.trim(),
    status: status || "Active",
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});


// ================================
// UPDATE EMPLOYEE
// ================================

app.put("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((emp) => emp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const { name, email, department, jobTitle, status } = req.body;

  employees[index] = {
    ...employees[index],
    ...(name && { name: name.trim() }),
    ...(email && { email: email.trim().toLowerCase() }),
    ...(department && { department }),
    ...(jobTitle && { jobTitle: jobTitle.trim() }),
    ...(status && { status }),
  };

  res.json(employees[index]);
});


// ================================
// DELETE EMPLOYEE
// ================================

app.delete("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = employees.findIndex((emp) => emp.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  const deleted = employees.splice(index, 1)[0];
  res.json({ message: "Employee deleted successfully", employee: deleted });
});


// ================================
// STATS ENDPOINT
// ================================

app.get("/api/stats", (req, res) => {
  const total = employees.length;
  const active = employees.filter((e) => e.status === "Active").length;
  const departments = [...new Set(employees.map((e) => e.department))].length;

  res.json({ total, active, departments });
});


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
  console.log(`✓ Backend running at http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy student data
let students = [
  { id: 1, name: 'Soham Shyamal ', roll: '101', cgpa: 9.5, department: 'Computer Science', semester: '8th', phone: '+8801711000001', email: 'soham@example.com', photo: '/images/default-avatar.png' },
  { id: 2, name: 'Anubhav Samanta', roll: '102', cgpa: 8.8, department: 'Electrical Engineering', semester: '6th', phone: '+8801711000002', email: 'anubhav@example.com', photo: '/images/default2-avatar.png' },
  { id: 3, name: 'Avik kulavi', roll: '103', cgpa: 9.8, department: 'Software Engineering', semester: '8th', phone: '+8801711000003', email: 'avik@example.com', photo: '/images/default3-avatar.png' },
  { id: 4, name: 'Abhishek Chowdhoury', roll: '104', cgpa: 7.9, department: 'Civil Engineering', semester: '4th', phone: '+8801711000004', email: 'abhishek@example.com', photo: '/images/default4-avatar.png' },
  { id: 5, name: 'Nusrat Jahan', roll: '105', cgpa: 9.2, department: 'Architecture', semester: '5th', phone: '+8801711000005', email: 'nusrat@example.com', photo: '/images/default5-avatar.png' },
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/api/students', (req, res) => {
  const { name, roll, cgpa, department, semester, phone, email, photo } = req.body;
  if (!name || !roll || !cgpa) {
    return res.status(400).json({ error: 'Name, roll, and cgpa are required' });
  }
  const newStudent = {
    id: Date.now(), // simple unique id generator
    name,
    roll,
    cgpa: parseFloat(cgpa),
    department: department || '',
    semester: semester || '',
    phone: phone || '',
    email: email || '',
    photo: photo || '/images/default-avatar.png' // Default local image
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Delete a student
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = students.length;
  students = students.filter(student => student.id !== id);
  if (students.length < initialLength) {
    res.json({ message: 'Student deleted successfully' });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// Update a student
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(student => student.id === id);
  
  if (index !== -1) {
    const { name, roll, cgpa, department, semester, phone, email, photo } = req.body;
    students[index] = {
      ...students[index],
      name: name !== undefined ? name : students[index].name,
      roll: roll !== undefined ? roll : students[index].roll,
      cgpa: cgpa !== undefined ? parseFloat(cgpa) : students[index].cgpa,
      department: department !== undefined ? department : students[index].department,
      semester: semester !== undefined ? semester : students[index].semester,
      phone: phone !== undefined ? phone : students[index].phone,
      email: email !== undefined ? email : students[index].email,
      photo: photo !== undefined ? photo : students[index].photo,
    };
    res.json(students[index]);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

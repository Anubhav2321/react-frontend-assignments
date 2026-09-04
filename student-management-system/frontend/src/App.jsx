import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import StudentModal from './components/StudentModal';
import { Search } from 'lucide-react';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const fetchStudents = () => {
    fetch('http://localhost:5000/api/students')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = (newStudent) => {
    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add student');
        return res.json();
      })
      .then(addedStudent => {
        setStudents(prev => [...prev, addedStudent]);
        setIsModalOpen(false);
      })
      .catch(err => alert(err.message));
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetch(`http://localhost:5000/api/students/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete student');
          setStudents(prev => prev.filter(s => s.id !== id));
        })
        .catch(err => alert(err.message));
    }
  };

  const handleEditStudent = (updatedStudentData) => {
    fetch(`http://localhost:5000/api/students/${editingStudent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudentData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update student');
        return res.json();
      })
      .then(updatedStudent => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
        setIsModalOpen(false);
        setEditingStudent(null);
      })
      .catch(err => alert(err.message));
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleSortChange = (e) => setSortOrder(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.roll.toString().includes(searchQuery)
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === 'name') return a.name.localeCompare(b.name);
    if (sortOrder === 'cgpa_desc') return b.cgpa - a.cgpa;
    if (sortOrder === 'roll') return parseInt(a.roll) - parseInt(b.roll);
    return 0;
  });

  return (
    <>
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onAddClick={openAddModal} 
      />
      <main className="container">
        <div className="controls">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or roll..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="name">Sort by Name</option>
            <option value="roll">Sort by Roll No.</option>
            <option value="cgpa_desc">Sort by CGPA (High to Low)</option>
          </select>
        </div>
        
        {loading && <div className="loading glass">Loading students data...</div>}
        {error && <div className="error glass">Error: {error}</div>}
        {!loading && !error && (
          <StudentList 
            students={sortedStudents} 
            onDelete={handleDeleteStudent} 
            onEdit={openEditModal}
          />
        )}
      </main>
      <Footer />
      <StudentModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingStudent(null); }} 
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent} 
        initialData={editingStudent}
      />
    </>
  );
}

export default App;

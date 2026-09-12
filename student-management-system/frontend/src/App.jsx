import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import StudentModal from './components/StudentModal';
import { Search } from 'lucide-react';

function App() {
  const dummyData = [
    {
      id: '1',
      name: 'Anubhav Samanta',
      roll: '101',
      cgpa: '9.2',
      department: 'Computer Science',
      semester: '6th',
      phone: '+1234567890',
      email: 'anubhav@example.com',
      photo: 'https://avatars.githubusercontent.com/u/184535547?v=4'
    },
    {
      id: '2',
      name: 'Avik Kulavi ',
      roll: '102',
      cgpa: '8.5',
      department: 'Electrical Engineering',
      semester: '4th',
      phone: '+0478658751',
      email: 'avik@example.com',
      photo: 'https://avatars.githubusercontent.com/u/238877331?v=4'
    },
     {
      id: '3',
      name: 'Soham Shymal',
      roll: '103',
      cgpa: '8.7',
      department: 'Computer Science',
      semester: '7th',
      phone: '+0204500581',
      email: 'soham@example.com',
      photo: 'https://avatars.githubusercontent.com/u/246440725?v=4'
    },
     {
      id: '4',
      name: 'Abhishek chowdhury', 
      roll: '102',
      cgpa: '8.5',
      department: 'Electrical Engineering',
      semester: '4th',
      phone: '+0978523621',
      email: 'abhishek@example.com',
      photo: 'https://avatars.githubusercontent.com/u/201191410?v=4'
    },
     {
      id: '5',
      name: 'Rishabh Gupta',
      roll: '105',
      cgpa: '8.9',
      department: 'Mechanical Engineering',
      semester: '6th',
      phone: '+0548754321',
      email: 'rishabh@example.com',
      photo: ''
    },
     {
      id: '6',
      name: 'Souvik pramanik',
      roll: '106',
      cgpa: '8.5',
      department: 'Electrical Engineering',
      semester: '4th',
      phone: '+0987856921',
      email: 'souvik@example.com',
      photo: 'https://scontent.frdp2-1.fna.fbcdn.net/v/t39.30808-6/780238179_2308378473304846_3991858878745255899_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1075&ctp=s1080x1075&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=aldQr7Mhp8kQ7kNvwHC-7RX&_nc_oc=AdptmxNTfx7jd7QCx7e54UFD_DHwZ88YROgTOU5-sAKcs7YMyqp74y7QXK0fMOXwQplEPWRGlzsMvZ36p5Cv4Cos&_nc_zt=23&_nc_ht=scontent.frdp2-1.fna&_nc_gid=OzCJC8NtaGcyql5aWuf9Lg&_nc_ss=7b2a8&oh=00_AQIZybKcZRMqYs0SVy4uBj35pk2GurVlqjyV0Svtk8RRqQ&oe=6AAB435D'
    },
    {
      id: '7',
      name: 'Commatozze',
      roll: '107',
      cgpa: '9.9',
      department: 'Electrical Engineering',
      semester: '4th',
      phone: '+0958479865',
      email: 'commatozze@example.com',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN8z0S1XPat5SdJxvQ63bh2hCp-sDzpVHRrZY0j968BLAExEWuscltTvQ&s=10'
    },
  ];

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students_data');
    let initialData = dummyData;
    
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        initialData = parsed;
      }
    }
    
    return initialData.map(student => ({
      ...student,
      photo: (!student.photo || student.photo.trim() === '') 
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random` 
        : student.photo
    }));
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem('students_data', JSON.stringify(students));
  }, [students]);
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

  const getPhotoUrl = (photo, name) => {
    if (!photo || photo.trim() === '') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    }
    return photo;
  };

  const handleAddStudent = (newStudent) => {
    const studentWithId = { 
      ...newStudent, 
      id: Date.now().toString(),
      photo: getPhotoUrl(newStudent.photo, newStudent.name)
    };
    setStudents(prev => [...prev, studentWithId]);
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEditStudent = (updatedStudentData) => {
    const updatedStudent = { 
      ...updatedStudentData, 
      id: editingStudent.id,
      photo: getPhotoUrl(updatedStudentData.photo, updatedStudentData.name)
    };
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setIsModalOpen(false);
    setEditingStudent(null);
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

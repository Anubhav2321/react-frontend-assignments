import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students, onDelete, onEdit }) => {
  if (!students || students.length === 0) {
    return <div className="loading glass">No students found.</div>;
  }

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onDelete={() => onDelete(student.id)} onEdit={() => onEdit(student)} />
      ))}
    </div>
  );
};

export default StudentList;

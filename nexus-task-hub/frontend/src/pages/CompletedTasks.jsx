import React from 'react';
import TasksList from './TasksList';

const CompletedTasks = () => {
  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Here is a list of all your accomplished objectives.
      </p>
      <TasksList filter="completed" />
    </div>
  );
};

export default CompletedTasks;

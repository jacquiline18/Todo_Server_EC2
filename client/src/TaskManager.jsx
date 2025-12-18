import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={addTask} style={{ padding: '8px 16px' }}>
          Add Task
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              flex: 1
            }}>
              {task.text}
            </span>
            <IconButton aria-label="delete" size="small" onClick={() => deleteTask(task.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  );
}

export default TaskManager;
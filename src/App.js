import React, { useState, useEffect } from 'react';
import './App.css';

const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks change
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const currentDate = new Date().toLocaleDateString();
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, date: currentDate }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const changePageColor = () => {
    const colorInput = document.getElementById('colorInput').value;
    document.body.style.backgroundColor = colorInput;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>To-Do List</h1>
      <div className="button-container">
        <label htmlFor="colorInput">Set page background color:</label>
        <input type="text" id="colorInput" placeholder="Enter a color" />
        <button onClick={changePageColor}>Change Color</button>
        <button id="toggle-mode" className="highlight" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <br />
        <br />
      </div>

      <div>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.text} - {task.date}</span>
            <div>
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

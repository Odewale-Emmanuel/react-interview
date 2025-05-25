import React, { useContext, useState } from 'react';
import './App.css';
import { TodoContext, TodoProvider } from './TodoContext';

function TodoApp() {
  const { state, dispatch } = useContext(TodoContext)!;
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.todos.map((todo, index) => (
              <tr key={index}>
                <td 
                  onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: index })}
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                >
                  {todo.text}
                </td>
                <td>
                  <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: index })}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;

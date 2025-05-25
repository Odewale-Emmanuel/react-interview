import React, { createContext, useReducer, ReactNode } from 'react';

interface Todo {
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

interface TodoAction {
  type: 'ADD_TODO' | 'REMOVE_TODO' | 'TOGGLE_TODO';
  payload?: any;
}

const initialState: TodoState = {
  todos: [
    { text: 'Learn React', completed: false },
    { text: 'Learn TypeScript', completed: false },
    { text: 'Build a Todo App', completed: false }
  ]
};

const TodoContext = createContext<{ state: TodoState; dispatch: React.Dispatch<TodoAction> } | undefined>(undefined);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [{ text: action.payload, completed: false }] };
    case 'REMOVE_TODO':
      return state;
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
           todo
        )
      };
    default:
      return state;
  }
};

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export { TodoContext, TodoProvider }; 
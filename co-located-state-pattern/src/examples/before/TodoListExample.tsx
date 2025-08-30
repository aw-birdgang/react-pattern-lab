import React, { useState } from 'react';
import { TodoList } from '../../components/before';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoListExample: React.FC = () => {
  // 모든 상태가 최상위 컴포넌트에서 관리됨 (props drilling 발생)
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div className="example">
      <h2>Todo List Example (Before - Centralized State)</h2>
      <p>
        이 예제에서는 할일 목록의 상태가 부모 컴포넌트에서 관리되고, 
        모든 상태 변경 함수들이 props를 통해 전달됩니다.
      </p>
      <TodoList
        todos={todos}
        onAddTodo={handleAddTodo}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default TodoListExample;

import React from 'react';
import { TodoList } from '../../components/after';

const TodoListExample: React.FC = () => {
  return (
    <div className="example">
      <h2>Todo List Example (After - Co-located State)</h2>
      <p>
        이 예제에서는 할일 목록의 상태가 컴포넌트 내부에서 관리됩니다.
        모든 상태 변경 로직이 컴포넌트 내부에 캡슐화되어 있습니다.
      </p>
      <TodoList />
    </div>
  );
};

export default TodoListExample;

import React, { useState, useCallback } from 'react';
import ExpensiveList from '../../components/after/ExpensiveList';

const MemoExample: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [items] = useState(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `아이템 ${i + 1}`
    }))
  );
  
  // useCallback으로 핸들러 안정화
  const handleItemClick = useCallback((id: number) => {
    console.log(`아이템 ${id} 클릭됨`);
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>메모 패턴 예제 (최적화 후)</h2>
      <p>카운터를 증가시켜보세요. 리스트 아이템들이 리렌더링되지 않습니다.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setCounter(c => c + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          카운터 증가: {counter}
        </button>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        height: '400px',
        overflow: 'auto'
      }}>
        <ExpensiveList items={items} onItemClick={handleItemClick} />
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
        <h4>개선점:</h4>
        <ul>
          <li>React.memo로 ListItem 컴포넌트가 props가 변경되지 않으면 리렌더링하지 않음</li>
          <li>useCallback으로 handleItemClick 함수 참조가 안정화됨</li>
          <li>카운터 변경 시에도 리스트 아이템들이 리렌더링되지 않음</li>
          <li>성능이 크게 향상되고 사용자 경험이 개선됨</li>
        </ul>
      </div>
    </div>
  );
};

export default MemoExample;

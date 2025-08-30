import React, { useState } from 'react';
import ExpensiveList from '../../components/before/ExpensiveList';

const MemoExample: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [items] = useState(() => 
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `아이템 ${i + 1}`
    }))
  );
  
  const handleItemClick = (id: number) => {
    console.log(`아이템 ${id} 클릭됨`);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>메모 패턴 예제 (최적화 전)</h2>
      <p>카운터를 증가시켜보세요. 리스트의 모든 아이템이 리렌더링됩니다.</p>
      
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
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4>문제점:</h4>
        <ul>
          <li>카운터가 변경될 때마다 모든 리스트 아이템이 리렌더링됨</li>
          <li>onItemClick 함수가 매번 새로 생성되어 자식 컴포넌트들이 불필요하게 리렌더링됨</li>
          <li>성능이 저하되고 사용자 경험이 나빠짐</li>
        </ul>
      </div>
    </div>
  );
};

export default MemoExample;

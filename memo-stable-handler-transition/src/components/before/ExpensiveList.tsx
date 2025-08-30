import React from 'react';

interface ListItemProps {
  id: number;
  text: string;
  onItemClick: (id: number) => void;
}

// 최적화 전: 매번 새로운 함수가 생성되어 불필요한 리렌더링 발생
const ListItem: React.FC<ListItemProps> = ({ id, text, onItemClick }) => {
  console.log(`ListItem ${id} 렌더링됨`);
  
  return (
    <div 
      className="list-item"
      onClick={() => onItemClick(id)}
      style={{
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9'
      }}
    >
      <span>ID: {id}</span>
      <span style={{ marginLeft: '10px' }}>{text}</span>
    </div>
  );
};

interface ExpensiveListProps {
  items: Array<{ id: number; text: string }>;
  onItemClick: (id: number) => void;
}

const ExpensiveList: React.FC<ExpensiveListProps> = ({ items, onItemClick }) => {
  console.log('ExpensiveList 렌더링됨');
  
  return (
    <div className="expensive-list">
      <h3>비용이 큰 리스트 (최적화 전)</h3>
      <p>각 아이템이 매번 리렌더링됩니다</p>
      {items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          text={item.text}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default ExpensiveList;

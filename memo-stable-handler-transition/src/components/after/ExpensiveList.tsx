import React, { memo, useCallback } from 'react';

interface ListItemProps {
  id: number;
  text: string;
  onItemClick: (id: number) => void;
}

// 최적화 후: React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
const ListItem = memo<ListItemProps>(({ id, text, onItemClick }) => {
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
});

ListItem.displayName = 'ListItem';

interface ExpensiveListProps {
  items: Array<{ id: number; text: string }>;
  onItemClick: (id: number) => void;
}

const ExpensiveList: React.FC<ExpensiveListProps> = ({ items, onItemClick }) => {
  console.log('ExpensiveList 렌더링됨');
  
  // useCallback으로 핸들러 안정화
  const handleItemClick = useCallback((id: number) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return (
    <div className="expensive-list">
      <h3>비용이 큰 리스트 (최적화 후)</h3>
      <p>React.memo와 useCallback으로 불필요한 리렌더링을 방지합니다</p>
      {items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          text={item.text}
          onItemClick={handleItemClick}
        />
      ))}
    </div>
  );
};

export default ExpensiveList;

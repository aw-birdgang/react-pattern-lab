import React, { useState } from 'react';

// 일반적인 List 컴포넌트 (Compound Components 패턴 사용 전)
interface ListItem {
  id: string;
  primary: string;
  secondary?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface ListProps {
  items: ListItem[];
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const List: React.FC<ListProps> = ({ 
  items, 
  selectable = false, 
  onSelectionChange,
  header,
  footer,
  className = '' 
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleItemClick = (item: ListItem) => {
    if (item.disabled) return;
    
    if (selectable) {
      const newSelected = new Set(selectedItems);
      if (newSelected.has(item.id)) {
        newSelected.delete(item.id);
      } else {
        newSelected.add(item.id);
      }
      setSelectedItems(newSelected);
      onSelectionChange?.(Array.from(newSelected));
    }
    
    item.onClick?.();
  };

  return (
    <div className={`list-container ${className}`}>
      {header && <div className="list-header">{header}</div>}
      
      <div className="list-items">
        {items.map((item, index) => (
          <div key={item.id}>
            <div 
              className={`list-item ${selectedItems.has(item.id) ? 'selected' : ''} ${item.disabled ? 'disabled' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <div className="list-item-icon">{item.icon}</div>}
              <div className="list-item-content">
                <div className="list-item-text">
                  <div className="list-item-text__primary">{item.primary}</div>
                  {item.secondary && <div className="list-item-text__secondary">{item.secondary}</div>}
                </div>
              </div>
            </div>
            {index < items.length - 1 && <div className="list-divider" />}
          </div>
        ))}
      </div>
      
      {footer && <div className="list-footer">{footer}</div>}
    </div>
  );
};

const ListExampleBefore: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const userItems: ListItem[] = [
    {
      id: 'user1',
      primary: '김철수',
      secondary: '프론트엔드 개발자 • 서울',
      icon: '👨‍💻',
      onClick: () => alert('김철수의 프로필을 확인합니다!')
    },
    {
      id: 'user2',
      primary: '이영희',
      secondary: '백엔드 개발자 • 부산',
      icon: '👩‍💻',
      onClick: () => alert('이영희의 프로필을 확인합니다!')
    },
    {
      id: 'user3',
      primary: '박민수',
      secondary: 'UI/UX 디자이너 • 대구',
      icon: '🎨',
      onClick: () => alert('박민수의 프로필을 확인합니다!')
    },
    {
      id: 'user4',
      primary: '정수진',
      secondary: '프로젝트 매니저 • 인천',
      icon: '📊',
      disabled: true,
      onClick: () => alert('정수진의 프로필을 확인합니다!')
    }
  ];

  const projectItems: ListItem[] = [
    {
      id: 'project1',
      primary: 'React 앱 개발',
      secondary: '진행중 • 마감일: 2024-03-15',
      icon: '⚛️'
    },
    {
      id: 'project2',
      primary: 'API 설계',
      secondary: '완료 • 마감일: 2024-02-28',
      icon: '🔧'
    },
    {
      id: 'project3',
      primary: '데이터베이스 최적화',
      secondary: '대기중 • 마감일: 2024-04-01',
      icon: '🗄️'
    }
  ];

  return (
    <div className="example-component">
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <div>
          <h4>사용자 목록 (선택 가능)</h4>
          <List
            items={userItems}
            selectable
            onSelectionChange={setSelectedItems}
            header={<h5>팀 멤버 ({selectedItems.length}명 선택됨)</h5>}
            footer={<p>총 {userItems.length}명의 팀 멤버</p>}
          />
        </div>

        <div>
          <h4>프로젝트 목록</h4>
          <List
            items={projectItems}
            header={<h5>진행 중인 프로젝트</h5>}
            footer={<p>총 {projectItems.length}개의 프로젝트</p>}
          />
        </div>
      </div>
    </div>
  );
};

export default ListExampleBefore;

import React, { useState, useRef, useEffect } from 'react';

// 일반적인 Menu 컴포넌트 (Compound Components 패턴 사용 전)
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

interface MenuGroup {
  title?: string;
  items: MenuItem[];
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[] | MenuGroup[];
  placement?: 'top' | 'bottom' | 'left' | 'right';
  triggerType?: 'click' | 'hover';
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ 
  trigger, 
  items, 
  placement = 'bottom',
  triggerType = 'click',
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && triggerType === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, triggerType]);

  const handleTriggerClick = () => {
    if (triggerType === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (triggerType === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerType === 'hover') {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled) return;
    
    setActiveItem(item.id);
    item.onClick?.();
    setIsOpen(false);
  };

  const renderMenuItem = (item: MenuItem) => (
    <div
      key={item.id}
      className={`menu-item ${item.disabled ? 'disabled' : ''}`}
      onClick={() => handleItemClick(item)}
      onMouseEnter={() => !item.disabled && setActiveItem(item.id)}
      onMouseLeave={() => setActiveItem(null)}
    >
      {item.icon && <span className="menu-item__icon">{item.icon}</span>}
      <span className="menu-item__text">{item.label}</span>
    </div>
  );

  const renderMenuGroup = (group: MenuGroup, index: number) => (
    <div key={index} className="menu-group">
      {group.title && <div className="menu-group__title">{group.title}</div>}
      <div className="menu-group__items">
        {group.items.map(renderMenuItem)}
      </div>
    </div>
  );

  return (
    <div 
      className={`menu-container menu--${placement} ${className}`}
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`menu-trigger ${isOpen ? 'active' : ''}`}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className="menu-content">
          {Array.isArray(items) && items.length > 0 && typeof items[0] === 'object' && 'items' in items[0] 
            ? (items as MenuGroup[]).map(renderMenuGroup)
            : (items as MenuItem[]).map(renderMenuItem)
          }
        </div>
      )}
    </div>
  );
};

const MenuExampleBefore: React.FC = () => {
  const userMenuItems: MenuItem[] = [
    { id: 'profile', label: '프로필', icon: '👤', onClick: () => alert('프로필을 확인합니다!') },
    { id: 'settings', label: '설정', icon: '⚙️', onClick: () => alert('설정을 엽니다!') },
    { id: 'help', label: '도움말', icon: '❓', onClick: () => alert('도움말을 엽니다!') },
    { id: 'logout', label: '로그아웃', icon: '🚪', onClick: () => alert('로그아웃합니다!') }
  ];

  const projectMenuGroups: MenuGroup[] = [
    {
      title: '프로젝트 관리',
      items: [
        { id: 'new', label: '새 프로젝트', icon: '➕', onClick: () => alert('새 프로젝트를 생성합니다!') },
        { id: 'open', label: '프로젝트 열기', icon: '📁', onClick: () => alert('프로젝트를 엽니다!') },
        { id: 'save', label: '저장', icon: '💾', onClick: () => alert('프로젝트를 저장합니다!') }
      ]
    },
    {
      title: '내보내기',
      items: [
        { id: 'export-pdf', label: 'PDF로 내보내기', icon: '📄', onClick: () => alert('PDF로 내보냅니다!') },
        { id: 'export-image', label: '이미지로 내보내기', icon: '🖼️', onClick: () => alert('이미지로 내보냅니다!') },
        { id: 'export-code', label: '코드로 내보내기', icon: '💻', onClick: () => alert('코드로 내보냅니다!') }
      ]
    },
    {
      items: [
        { id: 'preferences', label: '환경설정', icon: '🔧', onClick: () => alert('환경설정을 엽니다!') },
        { id: 'about', label: '정보', icon: 'ℹ️', onClick: () => alert('정보를 확인합니다!') }
      ]
    }
  ];

  const notificationMenuItems: MenuItem[] = [
    { id: 'notification1', label: '새 메시지가 도착했습니다', icon: '💬' },
    { id: 'notification2', label: '프로젝트 업데이트 완료', icon: '✅' },
    { id: 'notification3', label: '시스템 점검 예정', icon: '🔧' },
    { id: 'notification4', label: '모든 알림 보기', icon: '📋', onClick: () => alert('모든 알림을 확인합니다!') }
  ];

  return (
    <div className="example-component">
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Menu 
          trigger={<button className="menu-trigger-btn">👤 사용자 메뉴</button>}
          items={userMenuItems}
          placement="bottom"
          triggerType="click"
        />

        <Menu 
          trigger={<button className="menu-trigger-btn">📁 프로젝트 메뉴</button>}
          items={projectMenuGroups}
          placement="bottom"
          triggerType="hover"
        />

        <Menu 
          trigger={<button className="menu-trigger-btn">🔔 알림 (3)</button>}
          items={notificationMenuItems}
          placement="bottom"
          triggerType="click"
        />

        <Menu 
          trigger={<button className="menu-trigger-btn">⚙️ 설정</button>}
          items={[
            { id: 'theme', label: '테마 변경', icon: '🎨', onClick: () => alert('테마를 변경합니다!') },
            { id: 'language', label: '언어 설정', icon: '🌐', onClick: () => alert('언어를 설정합니다!') },
            { id: 'accessibility', label: '접근성', icon: '♿', onClick: () => alert('접근성 설정을 엽니다!') }
          ]}
          placement="right"
          triggerType="click"
        />
      </div>
    </div>
  );
};

export default MenuExampleBefore;

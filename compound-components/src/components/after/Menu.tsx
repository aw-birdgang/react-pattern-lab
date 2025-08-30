import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

// Context 타입 정의
interface MenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  trigger: 'click' | 'hover';
}

// Context 생성
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Hook으로 Context 사용
const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu');
  }
  return context;
};

// Props 타입 정의
interface MenuProps {
  children: ReactNode;
  className?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover';
}

interface MenuTriggerProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface MenuContentProps {
  children: ReactNode;
  className?: string;
}

interface MenuItemProps {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

interface MenuDividerProps {
  className?: string;
}

interface MenuGroupProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

interface MenuLabelProps {
  children: ReactNode;
  className?: string;
}

// 메인 Menu 컴포넌트
const Menu: React.FC<MenuProps> = ({ 
  children, 
  className = '', 
  placement = 'bottom',
  trigger = 'click'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && trigger === 'click') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, trigger]);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen, activeItem, setActiveItem, triggerRef, trigger }}>
      <div className={`menu menu--${placement} ${className}`}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

// MenuTrigger 컴포넌트
const MenuTrigger: React.FC<MenuTriggerProps> = ({ 
  children, 
  className = '', 
  disabled = false 
}) => {
  const { isOpen, setIsOpen, triggerRef, trigger } = useMenuContext();

  const handleClick = () => {
    if (disabled) return;
    if (trigger === 'click') {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover' && !disabled) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      className={`menu-trigger ${isOpen ? 'active' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// MenuContent 컴포넌트
const MenuContent: React.FC<MenuContentProps> = ({ children, className = '' }) => {
  const { isOpen } = useMenuContext();

  if (!isOpen) return null;

  return (
    <div className={`menu-content ${className}`}>
      {children}
    </div>
  );
};

// MenuItem 컴포넌트
const MenuItem: React.FC<MenuItemProps> = ({ 
  id, 
  children, 
  className = '', 
  disabled = false,
  onClick,
  icon 
}) => {
  const { setActiveItem, setIsOpen } = useMenuContext();

  const handleClick = () => {
    if (disabled) return;
    
    setActiveItem(id);
    onClick?.();
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setActiveItem(id);
    }
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <div
      className={`menu-item ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <span className="menu-item__icon">{icon}</span>}
      <span className="menu-item__text">{children}</span>
    </div>
  );
};

// MenuDivider 컴포넌트
const MenuDivider: React.FC<MenuDividerProps> = ({ className = '' }) => {
  return (
    <div className={`menu-divider ${className}`} />
  );
};

// MenuGroup 컴포넌트
const MenuGroup: React.FC<MenuGroupProps> = ({ children, className = '', title }) => {
  return (
    <div className={`menu-group ${className}`}>
      {title && <div className="menu-group__title">{title}</div>}
      <div className="menu-group__items">
        {children}
      </div>
    </div>
  );
};

// MenuLabel 컴포넌트
const MenuLabel: React.FC<MenuLabelProps> = ({ children, className = '' }) => {
  return (
    <div className={`menu-label ${className}`}>
      {children}
    </div>
  );
};

// Compound Components 조합
const CompoundMenu = Object.assign(Menu, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  Divider: MenuDivider,
  Group: MenuGroup,
  Label: MenuLabel,
});

export default CompoundMenu;

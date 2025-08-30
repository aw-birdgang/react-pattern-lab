import React, { createContext, useContext, ReactNode } from 'react';
import { useState } from 'react';

// Context 타입 정의
interface ListContextType {
  isSelectable: boolean;
  selectedItems: Set<string>;
  onItemSelect: (id: string) => void;
  onItemDeselect: (id: string) => void;
  isItemSelected: (id: string) => boolean;
}

// Context 생성
const ListContext = createContext<ListContextType | undefined>(undefined);

// Hook으로 Context 사용
const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('List components must be used within a List');
  }
  return context;
};

// Props 타입 정의
interface ListProps {
  children: ReactNode;
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

interface ListItemProps {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface ListItemContentProps {
  children: ReactNode;
  className?: string;
}

interface ListItemIconProps {
  children: ReactNode;
  className?: string;
}

interface ListItemTextProps {
  primary: ReactNode;
  secondary?: ReactNode;
  className?: string;
}

interface ListItemActionProps {
  children: ReactNode;
  className?: string;
}

interface ListDividerProps {
  className?: string;
}

interface ListHeaderProps {
  children: ReactNode;
  className?: string;
}

interface ListFooterProps {
  children: ReactNode;
  className?: string;
}

// 메인 List 컴포넌트
const List: React.FC<ListProps> = ({ 
  children, 
  className = '', 
  selectable = false,
  onSelectionChange 
}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const onItemSelect = (id: string) => {
    const newSelected = new Set(selectedItems);
    newSelected.add(id);
    setSelectedItems(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const onItemDeselect = (id: string) => {
    const newSelected = new Set(selectedItems);
    newSelected.delete(id);
    setSelectedItems(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const isItemSelected = (id: string) => {
    return selectedItems.has(id);
  };

  return (
    <ListContext.Provider 
      value={{ 
        isSelectable: selectable, 
        selectedItems, 
        onItemSelect, 
        onItemDeselect, 
        isItemSelected 
      }}
    >
      <div className={`list ${className}`}>
        {children}
      </div>
    </ListContext.Provider>
  );
};

// ListItem 컴포넌트
const ListItem: React.FC<ListItemProps> = ({ 
  id, 
  children, 
  className = '', 
  disabled = false,
  onClick 
}) => {
  const { isSelectable, isItemSelected, onItemSelect, onItemDeselect } = useListContext();
  const isSelected = isItemSelected(id);

  const handleClick = () => {
    if (disabled) return;
    
    if (isSelectable) {
      if (isSelected) {
        onItemDeselect(id);
      } else {
        onItemSelect(id);
      }
    }
    
    onClick?.();
  };

  return (
    <div 
      className={`list-item ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

// ListItemContent 컴포넌트
const ListItemContent: React.FC<ListItemContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`list-item-content ${className}`}>
      {children}
    </div>
  );
};

// ListItemIcon 컴포넌트
const ListItemIcon: React.FC<ListItemIconProps> = ({ children, className = '' }) => {
  return (
    <div className={`list-item-icon ${className}`}>
      {children}
    </div>
  );
};

// ListItemText 컴포넌트
const ListItemText: React.FC<ListItemTextProps> = ({ 
  primary, 
  secondary, 
  className = '' 
}) => {
  return (
    <div className={`list-item-text ${className}`}>
      <div className="list-item-text__primary">{primary}</div>
      {secondary && <div className="list-item-text__secondary">{secondary}</div>}
    </div>
  );
};

// ListItemAction 컴포넌트
const ListItemAction: React.FC<ListItemActionProps> = ({ children, className = '' }) => {
  return (
    <div className={`list-item-action ${className}`}>
      {children}
    </div>
  );
};

// ListDivider 컴포넌트
const ListDivider: React.FC<ListDividerProps> = ({ className = '' }) => {
  return (
    <div className={`list-divider ${className}`} />
  );
};

// ListHeader 컴포넌트
const ListHeader: React.FC<ListHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`list-header ${className}`}>
      {children}
    </div>
  );
};

// ListFooter 컴포넌트
const ListFooter: React.FC<ListFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`list-footer ${className}`}>
      {children}
    </div>
  );
};

// Compound Components 조합
const CompoundList = Object.assign(List, {
  Item: ListItem,
  ItemContent: ListItemContent,
  ItemIcon: ListItemIcon,
  ItemText: ListItemText,
  ItemAction: ListItemAction,
  Divider: ListDivider,
  Header: ListHeader,
  Footer: ListFooter,
});

export default CompoundList;

import React, { createContext, useContext, ReactNode } from 'react';
import { useState } from 'react';

// Context 타입 정의
interface CardContextType {
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

// Context 생성
const CardContext = createContext<CardContextType | undefined>(undefined);

// Hook으로 Context 사용
const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card components must be used within a Card');
  }
  return context;
};

// Props 타입 정의
interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  interactive?: boolean;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface CardSubtitleProps {
  children: ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

interface CardActionProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface CardBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

// 메인 Card 컴포넌트
const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  interactive = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <CardContext.Provider value={{ isHovered, setIsHovered, isExpanded, setIsExpanded }}>
      <div 
        className={`card card--${variant} ${interactive ? 'card--interactive' : ''} ${className}`}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

// CardHeader 컴포넌트
const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  );
};

// CardTitle 컴포넌트
const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h3' 
}) => {
  return (
    <Component className={`card-title ${className}`}>
      {children}
    </Component>
  );
};

// CardSubtitle 컴포넌트
const CardSubtitle: React.FC<CardSubtitleProps> = ({ children, className = '' }) => {
  return (
    <p className={`card-subtitle ${className}`}>
      {children}
    </p>
  );
};

// CardBody 컴포넌트
const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
};

// CardFooter 컴포넌트
const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

// CardImage 컴포넌트
const CardImage: React.FC<CardImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height 
}) => {
  return (
    <div className={`card-image ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        className="card-image__img"
      />
    </div>
  );
};

// CardAction 컴포넌트
const CardAction: React.FC<CardActionProps> = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary'
}) => {
  return (
    <button 
      className={`card-action card-action--${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// CardBadge 컴포넌트
const CardBadge: React.FC<CardBadgeProps> = ({ 
  children, 
  className = '', 
  variant = 'primary' 
}) => {
  return (
    <span className={`card-badge card-badge--${variant} ${className}`}>
      {children}
    </span>
  );
};

// Compound Components 조합
const CompoundCard = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
  Action: CardAction,
  Badge: CardBadge,
});

export default CompoundCard;

import React from 'react';

// 일반적인 Card 컴포넌트 (Compound Components 패턴 사용 전)
interface CardProps {
  title?: string;
  subtitle?: string;
  content: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  badges?: Array<{
    text: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  }>;
  variant?: 'default' | 'elevated' | 'outlined';
  interactive?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  content,
  image,
  actions,
  badges,
  variant = 'default',
  interactive = false,
  className = ''
}) => {
  return (
    <div className={`card card--${variant} ${interactive ? 'card--interactive' : ''} ${className}`}>
      {image && (
        <div className="card-image">
          <img 
            src={image.src} 
            alt={image.alt} 
            width={image.width} 
            height={image.height}
            className="card-image__img"
          />
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="card-body">
        {badges && badges.length > 0 && (
          <div className="card-badges">
            {badges.map((badge, index) => (
              <span key={index} className={`card-badge card-badge--${badge.variant || 'primary'}`}>
                {badge.text}
              </span>
            ))}
          </div>
        )}
        {content}
      </div>
      
      {actions && actions.length > 0 && (
        <div className="card-footer">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`card-action card-action--${action.variant || 'primary'}`}
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CardExampleBefore: React.FC = () => {
  return (
    <div className="example-component">
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Card
          title="React 개발자"
          subtitle="프론트엔드 개발자"
          content={
            <p>
              React, TypeScript, Next.js를 사용하여 웹 애플리케이션을 개발합니다.
              사용자 경험을 중시하며, 깔끔하고 유지보수 가능한 코드를 작성합니다.
            </p>
          }
          image={{
            src: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=React",
            alt: "React 개발자",
            width: 300,
            height: 200
          }}
          badges={[
            { text: "React", variant: "primary" },
            { text: "TypeScript", variant: "secondary" },
            { text: "Available", variant: "success" }
          ]}
          actions={[
            { label: "프로필 보기", onClick: () => alert('프로필을 확인합니다!'), variant: "primary" },
            { label: "연락하기", onClick: () => alert('연락처를 확인합니다!'), variant: "secondary" }
          ]}
          variant="elevated"
          interactive
        />

        <Card
          title="프로젝트 제안서"
          subtitle="웹 애플리케이션 개발"
          content={
            <div>
              <p><strong>기간:</strong> 3개월</p>
              <p><strong>예산:</strong> $15,000</p>
              <p><strong>기술 스택:</strong> React, Node.js, MongoDB</p>
              <p>
                사용자 친화적인 웹 애플리케이션을 개발하여 
                비즈니스 프로세스를 자동화하고 효율성을 향상시킵니다.
              </p>
            </div>
          }
          badges={[
            { text: "진행중", variant: "warning" },
            { text: "중요", variant: "danger" }
          ]}
          actions={[
            { label: "상세보기", onClick: () => alert('프로젝트 상세 정보를 확인합니다!'), variant: "primary" },
            { label: "편집", onClick: () => alert('프로젝트를 편집합니다!'), variant: "secondary" }
          ]}
          variant="outlined"
        />

        <Card
          title="기술 블로그"
          subtitle="React Compound Components 패턴"
          content={
            <div>
              <p>
                Compound Components 패턴을 사용하면 더 유연하고 재사용 가능한 
                컴포넌트를 만들 수 있습니다. 이 패턴의 장점과 구현 방법을 
                자세히 알아보겠습니다.
              </p>
              <p><strong>읽기 시간:</strong> 5분</p>
              <p><strong>태그:</strong> React, 패턴, 컴포넌트</p>
            </div>
          }
          badges={[
            { text: "React", variant: "primary" },
            { text: "패턴", variant: "secondary" },
            { text: "신규", variant: "success" }
          ]}
          actions={[
            { label: "읽기", onClick: () => alert('블로그 포스트를 읽습니다!'), variant: "primary" },
            { label: "북마크", onClick: () => alert('북마크에 추가합니다!'), variant: "secondary" }
          ]}
          interactive
        />
      </div>
    </div>
  );
};

export default CardExampleBefore;

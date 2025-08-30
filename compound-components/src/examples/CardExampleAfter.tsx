import React from 'react';
import {Card} from '../components/after';

const CardExampleAfter: React.FC = () => {
  return (
    <div className="example-component">
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <Card variant="elevated" interactive>
          <Card.Image
            src="https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=React"
            alt="React 개발자"
            width={300}
            height={200}
          />
          <Card.Header>
            <Card.Title>React 개발자</Card.Title>
            <Card.Subtitle>프론트엔드 개발자</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Badge variant="primary">React</Card.Badge>
            <Card.Badge variant="secondary">TypeScript</Card.Badge>
            <Card.Badge variant="success">Available</Card.Badge>
            <p>
              React, TypeScript, Next.js를 사용하여 웹 애플리케이션을 개발합니다.
              사용자 경험을 중시하며, 깔끔하고 유지보수 가능한 코드를 작성합니다.
            </p>
          </Card.Body>
          <Card.Footer>
            <Card.Action onClick={() => alert('프로필을 확인합니다!')} variant="primary">
              프로필 보기
            </Card.Action>
            <Card.Action onClick={() => alert('연락처를 확인합니다!')} variant="secondary">
              연락하기
            </Card.Action>
          </Card.Footer>
        </Card>

        <Card variant="outlined">
          <Card.Header>
            <Card.Title>프로젝트 제안서</Card.Title>
            <Card.Subtitle>웹 애플리케이션 개발</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Badge variant="warning">진행중</Card.Badge>
            <Card.Badge variant="danger">중요</Card.Badge>
            <div>
              <p><strong>기간:</strong> 3개월</p>
              <p><strong>예산:</strong> $15,000</p>
              <p><strong>기술 스택:</strong> React, Node.js, MongoDB</p>
              <p>
                사용자 친화적인 웹 애플리케이션을 개발하여
                비즈니스 프로세스를 자동화하고 효율성을 향상시킵니다.
              </p>
            </div>
          </Card.Body>
          <Card.Footer>
            <Card.Action onClick={() => alert('프로젝트 상세 정보를 확인합니다!')} variant="primary">
              상세보기
            </Card.Action>
            <Card.Action onClick={() => alert('프로젝트를 편집합니다!')} variant="secondary">
              편집
            </Card.Action>
          </Card.Footer>
        </Card>

        <Card interactive>
          <Card.Header>
            <Card.Title>기술 블로그</Card.Title>
            <Card.Subtitle>React Compound Components 패턴</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <Card.Badge variant="primary">React</Card.Badge>
            <Card.Badge variant="secondary">패턴</Card.Badge>
            <Card.Badge variant="success">신규</Card.Badge>
            <div>
              <p>
                Compound Components 패턴을 사용하면 더 유연하고 재사용 가능한
                컴포넌트를 만들 수 있습니다. 이 패턴의 장점과 구현 방법을
                자세히 알아보겠습니다.
              </p>
              <p><strong>읽기 시간:</strong> 5분</p>
              <p><strong>태그:</strong> React, 패턴, 컴포넌트</p>
            </div>
          </Card.Body>
          <Card.Footer>
            <Card.Action onClick={() => alert('블로그 포스트를 읽습니다!')} variant="primary">
              읽기
            </Card.Action>
            <Card.Action onClick={() => alert('북마크에 추가합니다!')} variant="secondary">
              북마크
            </Card.Action>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default CardExampleAfter;

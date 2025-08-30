import React from 'react';
import { Tabs } from '../components/after';

const TabsExampleAfter: React.FC = () => {
  return (
    <div className="example-component">
      <Tabs defaultTab="overview">
        <Tabs.List>
          <Tabs.Trigger id="overview">개요</Tabs.Trigger>
          <Tabs.Trigger id="features">주요 기능</Tabs.Trigger>
          <Tabs.Trigger id="ecosystem">생태계</Tabs.Trigger>
          <Tabs.Trigger id="disabled" disabled>비활성화</Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content id="overview">
          <div>
            <h4>React 개요</h4>
            <p>React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.</p>
            <ul>
              <li>컴포넌트 기반 아키텍처</li>
              <li>가상 DOM을 통한 효율적인 렌더링</li>
              <li>단방향 데이터 흐름</li>
            </ul>
          </div>
        </Tabs.Content>
        
        <Tabs.Content id="features">
          <div>
            <h4>React의 주요 기능</h4>
            <ul>
              <li>JSX를 통한 선언적 UI</li>
              <li>Hooks를 통한 상태 관리</li>
              <li>Context API를 통한 전역 상태 관리</li>
              <li>React Router를 통한 라우팅</li>
            </ul>
          </div>
        </Tabs.Content>
        
        <Tabs.Content id="ecosystem">
          <div>
            <h4>React 생태계</h4>
            <p>React는 풍부한 생태계를 가지고 있습니다:</p>
            <ul>
              <li>Next.js - SSR/SSG 프레임워크</li>
              <li>Redux - 상태 관리 라이브러리</li>
              <li>Material-UI - UI 컴포넌트 라이브러리</li>
              <li>React Query - 서버 상태 관리</li>
            </ul>
          </div>
        </Tabs.Content>
        
        <Tabs.Content id="disabled">
          <div>이 탭은 비활성화되어 있습니다.</div>
        </Tabs.Content>
      </Tabs>
    </div>
  );
};

export default TabsExampleAfter;

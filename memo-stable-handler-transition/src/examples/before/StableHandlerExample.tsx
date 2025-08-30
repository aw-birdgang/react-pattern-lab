import React, { useState } from 'react';
import Form from '../../components/before/Form';

const StableHandlerExample: React.FC = () => {
  const [counter, setCounter] = useState(0);
  
  const handleFormSubmit = (data: { name: string; email: string; message: string }) => {
    console.log('폼 제출됨:', data);
    alert(`폼이 제출되었습니다!\n이름: ${data.name}\n이메일: ${data.email}\n메시지: ${data.message}`);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>안정 핸들러 패턴 예제 (최적화 전)</h2>
      <p>카운터를 증가시켜보세요. 폼 필드들이 매번 리렌더링됩니다.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setCounter(c => c + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          카운터 증가: {counter}
        </button>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px'
      }}>
        <div>
          <h3>폼 컴포넌트</h3>
          <Form onSubmit={handleFormSubmit} />
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>콘솔 로그 확인</h3>
          <p>개발자 도구의 콘솔을 열어보세요.</p>
          <p>카운터를 증가시킬 때마다:</p>
          <ul>
            <li>Form 컴포넌트가 리렌더링됨</li>
            <li>모든 FormField 컴포넌트가 리렌더링됨</li>
            <li>onChange 함수들이 매번 새로 생성됨</li>
          </ul>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
            <h4>문제점:</h4>
            <ul>
              <li>카운터 변경 시 폼 필드들이 불필요하게 리렌더링됨</li>
              <li>onChange 핸들러가 매번 새로 생성되어 자식 컴포넌트들이 리렌더링됨</li>
              <li>입력 중에도 다른 상태 변경으로 인한 리렌더링이 발생</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StableHandlerExample;

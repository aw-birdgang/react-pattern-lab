import React, { useState } from 'react';
import DataProcessor from '../../components/before/DataProcessor';

const TransitionExample: React.FC = () => {
  const [processedData, setProcessedData] = useState<number[]>([]);
  const [counter, setCounter] = useState(0);
  
  const handleDataProcessed = (data: number[]) => {
    setProcessedData(data);
    console.log('데이터 처리 완료:', data.length, '개 항목');
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>전환 패턴 예제 (최적화 전)</h2>
      <p>데이터 처리를 시작하고 카운터를 증가시켜보세요. UI가 블로킹됩니다.</p>
      
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
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          카운터 증가: {counter}
        </button>
        
        <button
          onClick={() => setCounter(0)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          카운터 리셋
        </button>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px'
      }}>
        <div>
          <h3>데이터 처리</h3>
          <DataProcessor onDataProcessed={handleDataProcessed} />
        </div>
        
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>상호작용 테스트</h3>
          <p>데이터 처리 중에 다음을 시도해보세요:</p>
          <ul>
            <li>카운터 버튼 클릭</li>
            <li>다른 UI 요소들과 상호작용</li>
            <li>스크롤</li>
          </ul>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
            <h4>문제점:</h4>
            <ul>
              <li>데이터 처리 중 UI가 완전히 블로킹됨</li>
              <li>사용자가 다른 인터랙션을 할 수 없음</li>
              <li>처리 중인지 알 수 있는 피드백이 부족함</li>
              <li>사용자 경험이 매우 나쁨</li>
            </ul>
          </div>
          
          {processedData.length > 0 && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
              <h4>처리된 데이터:</h4>
              <p>총 {processedData.length}개 항목이 처리되었습니다.</p>
              <p>첫 5개 항목: {processedData.slice(0, 5).map(n => n.toFixed(2)).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransitionExample;

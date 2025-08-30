import React, { useState, useTransition } from 'react';

interface DataProcessorProps {
  onDataProcessed: (data: number[]) => void;
}

const DataProcessor: React.FC<DataProcessorProps> = ({ onDataProcessed }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  
  console.log('DataProcessor 렌더링됨');
  
  // 최적화 후: useTransition을 사용하여 비동기적으로 처리
  const processData = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // startTransition으로 무거운 작업을 백그라운드에서 처리
    startTransition(() => {
      const data: number[] = [];
      const totalItems = 10000;
      
      for (let i = 0; i < totalItems; i++) {
        // 무거운 계산 시뮬레이션
        const result = Math.sqrt(i) * Math.PI + Math.sin(i) * Math.cos(i);
        data.push(result);
        
        // 진행률 업데이트 (매 100개마다)
        if (i % 100 === 0) {
          setProgress((i / totalItems) * 100);
        }
      }
      
      setProgress(100);
      onDataProcessed(data);
      setIsProcessing(false);
    });
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3>데이터 처리 (최적화 후)</h3>
      <p>useTransition으로 UI 블로킹을 방지합니다</p>
      
      <button
        onClick={processData}
        disabled={isProcessing}
        style={{
          padding: '10px 20px',
          backgroundColor: isProcessing ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          marginBottom: '15px'
        }}
      >
        {isProcessing ? '처리 중...' : '데이터 처리 시작'}
      </button>
      
      {isPending && (
        <div style={{ marginBottom: '10px', color: '#007bff' }}>
          ⚡ 백그라운드에서 처리 중... (UI가 반응적입니다)
        </div>
      )}
      
      {isProcessing && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            진행률: {progress.toFixed(1)}%
          </div>
          <div style={{
            width: '100%',
            height: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#007bff',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p>✅ UI가 블로킹되지 않습니다</p>
        <p>10,000개의 항목을 백그라운드에서 처리합니다</p>
        <p>처리 중에도 다른 인터랙션이 가능합니다</p>
      </div>
    </div>
  );
};

export default DataProcessor;

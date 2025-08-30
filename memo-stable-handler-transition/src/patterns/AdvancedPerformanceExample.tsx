import React, { useState, useCallback, useTransition, memo } from 'react';

// 메모이제이션된 컴포넌트들
const ExpensiveChart = memo<{ data: number[]; title: string }>(({ data, title }) => {
  console.log(`${title} 차트 렌더링됨`);
  
  return (
    <div style={{ 
      padding: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f8f9fa'
    }}>
      <h4>{title}</h4>
      <div style={{ height: '100px', display: 'flex', alignItems: 'end', gap: '2px' }}>
        {data.slice(0, 20).map((value, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: `${(value / Math.max(...data)) * 80}px`,
              backgroundColor: '#007bff',
              borderRadius: '2px'
            }}
          />
        ))}
      </div>
      <p>데이터 포인트: {data.length}개</p>
    </div>
  );
});

ExpensiveChart.displayName = 'ExpensiveChart';

const SearchInput = memo<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}>(({ value, onChange, placeholder }) => {
  console.log('SearchInput 렌더링됨');
  
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        marginBottom: '10px'
      }}
    />
  );
});

SearchInput.displayName = 'SearchInput';

const AdvancedPerformanceExample: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // 안정 핸들러들
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  
  const handleGenerateData = useCallback(() => {
    setIsProcessing(true);
    
    // useTransition으로 무거운 작업을 백그라운드에서 처리
    startTransition(() => {
      const newData: number[] = [];
      const count = 1000;
      
      for (let i = 0; i < count; i++) {
        // 복잡한 계산 시뮬레이션
        const value = Math.sin(i * 0.1) * Math.cos(i * 0.05) * 100 + 50;
        newData.push(Math.abs(value));
      }
      
      setData(newData);
      setIsProcessing(false);
    });
  }, []);
  
  const handleReset = useCallback(() => {
    setData([]);
    setSearchTerm('');
    setCounter(0);
  }, []);
  
  // 필터링된 데이터 (메모이제이션)
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((_, index) => 
      index.toString().includes(searchTerm)
    );
  }, [data, searchTerm]);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>고급 성능 패턴 예제</h2>
      <p>여러 성능 패턴을 조합한 복합 예제입니다.</p>
      
      {/* 컨트롤 패널 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '15px',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>
          <button
            onClick={() => setCounter(c => c + 1)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            카운터: {counter}
          </button>
        </div>
        
        <div>
          <button
            onClick={handleGenerateData}
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isProcessing ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isProcessing ? 'not-allowed' : 'pointer'
            }}
          >
            {isProcessing ? '데이터 생성 중...' : '데이터 생성'}
          </button>
        </div>
        
        <div>
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            리셋
          </button>
        </div>
      </div>
      
      {/* 검색 입력 */}
      <div style={{ marginBottom: '20px' }}>
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="데이터 인덱스로 검색..."
        />
        {isPending && (
          <div style={{ color: '#007bff', fontSize: '14px' }}>
            ⚡ 백그라운드에서 처리 중...
          </div>
        )}
      </div>
      
      {/* 차트들 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px'
      }}>
        <ExpensiveChart 
          data={data} 
          title="전체 데이터" 
        />
        
        <ExpensiveChart 
          data={filteredData} 
          title="필터링된 데이터" 
        />
      </div>
      
      {/* 성능 정보 */}
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px' 
      }}>
        <h4>사용된 성능 패턴:</h4>
        <ul>
          <li><strong>React.memo</strong>: ExpensiveChart와 SearchInput 컴포넌트 메모이제이션</li>
          <li><strong>useCallback</strong>: 모든 이벤트 핸들러 안정화</li>
          <li><strong>useTransition</strong>: 데이터 생성 작업을 백그라운드에서 처리</li>
          <li><strong>useMemo</strong>: 필터링된 데이터 계산 메모이제이션</li>
        </ul>
        
        <div style={{ marginTop: '15px', fontSize: '14px' }}>
          <p><strong>테스트 방법:</strong></p>
          <ol>
            <li>카운터를 여러 번 클릭해보세요 - 차트들이 리렌더링되지 않습니다</li>
            <li>데이터 생성을 시작하고 카운터를 클릭해보세요 - UI가 블로킹되지 않습니다</li>
            <li>검색어를 입력해보세요 - 다른 컴포넌트들이 리렌더링되지 않습니다</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPerformanceExample;

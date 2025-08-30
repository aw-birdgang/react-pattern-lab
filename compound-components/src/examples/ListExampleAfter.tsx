import React, { useState } from 'react';
import { List } from '../components/after';

const ListExampleAfter: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
    <div className="example-component">
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <div>
          <h4>사용자 목록 (선택 가능)</h4>
          <List 
            selectable 
            onSelectionChange={setSelectedItems}
          >
            <List.Header>
              <h5>팀 멤버 ({selectedItems.length}명 선택됨)</h5>
            </List.Header>
            
            <List.Item id="user1" onClick={() => alert('김철수의 프로필을 확인합니다!')}>
              <List.ItemIcon>👨‍💻</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="김철수" 
                  secondary="프론트엔드 개발자 • 서울" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Divider />
            
            <List.Item id="user2" onClick={() => alert('이영희의 프로필을 확인합니다!')}>
              <List.ItemIcon>👩‍💻</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="이영희" 
                  secondary="백엔드 개발자 • 부산" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Divider />
            
            <List.Item id="user3" onClick={() => alert('박민수의 프로필을 확인합니다!')}>
              <List.ItemIcon>🎨</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="박민수" 
                  secondary="UI/UX 디자이너 • 대구" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Divider />
            
            <List.Item id="user4" disabled onClick={() => alert('정수진의 프로필을 확인합니다!')}>
              <List.ItemIcon>📊</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="정수진" 
                  secondary="프로젝트 매니저 • 인천" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Footer>
              <p>총 4명의 팀 멤버</p>
            </List.Footer>
          </List>
        </div>

        <div>
          <h4>프로젝트 목록</h4>
          <List>
            <List.Header>
              <h5>진행 중인 프로젝트</h5>
            </List.Header>
            
            <List.Item id="project1">
              <List.ItemIcon>⚛️</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="React 앱 개발" 
                  secondary="진행중 • 마감일: 2024-03-15" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Divider />
            
            <List.Item id="project2">
              <List.ItemIcon>🔧</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="API 설계" 
                  secondary="완료 • 마감일: 2024-02-28" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Divider />
            
            <List.Item id="project3">
              <List.ItemIcon>🗄️</List.ItemIcon>
              <List.ItemContent>
                <List.ItemText 
                  primary="데이터베이스 최적화" 
                  secondary="대기중 • 마감일: 2024-04-01" 
                />
              </List.ItemContent>
            </List.Item>
            
            <List.Footer>
              <p>총 3개의 프로젝트</p>
            </List.Footer>
          </List>
        </div>
      </div>
    </div>
  );
};

export default ListExampleAfter;

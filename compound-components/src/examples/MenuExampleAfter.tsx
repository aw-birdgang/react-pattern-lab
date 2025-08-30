import React from 'react';
import { Menu } from '../components/after';

const MenuExampleAfter: React.FC = () => {
  return (
    <div className="example-component">
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Menu placement="bottom" trigger="click">
          <Menu.Trigger>
            <button className="menu-trigger-btn">👤 사용자 메뉴</button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item id="profile" icon="👤" onClick={() => alert('프로필을 확인합니다!')}>
              프로필
            </Menu.Item>
            <Menu.Item id="settings" icon="⚙️" onClick={() => alert('설정을 엽니다!')}>
              설정
            </Menu.Item>
            <Menu.Item id="help" icon="❓" onClick={() => alert('도움말을 엽니다!')}>
              도움말
            </Menu.Item>
            <Menu.Item id="logout" icon="🚪" onClick={() => alert('로그아웃합니다!')}>
              로그아웃
            </Menu.Item>
          </Menu.Content>
        </Menu>

        <Menu placement="bottom" trigger="hover">
          <Menu.Trigger>
            <button className="menu-trigger-btn">📁 프로젝트 메뉴</button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Group title="프로젝트 관리">
              <Menu.Item id="new" icon="➕" onClick={() => alert('새 프로젝트를 생성합니다!')}>
                새 프로젝트
              </Menu.Item>
              <Menu.Item id="open" icon="📁" onClick={() => alert('프로젝트를 엽니다!')}>
                프로젝트 열기
              </Menu.Item>
              <Menu.Item id="save" icon="💾" onClick={() => alert('프로젝트를 저장합니다!')}>
                저장
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group title="내보내기">
              <Menu.Item id="export-pdf" icon="📄" onClick={() => alert('PDF로 내보냅니다!')}>
                PDF로 내보내기
              </Menu.Item>
              <Menu.Item id="export-image" icon="🖼️" onClick={() => alert('이미지로 내보냅니다!')}>
                이미지로 내보내기
              </Menu.Item>
              <Menu.Item id="export-code" icon="💻" onClick={() => alert('코드로 내보냅니다!')}>
                코드로 내보내기
              </Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Item id="preferences" icon="🔧" onClick={() => alert('환경설정을 엽니다!')}>
              환경설정
            </Menu.Item>
            <Menu.Item id="about" icon="ℹ️" onClick={() => alert('정보를 확인합니다!')}>
              정보
            </Menu.Item>
          </Menu.Content>
        </Menu>

        <Menu placement="bottom" trigger="click">
          <Menu.Trigger>
            <button className="menu-trigger-btn">🔔 알림 (3)</button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item id="notification1" icon="💬">
              새 메시지가 도착했습니다
            </Menu.Item>
            <Menu.Item id="notification2" icon="✅">
              프로젝트 업데이트 완료
            </Menu.Item>
            <Menu.Item id="notification3" icon="🔧">
              시스템 점검 예정
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item id="notification4" icon="📋" onClick={() => alert('모든 알림을 확인합니다!')}>
              모든 알림 보기
            </Menu.Item>
          </Menu.Content>
        </Menu>

        <Menu placement="right" trigger="click">
          <Menu.Trigger>
            <button className="menu-trigger-btn">⚙️ 설정</button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item id="theme" icon="🎨" onClick={() => alert('테마를 변경합니다!')}>
              테마 변경
            </Menu.Item>
            <Menu.Item id="language" icon="🌐" onClick={() => alert('언어를 설정합니다!')}>
              언어 설정
            </Menu.Item>
            <Menu.Item id="accessibility" icon="♿" onClick={() => alert('접근성 설정을 엽니다!')}>
              접근성
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    </div>
  );
};

export default MenuExampleAfter;

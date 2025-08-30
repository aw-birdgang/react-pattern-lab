# React Compound Components 패턴 완전 가이드

이 프로젝트는 React의 **Compound Components 패턴**을 학습하기 위한 종합적인 예제 프로젝트입니다. Compound Components 패턴을 사용하기 전과 후의 코드를 비교하여 이 패턴의 장점을 이해하고, 실제 구현 방법을 학습할 수 있습니다.

## 📋 목차
1. [Compound Components 패턴 개요](#compound-components-패턴-개요)
2. [핵심 개념과 원리](#핵심-개념과-원리)
3. [프로젝트 구조](#프로젝트-구조)
4. [컴포넌트별 상세 분석](#컴포넌트별-상세-분석)
5. [패턴의 장점과 단점](#패턴의-장점과-단점)
6. [실제 사용 사례](#실제-사용-사례)
7. [구현 가이드](#구현-가이드)
8. [실습 가이드](#실습-가이드)
9. [결론](#결론)

---

## Compound Components 패턴 개요

### 🎯 정의
Compound Components는 여러 컴포넌트가 함께 작동하여 완전한 UI를 구성하는 React 패턴입니다. 이 패턴의 핵심은 **상태 공유**와 **유연한 구조**를 통해 사용자가 JSX로 자유롭게 UI 구조를 정의할 수 있게 하는 것입니다.

### 주요 특징:
- **상태 공유**: Context API를 통해 컴포넌트 간 상태를 공유
- **유연한 구조**: JSX로 자유롭게 구조를 정의할 수 있음
- **재사용성**: 각 컴포넌트를 독립적으로 사용 가능
- **더 나은 API**: 직관적이고 읽기 쉬운 코드
- **타입 안전성**: TypeScript와 완벽한 호환

---

## 핵심 개념과 원리

### 1. Context API 활용
```tsx
// Context 정의
interface ModalContextType {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider로 상태 공유
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <div className="modal-overlay">
        <div className="modal">{children}</div>
      </div>
    </ModalContext.Provider>
  );
};
```

### 2. Hook으로 Context 사용
```tsx
const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a Modal');
  }
  return context;
};
```

### 3. Compound Components 조합
```tsx
const CompoundModal = Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  ConfirmButton: ModalConfirmButton,
  CancelButton: ModalCancelButton,
});
```

---

## 프로젝트 구조

```
src/
├── components/
│   ├── before/                    # 일반적인 컴포넌트들 (패턴 적용 전)
│   │   ├── Modal.tsx
│   │   ├── Accordion.tsx
│   │   ├── Form.tsx
│   │   └── index.ts
│   ├── after/                     # Compound Components 패턴 적용 후
│   │   ├── Modal.tsx
│   │   ├── Accordion.tsx
│   │   ├── Form.tsx
│   │   ├── Tabs.tsx
│   │   ├── Stepper.tsx
│   │   ├── Card.tsx
│   │   ├── List.tsx
│   │   ├── Menu.tsx
│   │   └── index.ts
│   └── index.ts                   # 모든 컴포넌트 export
├── examples/
│   ├── ModalExample.tsx           # Modal 예제 통합 컴포넌트
│   ├── ModalExampleBefore.tsx     # Modal 패턴 적용 전
│   ├── ModalExampleAfter.tsx      # Modal 패턴 적용 후
│   ├── AccordionExample.tsx       # Accordion 예제 통합 컴포넌트
│   ├── AccordionExampleBefore.tsx # Accordion 패턴 적용 전
│   ├── AccordionExampleAfter.tsx  # Accordion 패턴 적용 후
│   ├── FormExample.tsx            # Form 예제 통합 컴포넌트
│   ├── FormExampleBefore.tsx      # Form 패턴 적용 전
│   ├── FormExampleAfter.tsx       # Form 패턴 적용 후
│   ├── TabsExample.tsx            # Tabs 예제 통합 컴포넌트
│   ├── TabsExampleBefore.tsx      # Tabs 패턴 적용 전
│   ├── TabsExampleAfter.tsx       # Tabs 패턴 적용 후
│   ├── StepperExample.tsx         # Stepper 예제 통합 컴포넌트
│   ├── StepperExampleBefore.tsx   # Stepper 패턴 적용 전
│   ├── StepperExampleAfter.tsx    # Stepper 패턴 적용 후
│   ├── CardExample.tsx            # Card 예제 통합 컴포넌트
│   ├── CardExampleBefore.tsx      # Card 패턴 적용 전
│   ├── CardExampleAfter.tsx       # Card 패턴 적용 후
│   ├── ListExample.tsx            # List 예제 통합 컴포넌트
│   ├── ListExampleBefore.tsx      # List 패턴 적용 전
│   ├── ListExampleAfter.tsx       # List 패턴 적용 후
│   ├── MenuExample.tsx            # Menu 예제 통합 컴포넌트
│   ├── MenuExampleBefore.tsx      # Menu 패턴 적용 전
│   ├── MenuExampleAfter.tsx       # Menu 패턴 적용 후
│   └── index.ts                   # 모든 예제 컴포넌트 export
├── App.tsx                        # 메인 애플리케이션
└── App.css                        # 스타일
```

---

## 컴포넌트별 상세 분석

### 1. Modal 컴포넌트

#### ❌ Before: 일반적인 Modal
```tsx
// 사용법
<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="일반 Modal"
  content="고정된 구조로 유연성이 떨어집니다."
  footerText="확인"
  onConfirm={() => alert('확인!')}
/>

// 구현
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  footerText?: string;
  onConfirm?: () => void;
}
```

**문제점:**
- 구조가 고정되어 있어 유연성이 떨어짐
- props가 많아져서 복잡해짐
- 커스터마이징이 어려움
- 모든 내용을 props로 전달해야 함
- HTML 구조를 자유롭게 변경할 수 없음

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
  <CompoundModal.Header>
    <h2>Compound Modal</h2>
  </CompoundModal.Header>
  <CompoundModal.Body>
    <p>유연한 구조로 원하는 대로 커스터마이징할 수 있습니다!</p>
    <ul>
      <li>복잡한 HTML 구조 가능</li>
      <li>조건부 렌더링 가능</li>
    </ul>
  </CompoundModal.Body>
  <CompoundModal.Footer>
    <CompoundModal.ConfirmButton onClick={() => alert('확인!')}>
      확인
    </CompoundModal.ConfirmButton>
    <CompoundModal.CancelButton>취소</CompoundModal.CancelButton>
  </CompoundModal.Footer>
</CompoundModal>
```

**장점:**
- JSX로 자유롭게 구조 정의 가능
- 각 부분을 독립적으로 커스터마이징 가능
- 더 직관적이고 읽기 쉬운 코드
- 복잡한 HTML 구조 지원
- 조건부 렌더링과 동적 콘텐츠 지원

### 2. Accordion 컴포넌트

#### ❌ Before: 데이터 기반 Accordion
```tsx
// 사용법
<Accordion 
  items={[
    { id: '1', title: '제목', content: '내용' }
  ]} 
  allowMultiple={false} 
/>

// 구현
interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}
```

**문제점:**
- 데이터 기반으로 렌더링되어 구조가 고정됨
- 복잡한 내용을 표현하기 어려움
- HTML 구조를 자유롭게 구성할 수 없음
- 모든 아이템이 동일한 구조를 가져야 함
- 리치 콘텐츠(이미지, 리스트, 폼 등) 지원 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundAccordion allowMultiple={false}>
  <CompoundAccordion.Item id="1">
    <CompoundAccordion.Header>
      React란 무엇인가요?
    </CompoundAccordion.Header>
    <CompoundAccordion.Content>
      <p>React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.</p>
      <ul>
        <li>컴포넌트 기반</li>
        <li>가상 DOM</li>
        <li>단방향 데이터 플로우</li>
      </ul>
      <img src="react-logo.png" alt="React Logo" />
    </CompoundAccordion.Content>
  </CompoundAccordion.Item>
</CompoundAccordion>
```

**장점:**
- JSX로 자유롭게 구조 정의 가능
- 복잡한 내용을 HTML로 직접 표현 가능
- 각 아이템마다 다른 구조 사용 가능
- 리치 콘텐츠(이미지, 리스트, 폼 등) 지원
- 조건부 렌더링과 동적 콘텐츠 지원

### 3. Form 컴포넌트

#### ❌ Before: 필드 배열 기반 Form
```tsx
// 사용법
<Form 
  fields={[
    { name: 'name', label: '이름', type: 'text', required: true },
    { name: 'email', label: '이메일', type: 'email', required: true }
  ]} 
  onSubmit={handleSubmit}
/>

// 구현
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea';
  required?: boolean;
  placeholder?: string;
}
```

**문제점:**
- 필드 배열로 정의하여 유연성이 떨어짐
- 복잡한 폼 구조를 표현하기 어려움
- 각 필드의 커스터마이징이 제한적
- 폼 검증 로직이 컴포넌트 내부에 하드코딩됨
- 조건부 필드나 동적 폼 구조 지원 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundForm onSubmit={handleSubmit}>
  <CompoundForm.Field 
    name="name" 
    label="이름" 
    required 
    placeholder="이름을 입력하세요"
  />
  <CompoundForm.Field 
    name="email" 
    label="이메일" 
    type="email"
    required 
  />
  <CompoundForm.TextArea 
    name="message" 
    label="메시지" 
    rows={4}
    placeholder="메시지를 입력하세요"
  />
  {showExtraField && (
    <CompoundForm.Field 
      name="extra" 
      label="추가 정보" 
    />
  )}
  <CompoundForm.Submit>제출하기</CompoundForm.Submit>
</CompoundForm>
```

**장점:**
- JSX로 자유롭게 폼 구조 정의 가능
- 각 필드를 독립적으로 커스터마이징 가능
- 복잡한 폼 검증 로직을 유연하게 구현 가능
- 조건부 필드와 동적 폼 구조 지원
- 다양한 입력 타입과 커스텀 필드 지원

### 4. Tabs 컴포넌트

#### ❌ Before: 데이터 기반 Tabs
```tsx
// 사용법
<Tabs 
  tabs={[
    { id: 'overview', label: '개요', content: '내용' },
    { id: 'features', label: '기능', content: '기능 내용' }
  ]} 
  defaultTab="overview"
/>
```

**문제점:**
- 데이터 기반으로 렌더링되어 구조가 고정됨
- 복잡한 탭 콘텐츠를 표현하기 어려움
- 각 탭마다 다른 구조 사용 어려움
- 동적 탭 추가/제거 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundTabs defaultTab="overview">
  <CompoundTabs.List>
    <CompoundTabs.Trigger id="overview">개요</CompoundTabs.Trigger>
    <CompoundTabs.Trigger id="features">기능</CompoundTabs.Trigger>
    <CompoundTabs.Trigger id="examples">예제</CompoundTabs.Trigger>
  </CompoundTabs.List>
  <CompoundTabs.Content id="overview">
    <h3>React 개요</h3>
    <p>React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.</p>
  </CompoundTabs.Content>
  <CompoundTabs.Content id="features">
    <ul>
      <li>컴포넌트 기반</li>
      <li>가상 DOM</li>
      <li>단방향 데이터 플로우</li>
    </ul>
  </CompoundTabs.Content>
  <CompoundTabs.Content id="examples">
    <div className="code-example">
      <pre><code>{codeExample}</code></pre>
    </div>
  </CompoundTabs.Content>
</CompoundTabs>
```

**장점:**
- JSX로 자유롭게 탭 구조 정의 가능
- 복잡한 탭 콘텐츠를 HTML로 직접 표현 가능
- 각 탭마다 다른 구조 사용 가능
- 동적 탭 추가/제거 지원
- 접근성 속성 자동 적용

### 5. Stepper 컴포넌트

#### ❌ Before: 데이터 기반 Stepper
```tsx
// 사용법
<Stepper 
  steps={[
    { id: 1, title: '계정 정보', content: '폼 내용' },
    { id: 2, title: '프로필 설정', content: '프로필 폼' }
  ]} 
  initialStep={0}
/>
```

**문제점:**
- 데이터 기반으로 렌더링되어 구조가 고정됨
- 복잡한 스텝 콘텐츠를 표현하기 어려움
- 각 스텝마다 다른 구조 사용 어려움
- 동적 스텝 추가/제거 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundStepper initialStep={0}>
  <CompoundStepper.List>
    <CompoundStepper.Step id={0} title="계정 정보" description="기본 정보 입력" />
    <CompoundStepper.Step id={1} title="프로필 설정" description="프로필 정보 설정" />
    <CompoundStepper.Step id={2} title="완료" description="가입 완료" />
  </CompoundStepper.List>
  <CompoundStepper.Content id={0}>
    <form>
      <input type="text" placeholder="이름" />
      <input type="email" placeholder="이메일" />
    </form>
  </CompoundStepper.Content>
  <CompoundStepper.Content id={1}>
    <div className="profile-form">
      <input type="file" accept="image/*" />
      <textarea placeholder="자기소개"></textarea>
    </div>
  </CompoundStepper.Content>
  <CompoundStepper.Content id={2}>
    <div className="completion">
      <h3>가입이 완료되었습니다!</h3>
      <p>환영합니다.</p>
    </div>
  </CompoundStepper.Content>
  <CompoundStepper.Navigation>
    <CompoundStepper.Button onClick={handlePrev} variant="secondary">이전</CompoundStepper.Button>
    <CompoundStepper.Button onClick={handleNext} variant="primary">다음</CompoundStepper.Button>
  </CompoundStepper.Navigation>
</CompoundStepper>
```

**장점:**
- JSX로 자유롭게 스텝 구조 정의 가능
- 복잡한 스텝 콘텐츠를 HTML로 직접 표현 가능
- 각 스텝마다 다른 구조 사용 가능
- 동적 스텝 추가/제거 지원
- 스텝 완료 상태 관리 지원

### 6. Card 컴포넌트

#### ❌ Before: Props 기반 Card
```tsx
// 사용법
<Card 
  title="제목"
  subtitle="부제목"
  content="내용"
  image={{ src: "image.jpg", alt: "이미지" }}
  actions={[{ label: "확인", onClick: handleClick }]}
/>
```

**문제점:**
- 구조가 고정되어 있어 유연성이 떨어짐
- 복잡한 카드 콘텐츠를 표현하기 어려움
- 각 카드마다 다른 구조 사용 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundCard variant="elevated" interactive>
  <CompoundCard.Image src="image.jpg" alt="이미지" />
  <CompoundCard.Header>
    <CompoundCard.Title>제목</CompoundCard.Title>
    <CompoundCard.Subtitle>부제목</CompoundCard.Subtitle>
  </CompoundCard.Header>
  <CompoundCard.Body>
    <CompoundCard.Badge variant="primary">태그</CompoundCard.Badge>
    <p>내용</p>
    <ul>
      <li>리스트 아이템 1</li>
      <li>리스트 아이템 2</li>
    </ul>
  </CompoundCard.Body>
  <CompoundCard.Footer>
    <CompoundCard.Action onClick={handleClick} variant="primary">확인</CompoundCard.Action>
    <CompoundCard.Action onClick={handleCancel} variant="secondary">취소</CompoundCard.Action>
  </CompoundCard.Footer>
</CompoundCard>
```

**장점:**
- JSX로 자유롭게 카드 구조 정의 가능
- 복잡한 카드 콘텐츠를 HTML로 직접 표현 가능
- 각 카드마다 다른 구조 사용 가능
- 다양한 카드 변형 지원

### 7. List 컴포넌트

#### ❌ Before: 데이터 기반 List
```tsx
// 사용법
<List 
  items={[
    { id: '1', primary: '제목', secondary: '부제목', icon: '👤' }
  ]} 
  selectable
/>
```

**문제점:**
- 데이터 기반으로 렌더링되어 구조가 고정됨
- 복잡한 리스트 아이템을 표현하기 어려움
- 각 아이템마다 다른 구조 사용 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundList selectable onSelectionChange={handleSelection}>
  <CompoundList.Header>사용자 목록</CompoundList.Header>
  <CompoundList.Item id="user1" onClick={handleClick}>
    <CompoundList.ItemIcon>👤</CompoundList.ItemIcon>
    <CompoundList.ItemContent>
      <CompoundList.ItemText primary="김철수" secondary="프론트엔드 개발자" />
      <CompoundList.ItemMeta>
        <span className="status online">온라인</span>
      </CompoundList.ItemMeta>
    </CompoundList.ItemContent>
  </CompoundList.Item>
  <CompoundList.Divider />
  <CompoundList.Item id="user2">
    <CompoundList.ItemIcon>👩‍💻</CompoundList.ItemIcon>
    <CompoundList.ItemContent>
      <CompoundList.ItemText primary="이영희" secondary="백엔드 개발자" />
      <CompoundList.ItemMeta>
        <span className="status offline">오프라인</span>
      </CompoundList.ItemMeta>
    </CompoundList.ItemContent>
  </CompoundList.Item>
  <CompoundList.Footer>총 2명의 사용자</CompoundList.Footer>
</CompoundList>
```

**장점:**
- JSX로 자유롭게 리스트 구조 정의 가능
- 복잡한 리스트 아이템을 HTML로 직접 표현 가능
- 각 아이템마다 다른 구조 사용 가능
- 헤더, 푸터, 구분선 등 다양한 요소 지원

### 8. Menu 컴포넌트

#### ❌ Before: 데이터 기반 Menu
```tsx
// 사용법
<Menu 
  trigger={<button>메뉴</button>}
  items={[
    { id: 'profile', label: '프로필', icon: '👤' }
  ]} 
  placement="bottom"
/>
```

**문제점:**
- 데이터 기반으로 렌더링되어 구조가 고정됨
- 복잡한 메뉴 구조를 표현하기 어려움
- 각 메뉴 아이템마다 다른 구조 사용 어려움

#### ✅ After: Compound Components 패턴
```tsx
// 사용법
<CompoundMenu placement="bottom" trigger="click">
  <CompoundMenu.Trigger>
    <button>사용자 메뉴</button>
  </CompoundMenu.Trigger>
  <CompoundMenu.Content>
    <CompoundMenu.Item id="profile" icon="👤" onClick={handleProfile}>
      프로필
    </CompoundMenu.Item>
    <CompoundMenu.Divider />
    <CompoundMenu.Group title="설정">
      <CompoundMenu.Item id="settings" icon="⚙️" onClick={handleSettings}>
        설정
      </CompoundMenu.Item>
      <CompoundMenu.Item id="preferences" icon="🎨" onClick={handlePreferences}>
        환경설정
      </CompoundMenu.Item>
    </CompoundMenu.Group>
    <CompoundMenu.Divider />
    <CompoundMenu.Item id="logout" icon="🚪" onClick={handleLogout}>
      로그아웃
    </CompoundMenu.Item>
  </CompoundMenu.Content>
</CompoundMenu>
```

**장점:**
- JSX로 자유롭게 메뉴 구조 정의 가능
- 복잡한 메뉴 구조를 HTML로 직접 표현 가능
- 각 메뉴 아이템마다 다른 구조 사용 가능
- 그룹, 구분선 등 다양한 메뉴 요소 지원

---

## 패턴의 장점과 단점

### 🎯 장점

#### 1. **유연성 (Flexibility)**
- JSX로 자유롭게 구조 정의 가능
- 각 컴포넌트를 독립적으로 커스터마이징 가능
- 복잡한 HTML 구조 지원

#### 2. **가독성 (Readability)**
- 직관적이고 읽기 쉬운 코드
- HTML과 유사한 구조로 이해하기 쉬움
- 명확한 컴포넌트 계층 구조

#### 3. **재사용성 (Reusability)**
- 각 컴포넌트를 독립적으로 사용 가능
- 다양한 조합으로 다양한 UI 구성 가능
- 일관된 API로 학습 비용 감소

#### 4. **확장성 (Extensibility)**
- 새로운 컴포넌트 추가 용이
- 기존 컴포넌트 수정 시 영향 범위 최소화
- 점진적 개선 가능

#### 5. **타입 안전성 (Type Safety)**
- TypeScript와 완벽한 호환
- 컴파일 타임에 오류 검출
- 자동완성과 IntelliSense 지원

### ⚠️ 단점

#### 1. **복잡성 (Complexity)**
- Context API 사용으로 인한 복잡성 증가
- 초기 학습 곡선이 가파름
- 디버깅이 어려울 수 있음

#### 2. **성능 (Performance)**
- Context Provider로 인한 리렌더링 가능성
- 불필요한 리렌더링 방지를 위한 최적화 필요
- 메모리 사용량 증가

#### 3. **보일러플레이트 (Boilerplate)**
- 많은 보일러플레이트 코드 필요
- Context, Hook, 타입 정의 등 추가 코드
- 작은 컴포넌트에는 과도할 수 있음

---

## 실제 사용 사례

### 1. **UI 라이브러리**
- **Material-UI**: `TextField`, `Dialog` 등
- **Ant Design**: `Form`, `Modal` 등
- **Chakra UI**: `Accordion`, `Tabs` 등

### 2. **폼 관리**
```tsx
// React Hook Form과 함께 사용
<Form onSubmit={handleSubmit}>
  <Form.Field name="name" label="이름" />
  <Form.Field name="email" label="이메일" type="email" />
  <Form.Submit>제출</Form.Submit>
</Form>
```

### 3. **데이터 테이블**
```tsx
<DataTable data={users}>
  <DataTable.Header>
    <DataTable.Column key="name">이름</DataTable.Column>
    <DataTable.Column key="email">이메일</DataTable.Column>
  </DataTable.Header>
  <DataTable.Body>
    <DataTable.Row>
      <DataTable.Cell>김철수</DataTable.Cell>
      <DataTable.Cell>kim@example.com</DataTable.Cell>
    </DataTable.Row>
  </DataTable.Body>
</DataTable>
```

### 4. **네비게이션**
```tsx
<Navigation>
  <Navigation.Item href="/dashboard">대시보드</Navigation.Item>
  <Navigation.Item href="/users">사용자</Navigation.Item>
  <Navigation.Dropdown label="설정">
    <Navigation.Item href="/profile">프로필</Navigation.Item>
    <Navigation.Item href="/settings">설정</Navigation.Item>
  </Navigation.Dropdown>
</Navigation>
```

---

## 구현 가이드

### 1. **기본 구조 설계**
```tsx
// 1. Context 정의
interface ComponentContextType {
  // 공유할 상태와 메서드
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

// 2. Hook 생성
const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('Component must be used within a Component');
  }
  return context;
};

// 3. 메인 컴포넌트
const Component: React.FC<ComponentProps> = ({ children }) => {
  return (
    <ComponentContext.Provider value={contextValue}>
      <div className="component">{children}</div>
    </ComponentContext.Provider>
  );
};

// 4. 서브 컴포넌트들
const ComponentSub: React.FC<SubProps> = ({ children }) => {
  const context = useComponentContext();
  return <div className="component-sub">{children}</div>;
};

// 5. Compound Components 조합
const CompoundComponent = Object.assign(Component, {
  Sub: ComponentSub,
  // 다른 서브 컴포넌트들...
});
```

### 2. **타입 안전성 확보**
```tsx
// 엄격한 타입 정의
interface ComponentProps {
  children: ReactNode;
  // 기타 props
}

interface SubComponentProps {
  children: ReactNode;
  // 서브 컴포넌트별 props
}

// 제네릭을 활용한 유연한 타입
interface DataContextType<T> {
  data: T[];
  selectedItems: T[];
  onSelect: (item: T) => void;
}
```

### 3. **성능 최적화**
```tsx
// React.memo를 활용한 불필요한 리렌더링 방지
const ComponentSub = React.memo<SubProps>(({ children }) => {
  const context = useComponentContext();
  return <div className="component-sub">{children}</div>;
});

// useMemo를 활용한 계산 최적화
const contextValue = useMemo(() => ({
  // 계산된 값들
}), [dependencies]);
```

### 4. **접근성 고려**
```tsx
// ARIA 속성 자동 적용
const ComponentTrigger: React.FC<TriggerProps> = ({ children, id }) => {
  const context = useComponentContext();
  return (
    <button
      role="tab"
      aria-selected={context.isActive(id)}
      aria-controls={`panel-${id}`}
      onClick={() => context.setActive(id)}
    >
      {children}
    </button>
  );
};
```

---

## 실습 가이드

### 🚀 시작하기

#### 설치
```bash
npm install
```

#### 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

### 📚 학습 방법

1. **Before/After 비교**: 각 컴포넌트의 패턴 적용 전후를 비교하여 차이점 이해
2. **코드 분석**: 실제 구현 코드를 살펴보며 패턴의 동작 원리 파악
3. **실습**: 예제 코드를 수정하여 다양한 시나리오 테스트
4. **확장**: 새로운 Compound Component 구현해보기

### 🎨 스타일링

이 프로젝트는 모던하고 반응형 디자인을 사용합니다:
- CSS Grid를 활용한 레이아웃
- 그라데이션 배경
- 부드러운 애니메이션과 전환 효과
- 모바일 친화적인 반응형 디자인

### 📖 학습 포인트

1. **Context API 활용**: 컴포넌트 간 상태 공유 방법
2. **TypeScript와의 조합**: 타입 안전성 확보
3. **에러 처리**: Context 사용 시 적절한 에러 메시지
4. **유연한 API 설계**: 사용자가 원하는 대로 구조를 정의할 수 있도록
5. **재사용성**: 각 컴포넌트의 독립적 사용 가능
6. **다양한 UI 패턴**: Modal, Accordion, Form, Tabs, Stepper, Card, List, Menu 등 다양한 컴포넌트 패턴
7. **상태 관리**: 각 컴포넌트별 적절한 상태 관리 전략
8. **접근성**: ARIA 속성과 키보드 네비게이션 지원
9. **반응형 디자인**: 모바일 친화적인 반응형 레이아웃
10. **코드 분리**: 예제별로 파일을 분리하여 가독성 향상
11. **Before/After 분리**: 패턴 적용 전후를 명확히 구분하여 비교 가능
12. **구조화된 컴포넌트**: before/after 디렉토리로 패턴 적용 전후 명확히 구분

---

## 결론

### 🎯 Compound Components 패턴의 가치

Compound Components 패턴은 React에서 복잡한 UI 컴포넌트를 구축할 때 매우 강력한 도구입니다. 이 패턴을 통해 다음과 같은 가치를 얻을 수 있습니다:

#### 1. **개발자 경험 향상**
- 직관적이고 읽기 쉬운 코드
- HTML과 유사한 구조로 이해하기 쉬움
- 명확한 컴포넌트 계층 구조

#### 2. **유연성과 확장성**
- JSX로 자유롭게 구조 정의 가능
- 각 컴포넌트를 독립적으로 커스터마이징 가능
- 새로운 기능 추가 시 기존 코드 영향 최소화

#### 3. **재사용성과 일관성**
- 일관된 API로 학습 비용 감소
- 다양한 조합으로 다양한 UI 구성 가능
- 컴포넌트 라이브러리 구축에 적합

#### 4. **타입 안전성**
- TypeScript와 완벽한 호환
- 컴파일 타임에 오류 검출
- 자동완성과 IntelliSense 지원

### 🚀 언제 사용해야 하는가?

#### ✅ **적합한 경우**
- 복잡한 UI 컴포넌트 (Modal, Accordion, Tabs, Form 등)
- 재사용 가능한 컴포넌트 라이브러리 구축
- 유연한 구조가 필요한 컴포넌트
- 팀 프로젝트에서 일관된 API 필요

#### ❌ **부적합한 경우**
- 단순한 UI 컴포넌트
- 고정된 구조로 충분한 경우
- 성능이 매우 중요한 경우
- 작은 규모의 프로젝트

### 📚 학습 방향

1. **Context API 마스터하기**: 상태 공유의 핵심
2. **TypeScript와의 조합**: 타입 안전성 확보
3. **성능 최적화**: 불필요한 리렌더링 방지
4. **접근성 고려**: ARIA 속성과 키보드 네비게이션
5. **실제 프로젝트 적용**: 점진적 도입과 리팩토링

### 🔗 참고 자료

- [React 공식 문서 - Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Kent C. Dodds - Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [React Patterns](https://reactpatterns.com/)

### 📝 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

---

Compound Components 패턴은 React 생태계에서 매우 중요한 패턴 중 하나이며, 이를 마스터하면 더 나은 UI 컴포넌트를 구축할 수 있습니다. 이 패턴의 핵심은 **사용자 중심의 API 설계**와 **유연한 구조 제공**에 있습니다.

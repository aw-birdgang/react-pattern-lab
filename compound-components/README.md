# React Compound Components 패턴 예제

이 프로젝트는 React의 **Compound Components 패턴**을 학습하기 위한 예제 프로젝트입니다. Compound Components 패턴을 사용하기 전과 후의 코드를 비교하여 이 패턴의 장점을 이해할 수 있습니다.

## 🎯 Compound Components 패턴이란?

Compound Components는 여러 컴포넌트가 함께 작동하여 완전한 UI를 구성하는 패턴입니다. 이 패턴의 핵심은 **상태 공유**와 **유연한 구조**입니다.

### 주요 특징:
- **상태 공유**: Context API를 통해 컴포넌트 간 상태를 공유
- **유연한 구조**: JSX로 자유롭게 구조를 정의할 수 있음
- **재사용성**: 각 컴포넌트를 독립적으로 사용 가능
- **더 나은 API**: 직관적이고 읽기 쉬운 코드

## 📁 프로젝트 구조

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

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📚 예제 설명

### 1. Modal 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="일반 Modal"
  content="고정된 구조로 유연성이 떨어집니다."
  footerText="확인"
  onConfirm={() => alert('확인!')}
/>
```

**문제점:**
- 구조가 고정되어 있어 유연성이 떨어짐
- props가 많아져서 복잡해짐
- 커스터마이징이 어려움

#### ✅ Compound Components 패턴 사용 후
```tsx
<CompoundModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
  <CompoundModal.Header>
    <h2>Compound Modal</h2>
  </CompoundModal.Header>
  <CompoundModal.Body>
    <p>유연한 구조로 원하는 대로 커스터마이징할 수 있습니다!</p>
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
- JSX로 자유롭게 구조 정의
- 각 부분을 독립적으로 커스터마이징 가능
- 더 직관적이고 읽기 쉬운 코드

### 2. Accordion 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Accordion 
  items={[
    { id: '1', title: '제목', content: '내용' }
  ]} 
  allowMultiple={false} 
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
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
      </ul>
    </CompoundAccordion.Content>
  </CompoundAccordion.Item>
</CompoundAccordion>
```

### 3. Form 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Form 
  fields={[
    { name: 'name', label: '이름', type: 'text', required: true }
  ]} 
  onSubmit={handleSubmit}
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
<CompoundForm onSubmit={handleSubmit}>
  <CompoundForm.Field 
    name="name" 
    label="이름" 
    required 
    placeholder="이름을 입력하세요"
  />
  <CompoundForm.TextArea 
    name="message" 
    label="메시지" 
    rows={4}
  />
  <CompoundForm.Submit>제출하기</CompoundForm.Submit>
</CompoundForm>
```

### 4. Tabs 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Tabs 
  tabs={[
    { id: 'overview', label: '개요', content: '내용' }
  ]} 
  defaultTab="overview"
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
<CompoundTabs defaultTab="overview">
  <CompoundTabs.List>
    <CompoundTabs.Trigger id="overview">개요</CompoundTabs.Trigger>
    <CompoundTabs.Trigger id="features">기능</CompoundTabs.Trigger>
  </CompoundTabs.List>
  <CompoundTabs.Content id="overview">
    <p>React 개요 내용</p>
  </CompoundTabs.Content>
  <CompoundTabs.Content id="features">
    <p>React 기능 내용</p>
  </CompoundTabs.Content>
</CompoundTabs>
```

### 5. Stepper 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Stepper 
  steps={[
    { id: 1, title: '계정 정보', content: '폼 내용' }
  ]} 
  initialStep={0}
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
<CompoundStepper initialStep={0}>
  <CompoundStepper.List>
    <CompoundStepper.Step id={0} title="계정 정보" description="기본 정보 입력" />
    <CompoundStepper.Step id={1} title="프로필 설정" description="프로필 정보 설정" />
  </CompoundStepper.List>
  <CompoundStepper.Content id={0}>
    <form>계정 정보 폼</form>
  </CompoundStepper.Content>
  <CompoundStepper.Content id={1}>
    <form>프로필 설정 폼</form>
  </CompoundStepper.Content>
  <CompoundStepper.Navigation>
    <CompoundStepper.Button onClick={handlePrev} variant="secondary">이전</CompoundStepper.Button>
    <CompoundStepper.Button onClick={handleNext} variant="primary">다음</CompoundStepper.Button>
  </CompoundStepper.Navigation>
</CompoundStepper>
```

### 6. Card 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Card 
  title="제목"
  subtitle="부제목"
  content="내용"
  image={{ src: "image.jpg", alt: "이미지" }}
  actions={[{ label: "확인", onClick: handleClick }]}
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
<CompoundCard variant="elevated" interactive>
  <CompoundCard.Image src="image.jpg" alt="이미지" />
  <CompoundCard.Header>
    <CompoundCard.Title>제목</CompoundCard.Title>
    <CompoundCard.Subtitle>부제목</CompoundCard.Subtitle>
  </CompoundCard.Header>
  <CompoundCard.Body>
    <CompoundCard.Badge variant="primary">태그</CompoundCard.Badge>
    <p>내용</p>
  </CompoundCard.Body>
  <CompoundCard.Footer>
    <CompoundCard.Action onClick={handleClick} variant="primary">확인</CompoundCard.Action>
  </CompoundCard.Footer>
</CompoundCard>
```

### 7. List 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<List 
  items={[
    { id: '1', primary: '제목', secondary: '부제목', icon: '👤' }
  ]} 
  selectable
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
<CompoundList selectable onSelectionChange={handleSelection}>
  <CompoundList.Header>사용자 목록</CompoundList.Header>
  <CompoundList.Item id="user1" onClick={handleClick}>
    <CompoundList.ItemIcon>👤</CompoundList.ItemIcon>
    <CompoundList.ItemContent>
      <CompoundList.ItemText primary="김철수" secondary="프론트엔드 개발자" />
    </CompoundList.ItemContent>
  </CompoundList.Item>
  <CompoundList.Divider />
  <CompoundList.Item id="user2">
    <CompoundList.ItemIcon>👩‍💻</CompoundList.ItemIcon>
    <CompoundList.ItemContent>
      <CompoundList.ItemText primary="이영희" secondary="백엔드 개발자" />
    </CompoundList.ItemContent>
  </CompoundList.Item>
  <CompoundList.Footer>총 2명의 사용자</CompoundList.Footer>
</CompoundList>
```

### 8. Menu 컴포넌트

#### ❌ Compound Components 패턴 사용 전
```tsx
<Menu 
  trigger={<button>메뉴</button>}
  items={[
    { id: 'profile', label: '프로필', icon: '👤' }
  ]} 
  placement="bottom"
/>
```

#### ✅ Compound Components 패턴 사용 후
```tsx
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
    </CompoundMenu.Group>
  </CompoundMenu.Content>
</CompoundMenu>
```

## 🔧 핵심 구현 방법

### 1. Context 생성
```tsx
const ModalContext = createContext<ModalContextType | undefined>(undefined);
```

### 2. Provider로 상태 공유
```tsx
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

### 3. Hook으로 Context 사용
```tsx
const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a Modal');
  }
  return context;
};
```

### 4. Compound Components 조합
```tsx
const CompoundModal = Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  ConfirmButton: ModalConfirmButton,
  CancelButton: ModalCancelButton,
});
```

## 🎨 스타일링

이 프로젝트는 모던하고 반응형 디자인을 사용합니다:
- CSS Grid를 활용한 레이아웃
- 그라데이션 배경
- 부드러운 애니메이션과 전환 효과
- 모바일 친화적인 반응형 디자인

## 📖 학습 포인트

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

## 🔗 참고 자료

- [React 공식 문서 - Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Kent C. Dodds - Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [React Patterns](https://reactpatterns.com/)

## 📝 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

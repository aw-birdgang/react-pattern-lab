import React from 'react';
import './App.css';

// 예제 컴포넌트들
import { 
  ModalExample, 
  AccordionExample, 
  FormExample, 
  TabsExample, 
  StepperExample, 
  CardExample, 
  ListExample, 
  MenuExample 
} from './examples';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Compound Components 패턴 예제</h1>
        <p>Compound Components 패턴을 사용하기 전과 후의 코드를 비교해보세요!</p>
      </header>

      <main className="App-main">
        {/* Modal 예제 */}
        <ModalExample />

        {/* Accordion 예제 */}
        <AccordionExample />

        {/* Form 예제 */}
        <FormExample />

        {/* Tabs 예제 */}
        <TabsExample />

        {/* Stepper 예제 */}
        <StepperExample />

        {/* Card 예제 */}
        <CardExample />

        {/* List 예제 */}
        <ListExample />

        {/* Menu 예제 */}
        <MenuExample />
      </main>

      <footer className="App-footer">
        <p>React Compound Components 패턴 학습을 위한 예제 프로젝트</p>
      </footer>
    </div>
  );
}

export default App;

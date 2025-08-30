// Before 컴포넌트들 (일반적인 컴포넌트)
export { Modal as BeforeModal } from './before';
export { Accordion as BeforeAccordion } from './before';
export { Form as BeforeForm } from './before';

// After 컴포넌트들 (Compound Components 패턴 적용)
export { Modal as AfterModal } from './after';
export { Accordion as AfterAccordion } from './after';
export { Form as AfterForm } from './after';

// 편의를 위한 별칭 export
export { Modal as CompoundModal } from './after';
export { Accordion as CompoundAccordion } from './after';
export { Form as CompoundForm } from './after';

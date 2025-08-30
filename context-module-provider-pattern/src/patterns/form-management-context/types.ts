// Form Management Context Module 타입 정의

export interface FormField {
  name: string;
  value: string;
  error?: string;
  touched: boolean;
  required?: boolean;
  validation?: (value: string) => string | undefined;
}

export interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// 액션 타입 정의
export type FormAction =
  | { type: 'SET_FIELD_VALUE'; payload: { name: string; value: string } }
  | { type: 'SET_FIELD_ERROR'; payload: { name: string; error: string } }
  | { type: 'TOUCH_FIELD'; payload: { name: string } }
  | { type: 'BLUR_FIELD'; payload: { name: string } }
  | { type: 'RESET_FORM' }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'INCREMENT_SUBMIT_COUNT' }
  | { type: 'INITIALIZE_FIELD'; payload: { name: string; initialValue?: string; required?: boolean; validation?: (value: string) => string | undefined } };

// Context 타입 정의
export interface FormContextType {
  form: FormState;
  setFieldValue: (name: string, value: string) => void;
  setFieldError: (name: string, error: string) => void;
  touchField: (name: string) => void;
  blurField: (name: string) => void;
  resetForm: () => void;
  validateForm: () => boolean;
  handleSubmit: (onSubmit: (values: Record<string, string>) => void) => (e: React.FormEvent) => void;
  getFieldValue: (name: string) => string;
  getFieldError: (name: string) => string | undefined;
  getFieldTouched: (name: string) => boolean;
  initializeField: (name: string, options?: { initialValue?: string; required?: boolean; validation?: (value: string) => string | undefined }) => void;
}

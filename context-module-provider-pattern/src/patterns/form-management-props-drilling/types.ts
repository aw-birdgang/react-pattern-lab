// Props Drilling 방식의 폼 관리 타입 정의

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

// Props 타입들
export interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
  initialValue?: string;
  value: string;
  error?: string;
  touched: boolean;
  onChange: (name: string, value: string) => void;
  onFocus: (name: string) => void;
  onBlur: (name: string) => void;
}

export interface FormProps {
  form: FormState;
  onSubmit: (values: Record<string, string>) => void;
  onReset: () => void;
  onFieldChange: (name: string, value: string) => void;
  onFieldFocus: (name: string) => void;
  onFieldBlur: (name: string) => void;
  validateForm: () => boolean;
}

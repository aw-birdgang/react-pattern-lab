import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { FormState, FormAction, FormContextType, FormField } from './types';

// 초기 상태
const initialState: FormState = {
  fields: {},
  isValid: true,
  isDirty: false,
  isSubmitting: false,
  submitCount: 0,
};

// 리듀서 함수
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD_VALUE': {
      const { name, value } = action.payload;
      const field = state.fields[name];
      
      if (!field) return state;
      
      const updatedField: FormField = {
        ...field,
        value,
        error: field.validation ? field.validation(value) : undefined,
      };
      
      const updatedFields = {
        ...state.fields,
        [name]: updatedField,
      };
      
      // 전체 폼 유효성 검사
      const isValid = Object.values(updatedFields).every(field => !field.error);
      const isDirty = Object.values(updatedFields).some(field => field.value !== '');
      
      return {
        ...state,
        fields: updatedFields,
        isValid,
        isDirty,
      };
    }
    
    case 'SET_FIELD_ERROR': {
      const { name, error } = action.payload;
      const field = state.fields[name];
      
      if (!field) return state;
      
      const updatedField: FormField = {
        ...field,
        error,
      };
      
      const updatedFields = {
        ...state.fields,
        [name]: updatedField,
      };
      
      const isValid = Object.values(updatedFields).every(field => !field.error);
      
      return {
        ...state,
        fields: updatedFields,
        isValid,
      };
    }
    
    case 'TOUCH_FIELD': {
      const { name } = action.payload;
      const field = state.fields[name];
      
      if (!field) return state;
      
      const updatedField: FormField = {
        ...field,
        touched: true,
      };
      
      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: updatedField,
        },
      };
    }
    
    case 'BLUR_FIELD': {
      const { name } = action.payload;
      const field = state.fields[name];
      
      if (!field) return state;
      
      const updatedField: FormField = {
        ...field,
        touched: true,
        error: field.validation ? field.validation(field.value) : undefined,
      };
      
      const updatedFields = {
        ...state.fields,
        [name]: updatedField,
      };
      
      const isValid = Object.values(updatedFields).every(field => !field.error);
      
      return {
        ...state,
        fields: updatedFields,
        isValid,
      };
    }
    
    case 'RESET_FORM':
      return {
        ...state,
        fields: Object.keys(state.fields).reduce((acc, name) => {
          const field = state.fields[name];
          acc[name] = {
            ...field,
            value: '',
            error: undefined,
            touched: false,
          };
          return acc;
        }, {} as Record<string, FormField>),
        isValid: true,
        isDirty: false,
        isSubmitting: false,
      };
    
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    
    case 'INCREMENT_SUBMIT_COUNT':
      return {
        ...state,
        submitCount: state.submitCount + 1,
      };
    
    case 'INITIALIZE_FIELD': {
      const { name, initialValue = '', required = false, validation } = action.payload;
      
      const newField: FormField = {
        name,
        value: initialValue,
        touched: false,
        required,
        validation,
      };
      
      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: newField,
        },
      };
    }
    
    default:
      return state;
  }
}

// Context 생성
const FormContext = createContext<FormContextType | undefined>(undefined);

// Provider 컴포넌트
interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [form, dispatch] = useReducer(formReducer, initialState);

  const setFieldValue = useCallback((name: string, value: string) => {
    dispatch({ type: 'SET_FIELD_VALUE', payload: { name, value } });
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    dispatch({ type: 'SET_FIELD_ERROR', payload: { name, error } });
  }, []);

  const touchField = useCallback((name: string) => {
    dispatch({ type: 'TOUCH_FIELD', payload: { name } });
  }, []);

  const blurField = useCallback((name: string) => {
    dispatch({ type: 'BLUR_FIELD', payload: { name } });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors: string[] = [];
    
    Object.values(form.fields).forEach(field => {
      if (field.required && !field.value.trim()) {
        errors.push(`${field.name} is required`);
      } else if (field.validation) {
        const error = field.validation(field.value);
        if (error) {
          errors.push(error);
        }
      }
    });
    
    return errors.length === 0;
  }, [form.fields]);

  const handleSubmit = useCallback((onSubmit: (values: Record<string, string>) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      
      // 모든 필드를 touched로 설정
      Object.keys(form.fields).forEach(name => {
        touchField(name);
      });
      
      if (validateForm()) {
        dispatch({ type: 'SET_SUBMITTING', payload: true });
        dispatch({ type: 'INCREMENT_SUBMIT_COUNT' });
        
        const values = Object.keys(form.fields).reduce((acc, name) => {
          acc[name] = form.fields[name].value;
          return acc;
        }, {} as Record<string, string>);
        
        onSubmit(values);
        dispatch({ type: 'SET_SUBMITTING', payload: false });
      }
    };
  }, [form.fields, validateForm, touchField]);

  const getFieldValue = useCallback((name: string): string => {
    return form.fields[name]?.value || '';
  }, [form.fields]);

  const getFieldError = useCallback((name: string): string | undefined => {
    return form.fields[name]?.error;
  }, [form.fields]);

  const getFieldTouched = useCallback((name: string): boolean => {
    return form.fields[name]?.touched || false;
  }, [form.fields]);

  const initializeField = useCallback((
    name: string, 
    options?: { initialValue?: string; required?: boolean; validation?: (value: string) => string | undefined }
  ) => {
    dispatch({ 
      type: 'INITIALIZE_FIELD', 
      payload: { 
        name, 
        initialValue: options?.initialValue, 
        required: options?.required, 
        validation: options?.validation 
      } 
    });
  }, []);

  const value: FormContextType = {
    form,
    setFieldValue,
    setFieldError,
    touchField,
    blurField,
    resetForm,
    validateForm,
    handleSubmit,
    getFieldValue,
    getFieldError,
    getFieldTouched,
    initializeField,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

// Custom Hook
export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}

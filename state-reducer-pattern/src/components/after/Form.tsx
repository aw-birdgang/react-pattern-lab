import React, { useState, useCallback } from 'react';

interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

interface FormAction {
  type: 'SET_VALUE' | 'SET_ERROR' | 'SET_TOUCHED' | 'SET_SUBMITTING' | 'RESET' | 'SET_VALUES';
  field?: string;
  payload?: any;
}

interface FormValue {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  setValue: (field: string, value: any) => void;
  setError: (field: string, error: string) => void;
  setTouched: (field: string, touched: boolean) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

interface FormProps {
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void;
  onReset?: () => void;
  stateReducer?: (state: FormState, action: FormAction) => FormState;
  children?: ((value: FormValue) => React.ReactNode) | React.ReactNode;
}

const defaultFormReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field!]: action.payload,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field!]: action.payload,
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field!]: action.payload,
        },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'RESET':
      return {
        values: {},
        errors: {},
        touched: {},
        isSubmitting: false,
      };
    case 'SET_VALUES':
      return {
        ...state,
        values: action.payload,
      };
    default:
      return state;
  }
};

const Form: React.FC<FormProps> = ({ 
  initialValues = {}, 
  onSubmit, 
  onReset, 
  stateReducer = defaultFormReducer,
  children 
}) => {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const dispatch = useCallback((action: FormAction) => {
    setState(prevState => stateReducer(prevState, action));
  }, [stateReducer]);

  const setValue = useCallback((field: string, value: any) => {
    dispatch({ type: 'SET_VALUE', field, payload: value });
  }, [dispatch]);

  const setError = useCallback((field: string, error: string) => {
    dispatch({ type: 'SET_ERROR', field, payload: error });
  }, [dispatch]);

  const setTouched = useCallback((field: string, touched: boolean) => {
    dispatch({ type: 'SET_TOUCHED', field, payload: touched });
  }, [dispatch]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    dispatch({ type: 'SET_SUBMITTING', payload: true });
    
    try {
      await onSubmit?.(state.values);
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  }, [state.values, onSubmit, dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    onReset?.();
  }, [dispatch, onReset]);

  const value: FormValue = {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setValue,
    setError,
    setTouched,
    handleSubmit,
    reset,
  };

  return (
    <form onSubmit={handleSubmit}>
      {typeof children === 'function' ? children(value) : children}
    </form>
  );
};

export default Form;

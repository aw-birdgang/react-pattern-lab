import React from 'react';
import Form from '../../components/after/Form';

// Custom reducer that adds auto-capitalization for name field
const autoCapitalizeReducer = (state: any, action: any) => {
  if (action.type === 'SET_VALUE' && action.field === 'name') {
    return {
      ...state,
      values: {
        ...state.values,
        [action.field]: action.payload?.toUpperCase() || '',
      },
    };
  }
  
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.payload,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: action.payload,
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

// Custom reducer that adds validation and prevents submission with errors
const validationReducer = (state: any, action: any) => {
  if (action.type === 'SET_VALUE') {
    const newState = {
      ...state,
      values: {
        ...state.values,
        [action.field]: action.payload,
      },
    };
    
    // Add validation
    const errors = { ...newState.errors };
    if (action.field === 'email' && action.payload && !action.payload.includes('@')) {
      errors.email = 'Email must contain @';
    } else if (action.field === 'email') {
      delete errors.email;
    }
    
    if (action.field === 'name' && action.payload && action.payload.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (action.field === 'name') {
      delete errors.name;
    }
    
    return {
      ...newState,
      errors,
    };
  }
  
  if (action.type === 'SET_SUBMITTING' && action.payload === true) {
    // Prevent submission if there are errors
    if (Object.keys(state.errors).length > 0) {
      return state; // Don't allow submission
    }
  }
  
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: action.payload,
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

// Custom reducer that adds character counting and limits
const characterLimitReducer = (state: any, action: any) => {
  if (action.type === 'SET_VALUE') {
    const field = action.field;
    const value = action.payload;
    
    // Add character limits
    if (field === 'name' && value && value.length > 20) {
      return state; // Don't update if over limit
    }
    if (field === 'email' && value && value.length > 50) {
      return state; // Don't update if over limit
    }
    
    return {
      ...state,
      values: {
        ...state.values,
        [field]: value,
      },
    };
  }
  
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.payload,
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: action.payload,
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

const FormExample: React.FC = () => {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form submitted:', values);
    alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
  };

  const handleReset = () => {
    console.log('Form reset');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Form Examples (With State Reducer Pattern)</h2>
      
      {/* Auto Capitalize Form */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Auto Capitalize Form</h3>
        <p>This form automatically capitalizes the name field.</p>
        
        <Form 
          initialValues={{ name: '', email: '' }}
          onSubmit={handleSubmit}
          onReset={handleReset}
          stateReducer={autoCapitalizeReducer}
        >
          {({ values, errors, touched, isSubmitting, setValue, setTouched, handleSubmit, reset }) => (
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label>
                  Name (Auto-capitalized):
                  <input
                    type="text"
                    value={values.name || ''}
                    onChange={(e) => setValue('name', e.target.value)}
                    onBlur={() => setTouched('name', true)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
                {touched.name && errors.name && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label>
                  Email:
                  <input
                    type="email"
                    value={values.email || ''}
                    onChange={(e) => setValue('email', e.target.value)}
                    onBlur={() => setTouched('email', true)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
                {touched.email && errors.email && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
                )}
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ marginRight: '10px' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={reset}>
                  Reset
                </button>
              </div>

              <div style={{ marginTop: '15px' }}>
                <h4>Current Values:</h4>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
            </div>
          )}
        </Form>
      </div>

      {/* Validation Form */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Validation Form</h3>
        <p>This form has real-time validation and prevents submission with errors.</p>
        
        <Form 
          initialValues={{ name: '', email: '' }}
          onSubmit={handleSubmit}
          onReset={handleReset}
          stateReducer={validationReducer}
        >
          {({ values, errors, touched, isSubmitting, setValue, setTouched, handleSubmit, reset }) => (
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label>
                  Name (min 2 chars):
                  <input
                    type="text"
                    value={values.name || ''}
                    onChange={(e) => setValue('name', e.target.value)}
                    onBlur={() => setTouched('name', true)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
                {touched.name && errors.name && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label>
                  Email (must contain @):
                  <input
                    type="email"
                    value={values.email || ''}
                    onChange={(e) => setValue('email', e.target.value)}
                    onBlur={() => setTouched('email', true)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
                {touched.email && errors.email && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
                )}
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  style={{ marginRight: '10px' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={reset}>
                  Reset
                </button>
              </div>

              <div style={{ marginTop: '15px' }}>
                <h4>Current Values:</h4>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <h4>Errors:</h4>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </div>
            </div>
          )}
        </Form>
      </div>

      {/* Character Limit Form */}
      <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
        <h3>Character Limit Form</h3>
        <p>This form has character limits (Name: 20 chars, Email: 50 chars).</p>
        
        <Form 
          initialValues={{ name: '', email: '' }}
          onSubmit={handleSubmit}
          onReset={handleReset}
          stateReducer={characterLimitReducer}
        >
          {({ values, errors, touched, isSubmitting, setValue, setTouched, handleSubmit, reset }) => (
            <div>
              <div style={{ marginBottom: '15px' }}>
                <label>
                  Name (max 20 chars):
                  <input
                    type="text"
                    value={values.name || ''}
                    onChange={(e) => setValue('name', e.target.value)}
                    onBlur={() => setTouched('name', true)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
                <div style={{ fontSize: '12px', color: 'gray' }}>
                  {values.name?.length || 0}/20 characters
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label>
                  Email (max 50 chars):
                  <input
                    type="email"
                    value={values.email || ''}
                    onChange={(e) => setValue('email', e.target.value)}
                    onBlur={() => setTouched('email', true)}
                    style={{ marginLeft: '10px', padding: '5px' }}
                  />
                </label>
                <div style={{ fontSize: '12px', color: 'gray' }}>
                  {values.email?.length || 0}/50 characters
                </div>
              </div>

              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ marginRight: '10px' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button type="button" onClick={reset}>
                  Reset
                </button>
              </div>

              <div style={{ marginTop: '15px' }}>
                <h4>Current Values:</h4>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default FormExample;

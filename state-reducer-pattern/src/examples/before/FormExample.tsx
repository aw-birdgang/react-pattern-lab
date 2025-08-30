import React from 'react';
import Form from '../../components/before/Form';

const FormExample: React.FC = () => {
  const handleSubmit = (values: Record<string, any>) => {
    console.log('Form submitted:', values);
    alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
  };

  const handleReset = () => {
    console.log('Form reset');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Form Example (Before State Reducer Pattern)</h3>
      <p>This form has hardcoded behavior - standard form validation and submission.</p>
      
      <Form 
        initialValues={{ name: '', email: '' }}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {({ values, errors, touched, isSubmitting, setValue, setTouched, handleSubmit, reset }) => (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label>
                Name:
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
  );
};

export default FormExample;

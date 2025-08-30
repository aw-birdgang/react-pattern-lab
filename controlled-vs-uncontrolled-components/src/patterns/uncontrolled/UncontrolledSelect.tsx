import React, { useRef } from 'react';

interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  onSelectionChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  onSelectionChange 
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleChange = () => {
    if (onSelectionChange && selectRef.current) {
      onSelectionChange(selectRef.current.value);
    }
  };

  return (
    <div className="select-container">
      <label>{label}:</label>
      <select ref={selectRef} onChange={handleChange} defaultValue="">
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <small>Selection is managed internally</small>
    </div>
  );
};

export default Select;

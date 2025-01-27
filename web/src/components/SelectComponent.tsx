"use client";

import React, { useState } from 'react';
import Select from 'react-select';

interface SelectComponentProps {
  label: string;
  options: { value: string | number; label: string }[];
  placeholder: string;
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  multiple?: boolean;
  limit?: number;
}

const SelectComponent = ({ label, options = [], placeholder, value, onChange, multiple = false, limit = 4 }: SelectComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (selectedOptions: any) => {
    if (multiple) {
      const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
      if (selectedValues.length <= limit) {
        onChange(selectedValues);
      }
    } else {
      onChange(selectedOptions ? selectedOptions.value : '');
    }
  };

  const selectedOptions = options.filter(option => value.includes(option.value));

  return (
    <div>
      <label>{label}</label>
      <Select
        isMulti={multiple}
        options={filteredOptions}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={placeholder}
        noOptionsMessage={() => "Nenhuma opção encontrada"}
        styles={{
          control: (provided) => ({ ...provided, marginBottom: '8px' }),
          multiValue: (provided) => ({ ...provided, backgroundColor: '#e0e0e0' }),
          multiValueLabel: (provided) => ({ ...provided, color: '#333' }),
          multiValueRemove: (provided) => ({ ...provided, color: '#333', cursor: 'pointer' }),
        }}
      />
    </div>
  );
};

export default SelectComponent;

"use client";

import { SelectRoot, SelectLabel, SelectTrigger, SelectValueText, SelectContent, SelectItem } from "@/components/ui/select";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectComponentProps {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  multiple?: boolean;
}

const SelectComponent = ({ label, options, placeholder, value, onChange, multiple = false }: SelectComponentProps) => {
  return (
    <div>
      <SelectRoot multiple={multiple} value={value} onValueChange={onChange}>
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              item={{ value: option.value, label: option.label }}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
};

export default SelectComponent;

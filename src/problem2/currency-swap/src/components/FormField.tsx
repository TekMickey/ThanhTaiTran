import React, { useState } from "react";
import Select from "react-select";

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  options?: { [key: string]: number };
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  options,
  type = "text",
}) => {
  const [inputValue, setInputValue] = useState<string | number>(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Remove leading zeros
    const formattedValue = val.replace(/^0+(?!$)/, "");
    setInputValue(formattedValue);
    onChange(formattedValue);
  };

  const selectOptions =
    options &&
    Object.keys(options).map((option) => ({
      value: option,
      label: (
        <div className="flex items-center">
          <img
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${option}.svg`}
            alt={option}
            className="w-6 h-6 mr-2"
          />
          {option}
        </div>
      ),
    }));

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {options ? (
        <Select
          value={selectOptions?.find((opt) => opt.value === value)}
          onChange={(selectedOption) => onChange((selectedOption as any).value)}
          options={selectOptions}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      ) : (
        <input
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      )}
    </div>
  );
};

export default FormField;

import Select from "react-select";
import type { ComponentProps } from "react";

export type DropdownOption = { value: string; label: string };

interface IProps extends ComponentProps<Select> {
  options: DropdownOption[];
  placeholder?: string;
  id?: string;
  selected?: DropdownOption;
  onSelect: (selection?: DropdownOption) => void;
}

export function Dropdown({
  options,
  id,
  placeholder,
  selected,
  onSelect,
  ...props
}: IProps) {
  const handleChange = (newValue: DropdownOption) => {
    onSelect(newValue || undefined);
  };
  return (
    <Select
      {...props}
      id={id}
      className={`dropdown ${props.className}`}
      options={options}
      value={selected || null}
      placeholder={placeholder}
      onChange={(option) => handleChange(option as DropdownOption)}
    />
  );
}

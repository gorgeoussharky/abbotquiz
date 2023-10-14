import { useId } from 'react';

import './RadioLabel.scss'

interface Props {
  name: string;
  label: string | number;
  value: string | number;
  checked: boolean;
  onChange?: (val: string | number) => void;
}

const RadioLabel = ({ name, value, label, checked, onChange }: Props) => {

  const id = useId();

  return (
    <div className="radio-label">
      <div className="radio-label__wrap">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          className="radio-label__control"
          onChange={() => onChange && onChange(value)}
          checked={checked}
        />
        <label htmlFor={id} className="radio-label__label">
          {label}
        </label>
      </div>
    </div>
  );
};

export { RadioLabel }
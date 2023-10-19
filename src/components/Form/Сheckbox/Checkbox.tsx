import { useId } from 'react';

import './Checkbox.scss';

interface Props {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ label, value, checked, onChange }: Props) => {
  const id = useId();
  return (
    <div className="checkbox">
      <div className="checkbox__wrap">
        <input
          type="checkbox"
          className="checkbox__control"
          name={label}
          checked={checked}
          value={value}
          id={id}
          onChange={(e) => onChange && onChange(!checked || e.target.checked)}
        />
        <label htmlFor={id} className="checkbox__label">
          {label}
        </label>
      </div>
    </div>
  );
};

export { Checkbox };

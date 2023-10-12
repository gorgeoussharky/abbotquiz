import { useId } from 'react';

import './Input.scss'

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  className?: string;
  onInput?: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = ({ label, value, placeholder, type, className, onInput, onFocus, onBlur }: Props) => {
  const id = useId();

  return (
    <div className={`input ${className || ''}`}>
      <div  className={`input__group ${type === 'search' && 'input__group--search' }`}>
          <label htmlFor={id} className="input__label">{label}</label>
          <input
            id={id}
            className='input__control'
            type={type && type !== 'search' ? type : 'text'}
            value={value}
            placeholder={placeholder || label}
            onFocus={() => onFocus && onFocus()}
            onBlur={() => onBlur && onBlur()}
            onInput={(e) =>
              onInput && onInput((e.target as HTMLInputElement).value)
            }
          />
      </div>
    </div>
  );
};

export { Input }
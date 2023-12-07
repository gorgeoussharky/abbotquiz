import { useId } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  value: string;
  checked?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const Control = styled.input`
   position: absolute;
    opacity: 0;
    z-index: -1;

    &:checked {
      ~ label {
        color: var(--dark);
        &::before {
          border-color: var(--primary-main);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cg clip-path='url(%23clip0_1015_24844)'%3E%3Cpath d='M2.5 6L5 8.5L10 3.5' stroke='%23009CDE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1015_24844'%3E%3Crect width='12' height='12' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
        }
      }
    }
`

const Label = styled.label`
    position: relative;
    user-select: none;
    font-size: 20px;
    font-style: normal;
    line-height: 1.1;
    cursor: pointer;
    padding-left: 32px;
    color: #8C8C8C;
    transition: 500ms;
    display: flex;

    &:hover {
      color: var(--dark);
      transition: 500ms;

      &::before {
        border-color: var(--dark);
        transition: 500ms;
      }
    }

    @media (max-width: 991px) {
      font-size: 16px;
      display: flex;
      padding-left: 32px;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid var(--checkbox-color);
      border-radius: 4px;
      background-color: var(--background-white);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 15px 15px;
      cursor: pointer;
      transition: 500ms;
    }
`

const Checkbox = ({ label, value, checked, className, onChange }: Props) => {
  const id = useId();
  return (
    <div className={className}>
        <Control
          type="checkbox"
          name={label}
          checked={checked}
          value={value}
          id={id}
          onChange={(e) => onChange && onChange(!checked || e.target.checked)}
        />
        <Label htmlFor={id}>
          {label}
        </Label>
    </div>
  );
};

export { Checkbox };

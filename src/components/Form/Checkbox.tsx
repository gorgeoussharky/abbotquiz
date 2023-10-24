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
        &::before {
          border-color: var(--primary-main);
          background-image: url("data:image/svg+xml,%0A%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_13230_25493)'%3E%3Cpath d='M3.21875 6.68668L5.92105 9.38898L11.3257 3.98438' stroke='%23009CDE' strokeWidth='2.16184' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_13230_25493'%3E%3Crect width='12.971' height='12.971' fill='white' transform='translate(0.515625 0.203125)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
        }
      }
    }
`

const Label = styled.label`
    position: relative;
    user-select: none;
    font-size: 20px;
    font-style: normal;
    line-height: 25px;
    cursor: pointer;
    padding-left: 36px;

    @media (max-width: 991px) {
      font-size: 16px;
      display: flex;
      padding-left: 32px;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 3px;
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

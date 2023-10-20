import { useId } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  value: string | number;
  placeholder?: string;
  type?: string;
  className?: string;
  showLabel?: boolean;
  onInput?: (val: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Wrap = styled.div<{ $search?: boolean }>`
  position: relative;

  ${(props) =>
    props.$search &&
    `
      &::before {
                content: "";
                position: absolute;
                width: 16px;
                height: 16px;
                right: 12px;
                top: 50%;
                -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
                background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(%23clip0_12711_130)"><path d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z" stroke="%23009CDE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 14L10 10" stroke="%23009CDE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_12711_130"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>');
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
                z-index: 1;
              }
  `}
`;

const Label = styled.label<{ $hidden: boolean }>`
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.176px;
  display: block;
  margin-bottom: 12px;

  ${(props) =>
    props.$hidden &&
    `
       position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
   `}
`;

const Control = styled.input`
  position: relative;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 12px 30px;
  overflow: hidden;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  outline: none;
`;

const Input = ({
  label,
  value,
  placeholder,
  type,
  className,
  showLabel,
  onInput,
  onFocus,
  onBlur,
}: Props) => {
  const id = useId();

  const isLabelHidden = () => {
    if (showLabel) return false

    return true
  }

  return (
    <Wrap className={className} $search={type === 'search'}>
      <Label $hidden={isLabelHidden()} htmlFor={id}>
        {label}
      </Label>
      <Control
        id={id}
        type={type && type !== 'search' ? type : 'text'}
        min={0}
        value={value}
        placeholder={placeholder || label}
        onFocus={() => onFocus && onFocus()}
        onBlur={() => onBlur && onBlur()}
        onInput={(e) =>
          onInput && onInput((e.target as HTMLInputElement).value)
        }
      />
    </Wrap>
  );
};

export { Input };

import { useId } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  label: string | number;
  value: string | number | boolean;
  checked: boolean;
  className?: string;
  onChange?: (val: string | number | boolean) => void;
}

const Control = styled.input`
  position: absolute;
  opacity: 0;
  z-index: -999;

  &:checked {
    ~ label {
      border: 1px solid #009cde;
      background: #009cde;
      color: #fff;
    }
  }
`;

const Label = styled.label<{ $longText: boolean }>`
  border-radius: 40px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 14px 30px;
  display: block;
  cursor: pointer;
  font-size: 16px;
  transition: 500ms;
  height: 100%;

  @media (max-width: 991px) {
    text-align: center;
  }

  ${(props) =>
    props.$longText &&
    `
      @media (max-width: 991px) {
        text-align: left;
        
        br {
          display: none;
        }
  }
  
  `}

  &:hover {
    border: 1px solid #009cde;
    background: #e6f7ff;
    transition: 500ms;
  }
`;

const RadioLabel = ({
  name,
  value,
  label,
  checked,
  className,
  onChange,
}: Props) => {
  const id = useId();

  return (
    <div className={className}>
      <Control
        id={id}
        type="radio"
        name={name}
        value={value.toString()}
        onChange={() => onChange && onChange(value)}
        checked={checked}
      />
      <Label
        htmlFor={id}
        dangerouslySetInnerHTML={{ __html: label.toString() }}
        $longText={label.toString().length > 20}
      ></Label>
    </div>
  );
};

export { RadioLabel };

import { useId } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  label: string;
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

      span {
        &::before {
          background-color: #fff;
        }
      }
    }
  }
`;

const Label = styled.label<{ $cols: number }>`
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 20px 40px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr'};
  gap: 0 12px;
  cursor: pointer;
  font-size: 16px;
  transition: 500ms;

  @media (max-width: 768px) {
    padding: 16px;
    grid-template-columns: 1fr;
  }

  &:hover {
    border: 1px solid #009cde;
    background: #e6f7ff;
    transition: 500ms;
  }
`;

const LabelListItem = styled.span`
  font-size: 20px;
  padding-left: 20px;
  position: relative;
  display: block;
  line-height: 120%;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    left: 0;
    top: 10px;
    border-radius: 50%;
    background-color: #343a40;
  }
`;

const RadioList = ({
  name,
  value,
  label,
  checked,
  className,
  onChange,
}: Props) => {
  const id = useId();

  const labelList = () => {
    return label.split('|');
  };

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
      <Label htmlFor={id} $cols={labelList().length > 4 ? 2 : 1}>
        <span>
          {labelList()
            .slice(0, labelList().length / 2)
            .map((item) => (
              <LabelListItem>{item}</LabelListItem>
            ))}
        </span>
        <span>
          {labelList()
            .slice(labelList().length / 2)
            .map((item) => (
              <LabelListItem>{item}</LabelListItem>
            ))}
        </span>
      </Label>
    </div>
  );
};

export { RadioList };

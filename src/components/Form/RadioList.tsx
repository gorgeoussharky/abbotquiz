import { useId } from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  label: string;
  value: string | number | boolean;
  checked: boolean;
  className?: string;
  title?: string;
  cols?: number;
  pill?: boolean;
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

const Label = styled.label<{$pill?: boolean}>`
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  cursor: pointer;
  font-size: 16px;
  transition: 500ms;

  ${props => props.$pill && `
      border-radius: 40px;
      border: 1px solid #d9d9d9;
      background: #fff;
      padding: 14px 30px;
  `}

  @media (max-width: 991px) {
    padding: 16px;
  }

  &:hover {
    border: 1px solid #009cde;
    background: #e6f7ff;
    transition: 500ms;
  }
`;

const Row = styled.span<{ $cols: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr'};
  gap: 0 12px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const LabelListItem = styled.span<{$small?: boolean}>`
  font-size: 20px;
  padding-left: 20px;
  position: relative;
  display: block;
  line-height: 120%;
  margin-bottom: 4px;

  ${props => props.$small && `
    font-size: 14px;
    padding-left: 16px;
  `}

  @media (max-width: 991px) {
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

    ${props => props.$small && `
       width: 4px;
      height: 4px;
      top: 6px;
  `}
  }
`;

const RadioList = ({
  name,
  value,
  label,
  checked,
  className,
  title,
  cols,
  pill,
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
      <Label  $pill={pill} htmlFor={id}>
        {Boolean(title) && <b style={{marginBottom: 8, display: 'block'}}>{title}</b>}
        <Row $cols={cols || (labelList().length > 4 ? 2 : 1)}>
          <span>
            {labelList()
              .slice(0, labelList().length / 2)
              .map((item) => (
                <LabelListItem $small={pill}>{item}</LabelListItem>
              ))}
          </span>
          <span>
            {labelList()
              .slice(labelList().length / 2)
              .map((item) => (
                <LabelListItem $small={pill}>{item}</LabelListItem>
              ))}
          </span>
        </Row>
      </Label>
    </div>
  );
};

export { RadioList };

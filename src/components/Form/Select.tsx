import { useState } from 'react';

import { Option } from '../../types/interfaces';
import { Dropdown } from '../Dropdown';

import styled from 'styled-components';
import { Checkbox } from './Checkbox';

interface Props {
  label: string;
  value: string | string[];
  options: Option[];
  className?: string;
  hasPrefix?: boolean;
  isMulti?: boolean;
  onSelect?: (value: Option) => void;
}

const Wrap = styled.div`
  position: relative;
  min-width: 1px;
`;

const List = styled.ul`
  width: 100%;
  max-height: 250px;
  border-radius: 0px 0px 20px 20px;
  border: 1px solid #009cde;
  border-top: none;
  background: #fff;
  padding: 8px 4px;
  overflow-y: auto;
  z-index: 15;
  margin: 0;
  position: relative;
  padding-left: 20px;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent !important;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    background: rgba(0, 156, 222, 0.2) !important;
    border-radius: 8px;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
  }
`;

const Item = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  padding: 6px 12px;
  overflow: hidden;
  color: #8c8c8c;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: 128%;
  text-align: left;
`;

const Control = styled.button<{ $active: boolean; $hasPrefix: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  background: #fff;
  padding: 12px;
  overflow: hidden;
  color: #000;
  padding-right: 42px;
  display: block;
  text-align: left;
  text-overflow: ellipsis;
  align-items: center;
  justify-content: flex-start;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M13.7708 4.88936C14.0764 5.18977 14.0764 5.67681 13.7708 5.97722L8.55337 11.1054C8.40661 11.2497 8.20755 11.3307 7.99998 11.3307C7.79243 11.3307 7.59337 11.2497 7.44659 11.1054L2.22917 5.97722C1.92361 5.67681 1.92361 5.18977 2.22917 4.88936C2.53491 4.58896 3.03039 4.58896 3.33596 4.88936L7.99998 9.47365L12.664 4.88936C12.9696 4.58897 13.4651 4.58897 13.7708 4.88936Z' fill='%238C8C8C'/%3E%3C/svg%3E");
  background-position: calc(100% - 16px);
  background-repeat: no-repeat;
  white-space: nowrap;
  font-size: 16px;

  ${(props) =>
    props.$active &&
    `
      border-radius: 20px 20px 0px 0px;
      border: 1px solid #009cde;
  `}

  ${(props) =>
    props.$hasPrefix &&
    `
        gap: 4px;

        span {
          color: var(--accent);
        }
    `}
`;

const SelectCheckbox = styled(Checkbox)`
  margin: 8px 0;
  input:not(:checked) ~ label {
    color: #8C8C8C;
  }
`

const Select = ({
  label,
  value,
  options,
  className,
  hasPrefix,
  isMulti,
  onSelect,
}: Props) => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option: Option) => {
    !isMulti && setShowDropdown(false);


    onSelect && onSelect(option);
  };

  return (
    <Wrap ref={setAnchor} className={className}>
      <Control
        $hasPrefix={Boolean(hasPrefix)}
        $active={showDropdown}
        onClick={() => setShowDropdown(true)}
      >
        {hasPrefix && label} {' '}
        {!isMulti && <span>{value || (hasPrefix ? '' : label)}</span>}
        {isMulti && <span>{(value as string[]).join(', ') || (hasPrefix ? '' : label)}</span>}
      </Control>

      {anchor && showDropdown && (
        <Dropdown
          offsets={[0, 0]}
          anchor={anchor}
          onClose={() => setShowDropdown(false)}
        >
          <List>
            {options.map((el) =>
              !isMulti ? (
                <Item key={el.label}>
                  <button onClick={() => handleSelect(el)}>{el.label}</button>
                </Item>
              ) : (
                <SelectCheckbox
                  checked={(value as string[]).includes(el.value as string)}
                  key={el.label}
                  value={el.value as string}
                  label={el.label}
                  onChange={() => handleSelect(el)}
                />
              )
            )}
          </List>
        </Dropdown>
      )}
    </Wrap>
  );
};

export { Select };

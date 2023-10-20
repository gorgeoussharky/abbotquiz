import { useState } from 'react';
import { Input } from './Input';

import { Dropdown } from '../Dropdown';
import { Option } from '../../types/interfaces';
import styled from 'styled-components';

interface Props {
    list: Option[]
    onSelect?: (item: Option) => void
}

const Wrap = styled.div`
   position: relative;
`

const ComboboxInput = styled(Input)<{$active: boolean}>`
  ${props => props.$active && `
    input {
      border-radius: 20px 20px 0px 0px;
      border: 1px solid #009cde;
    }
  `}
`

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
`

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
    font-style: normal;
    font-weight: 400;
    line-height: 128%;
    text-align: left;
`

const ItemBtn = styled.button`
  
`

const Combobox = ({list, onSelect}: Props) => {
  const [query, setQuery] = useState('');

  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = () => {
    if (!query.length) return []

    return list.filter((el) => el.label.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <Wrap className="combobox" ref={setAnchor}>
      <ComboboxInput
        type="search"
        label="Поиск симптомов"
        value={query}
        $active={showDropdown}
        onInput={(val) => setQuery(val as string)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(true)}
      />

      {anchor && showDropdown && (
        <Dropdown offsets={[0,0]} anchor={anchor} onClose={() => setShowDropdown(false)}>
          <List>
            {Boolean(!query.length) && (
              <Item>Начните вводить...</Item>
            )}
            {Boolean(!suggestions().length && query.length) && (
              <Item>
                К сожалению, такого симптома нет в нашей базе
              </Item>
            )}
            {suggestions().map((el) => (
              <Item key={el.label}>
                <ItemBtn onClick={() => onSelect && onSelect(el)}>{el.label}</ItemBtn>
              </Item>
            ))}
          </List>
        </Dropdown>
      )}
    </Wrap>
  );
};

export { Combobox };

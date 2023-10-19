import { useState } from 'react';
import { Input } from '../Input/Input';

import './Combobox.scss';
import { Dropdown } from '../../Dropdown/Dropdown';
import { Option } from '../../../types/interfaces';

interface Props {
    list: Option[]
    onSelect?: (item: Option) => void
}

const Combobox = ({list, onSelect}: Props) => {
  const [query, setQuery] = useState('');

  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = () => {
    if (!query.length) return []

    return list.filter((el) => el.label.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div className="combobox" ref={setAnchor}>
      <Input
        className={`combobox__input ${showDropdown ? 'combobox__input--active' : ''}`}
        type="search"
        label="Поиск симптомов"
        value={query}
        onInput={(val) => setQuery(val as string)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setShowDropdown(true)}
      />

      {anchor && showDropdown && (
        <Dropdown offsets={[0,0]} anchor={anchor} onClose={() => setShowDropdown(false)}>
          <ul className="combobox__list">
            {Boolean(!query.length) && (
              <li className="combobox__item">Начните вводить...</li>
            )}
            {Boolean(!suggestions().length && query.length) && (
              <li className="combobox__item">
                К сожалению, такого симптома нет в нашей базе
              </li>
            )}
            {suggestions().map((el) => (
              <li key={el.label} className="combobox__item">
                <button className="combobox__item-btn" onClick={() => onSelect && onSelect(el)}>{el.label}</button>
              </li>
            ))}
          </ul>
        </Dropdown>
      )}
    </div>
  );
};

export { Combobox };

import { useState } from 'react';

import { Option } from '../../../types/interfaces';
import { Dropdown } from '../../Dropdown/Dropdown';

import './Select.scss';

interface Props {
  label: string;
  value: string;
  options: Option[];
  className?: string;
  onSelect?: (value: Option) => void;
}

const Select = ({
  label,
  value,
  options,
  className,
  onSelect,
}: Props) => {
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option: Option) => {
    setShowDropdown(false)
    onSelect && onSelect(option)
  }

  return (
    <div ref={setAnchor} className={`select ${className || ''}`}>
      <div className="select__group">
        <div onClick={() => setShowDropdown(true)} className={`select__control ${showDropdown ? 'select__control--active' : ''}`}>{value || label}</div>

        {anchor && showDropdown && (
          <Dropdown
            offsets={[0, 0]}
            anchor={anchor}
            onClose={() => setShowDropdown(false)}
          >
            <ul className="select__list">
              {options.map((el) => (
                <li key={el.label} className="select__item">
                  <button
                    className="select__item-btn"
                    onClick={() => handleSelect(el)}
                  >
                    {el.label}
                  </button>
                </li>
              ))}
            </ul>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export { Select };

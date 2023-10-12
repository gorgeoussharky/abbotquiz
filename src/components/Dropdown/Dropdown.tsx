import { useFloating, offset, flip, shift } from '@floating-ui/react';
import { useEffect } from 'react';

import './Dropdown.scss';

interface Props {
    children: JSX.Element | JSX.Element[]
    onClose: () => void
    offsets?: number[]
    anchor?: HTMLDivElement
}

const Dropdown = ({children, anchor, offsets, onClose}: Props) => {

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom-start',
        middleware: [
          offset({
            mainAxis: offsets ? offsets[0] : 10,
            crossAxis: offsets ? offsets[1] : 0,
          }),
          flip(),
          shift(),
        ],
        elements: {
          reference: anchor,
        },
      });

      const handleDocumentClick = (e: Event) => {    
        if (anchor?.contains(e.target as HTMLElement)) return;
    
        onClose && onClose();
      };

      useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);
      }, []);


    return (
        <div className="dropdown">
            <div ref={refs.setFloating} style={floatingStyles} className="dropdown__wrap">
                {children}
            </div>
        </div>
    )
}

export { Dropdown }
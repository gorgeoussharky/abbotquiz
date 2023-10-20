import { useFloating, offset, shift } from '@floating-ui/react';
import { useEffect } from 'react';

import styled from 'styled-components';

interface Props {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  offsets?: number[];
  className?: string;
  anchor?: HTMLDivElement;
}

const Wrap = styled.div`
  width: 100%;
  z-index: 200;
`;

const Dropdown = ({ children, anchor, offsets, className, onClose }: Props) => {
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    middleware: [
      offset({
        mainAxis: offsets ? offsets[0] : 10,
        crossAxis: offsets ? offsets[1] : 0,
      }),
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
    <div className={className}>
      <Wrap
        ref={refs.setFloating}
        style={floatingStyles}
        className="dropdown__wrap"
      >
        {children}
      </Wrap>
    </div>
  );
};

export { Dropdown };

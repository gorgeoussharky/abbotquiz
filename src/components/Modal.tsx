import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  children: JSX.Element;
  show?: boolean;
  onClose: () => void;
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background-color: rgba(0,0,0, 0.3);
`;

const Body = styled.div`
  border-radius: 4px;
  background: #fff;
  padding: 32px;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
  position: relative;
  max-width: 800px;
  width: 90%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Title = styled.div`
  color: var(--accent);
  font-size: 30px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  
  @media (max-width: 768px) {
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Modal = ({ title, children, show, onClose }: Props) => {

  const wrap = useRef<HTMLDivElement>(null)

  const handleDocumentClick = (e: Event) => {
    if (wrap.current?.contains(e.target as HTMLElement)) return

    onClose()
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  useEffect(() => {
    if (show) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'auto'
    }
  }, [show])

  if (!show) {
    return <></>
  }

  return (
    <Wrap ref={wrap}>
      <Body>
        <CloseBtn onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M3.37612 3.75775C3.61701 3.51671 3.9437 3.38131 4.28433 3.38131C4.62496 3.38131 4.95165 3.51671 5.19255 3.75775L11.992 10.563L18.7914 3.75775C18.9099 3.63495 19.0516 3.537 19.2084 3.46962C19.3651 3.40223 19.5337 3.36677 19.7042 3.36528C19.8748 3.3638 20.044 3.39633 20.2018 3.46098C20.3597 3.52562 20.5031 3.62109 20.6237 3.74181C20.7444 3.86253 20.8397 4.00608 20.9043 4.16409C20.9689 4.3221 21.0014 4.4914 21 4.66212C20.9985 4.83284 20.963 5.00155 20.8957 5.15841C20.8284 5.31527 20.7305 5.45714 20.6078 5.57575L13.8084 12.381L20.6078 19.1863C20.8418 19.4288 20.9713 19.7536 20.9684 20.0907C20.9655 20.4278 20.8304 20.7503 20.5922 20.9887C20.354 21.227 20.0318 21.3623 19.695 21.3652C19.3582 21.3681 19.0337 21.2385 18.7914 21.0043L11.992 14.199L5.19255 21.0043C4.95027 21.2385 4.62577 21.3681 4.28895 21.3652C3.95214 21.3623 3.62994 21.227 3.39176 20.9887C3.15359 20.7503 3.01849 20.4278 3.01556 20.0907C3.01263 19.7536 3.14211 19.4288 3.37612 19.1863L10.1755 12.381L3.37612 5.57575C3.13529 5.33464 3 5.00767 3 4.66675C3 4.32582 3.13529 3.99885 3.37612 3.75775Z"
              fill="#8C8C8C"
            />
          </svg>
        </CloseBtn>

        <Title>{title}</Title>

        <div>{children}</div>
      </Body>
    </Wrap>
  );
};

export { Modal }
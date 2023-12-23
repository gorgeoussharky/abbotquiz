import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const QuizWrap = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ColumnsWrap = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr 1fr'};
  margin: 0 -40px;
  height: 100%;
  flex-grow: 1;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    margin: 0;
  }
`;

export const Head = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 991px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 24px;
  }

  div {
    margin-bottom: 0;
  }
`;

export const Column = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 991px) {
    margin-bottom: 20px;
    padding: 0;
  }

  &:nth-of-type(even) {
    border-left: 1px solid #d9d9d9;

    @media (max-width: 991px) {
      border: none;
    }
  }
`;

export const Foot = styled.div<{ $align?: 'center' | 'flex-end' }>`
  margin-top: auto;
  display: flex;
  justify-content: ${(props) => props.$align || 'flex-start'};

  @media (max-width: 991px) {
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #d9d9d9;
  }
`;

export const Heading = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 32px;

  @media (max-width: 991px) {
    margin-bottom: 12px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
`;

export const MarkedList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
  counter-reset: counter;
  display: grid;
  gap: 10px;
`;

export const Item = styled.li<{$unlist?: boolean}>`
  font-size: 20px;
  padding-left: 20px;
  position: relative;

  @media (max-width: 991px) {
    font-size: 16px;
  }

  span {
    font-weight: 700;
    color: var(--accent);
  }

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    left: 0;
    top: 14px;
    border-radius: 50%;
    background-color: #343a40;

    @media (max-width: 991px) {
      top: 10px;
    }
  }

  ${props => props.$unlist && `
    padding: 0;
    
    &::before {
      content: none;
    }
  `}
`;

export const MarkedItem = styled.li`
  font-size: 20px;
  padding-left: 20px;
  position: relative;
  counter-increment: counter;

  @media (max-width: 991px) {
    font-size: 16px;
  }

  span {
    font-weight: 700;
    color: var(--accent);
  }

  &::before {
    content: counter(counter) ".";
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
  }
`;

export const Text = styled.p`
  margin-bottom: 12px;
  font-size: 20px;
  margin-top: 0;

  @media (max-width: 991px) {
    font-size: 16px;
    margin-bottom: 24px;
  }

  span, a {
    text-decoration: none;
    font-weight: 700;
    color: var(--accent);
  }
`;

export const Notice = styled.small`
font-size: 16px;

a {
  color: var(--accent);
  display: block;
  margin-top: 12px;;
}
`

export const Button = styled.button<{ $type?: 'light', $large?: boolean }>`
  position: relative;
  line-height: 1;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  background: var(--accent);
  border: 1px solid var(--accent);
  height: 40px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  width: 100%;
  gap: 16px;
  text-decoration: none;

  @media (max-width: 991px) {
    max-width: 100%;
  }

  ${(props) =>
    props.$large &&
    `
        max-width: 100%;
        text-transform: uppercase;
        font-weight: 700;

        @media (max-width: 991px) {
          padding: 4px 16px;
        }
      
    `}

  ${(props) =>
    props.$type === 'light' &&
    `
        background: transparent;
        color: var(--accent)
    `}
`;

export const ButtonLink = styled(Link)<{ $type?: 'light'; $large?: boolean }>`
  position: relative;
  line-height: 1;
  padding: 0 30px;
  font-size: 16px;
  padding: 12px 16px;
  font-weight: 400;
  color: #fff;
  background: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  width: 100%;
  gap: 16px;
  text-decoration: none;
  text-align: center;

  @media (max-width: 991px) {
    border-radius: 20px;
    max-width: 100%;
  }

  ${(props) =>
    props.$large &&
    `
        max-width: 100%;
        text-transform: uppercase;
        font-weight: 700;

        @media (max-width: 991px) {
          padding: 4px 16px;
        }
      
    `}

  ${(props) =>
    props.$type === 'light' &&
    `
        background: transparent;
        color: var(--accent)
    `}
`;

export const BlueCard = styled.div`
  position: relative;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #009cde;
  background: #e6f7ff;
  color: #343a40;
  font-size: 24px;
  font-weight: 700;
  line-height: 116%;
  display: grid;
  gap: 24px;

  @media (max-width: 991px) {
    gap: 4px;
    font-size: 20px;
  }

  span {
    color: var(--accent);
    font-weight: 700;
  }

  var {
    color: var(--accent);
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 700;
    position: absolute;
    right: 16px;
    top: 16px;
    font-style: normal;

    @media (max-width: 991px) {
      line-height: 100%;
      font-size: 24px;
      display: block;
    }
  }
`;

export const BackLink = styled.button`
  position: relative;
  color: #009cde;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  display: flex;
  margin-bottom: 12px;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.72551 7.40006L9.07801 4.18175L8.19426 3.33337L3.33301 8.00004L8.19426 12.6667L9.07801 11.8183L5.72551 8.60002H13.333V7.40006H5.72551Z" fill="%23009CDE"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const Subheading = styled.div`
  font-size: 22px;
  margin-bottom: 12px;
  font-weight: 700;

  @media (max-width: 991px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

export const TextBtn = styled.button`
  color: var(--accent);
  display: flex;
`;

export const Container = styled.div`
  width: 100%;
  max-width: var(--container-max-width);
  margin-right: auto;
  margin-left: auto;
  position: relative;
`;

export const QuizCard = styled.div`
  position: relative;
  border-radius: 16px;
  background: #fff;
  padding: 40px;
  min-height: 728px;
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  @media (max-width: 991px) {
    padding: 20px;
    min-height: 1px;
  }
`;

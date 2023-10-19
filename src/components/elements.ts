import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ColumnsWrap = styled.div<{ $cols?: number }>`
    display: grid;
    grid-template-columns: ${props => props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr 1fr'};
    margin: 0 -40px;
    height: 100%;
    flex-grow: 1;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
`

export const Column = styled.div`
    padding: 0 40px;
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }

    &:nth-of-type(even) {
      border-left: 1px solid #d9d9d9;
    }
`

export const Foot = styled.div<{ $align?: 'center' | 'flex-end' }>`
    margin-top: auto;
    display: flex;
    justify-content: ${props => props.$align || 'flex-start'};
`

export const Heading = styled.div`
    font-size: 24px;
font-style: normal;
font-weight: 700;
text-transform: uppercase;
margin-bottom: 32px;
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
`;

export const Item = styled.li`
  font-size: 20px;
  padding-left: 20px;
  position: relative;

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
  }
`;

export const Text = styled.p`
    margin-bottom: 12px;
    font-size: 20px;
    margin-top: 0;

    span {
    font-weight: 700;
    color: var(--accent);
  }

`

export const Button = styled.button<{ $type?: 'light' }>`
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
    width:100%;
    gap: 16px;
    text-decoration: none;

    ${props => props.$type === 'light' && `
        background: transparent;
        color: var(--accent)
    `}
`

export const ButtonLink = styled(Link)<{ $type?: 'light', $large?: boolean }>`
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
    width:100%;
    gap: 16px;
    text-decoration: none;

    ${props => props.$large && `
        max-width: 100%;
        text-transform: uppercase;
        font-weight: 700;
    `}

    ${props => props.$type === 'light' && `
        background: transparent;
        color: var(--accent)
    `}
`

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
    }
`

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
`

export const Subheading = styled.div`
    font-size: 22px;
    margin-bottom: 12px;
    font-weight: 700;
`
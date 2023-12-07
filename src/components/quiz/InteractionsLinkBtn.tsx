import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../elements';

interface Props {
  routePrefix?: string;
}

const DiagosisInteractionButton = styled(Button)`
  margin-bottom: 32px;

  @media (max-width: 991px) {
    margin-bottom: 0;
    padding: 8px 16px;
    gap: 8px;
    border-radius: 20px;
    height: auto;
  }
`;

const InteractionsLinkBtn = ({routePrefix}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${routePrefix || ''}/interactions`);
    if (window.ym) {
      window.ym(90602537, 'reachGoal', 'cdss_comparison');
    }
  };

  return (
    <DiagosisInteractionButton onClick={handleClick} $large={true}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 17C14.366 17 17.5 13.866 17.5 10C17.5 6.13401 14.366 3 10.5 3C6.63401 3 3.5 6.13401 3.5 10C3.5 13.866 6.63401 17 10.5 17Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.5 21L15.5 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Проверить межлекарственные взаимодействия
    </DiagosisInteractionButton>
  );
};

export { InteractionsLinkBtn };

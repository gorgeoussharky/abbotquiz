import styled from 'styled-components';
import { BlueCard, Button, Heading } from '../../elements';

export const DiagnosisCard = styled(BlueCard)`
  margin-bottom: 32px;

  @media (max-width: 991px) {
    margin-bottom: 12px;
  }
`;

export const DiagnosisHeading = styled(Heading)`
  margin-bottom: 12px;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

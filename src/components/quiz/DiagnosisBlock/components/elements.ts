import styled from "styled-components";
import { BlueCard, Heading } from "../../../elements";

export const DiagnosisCard = styled(BlueCard)`
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

export const DiagnosisHeading = styled(Heading)`
  margin-bottom: 12px;
`;
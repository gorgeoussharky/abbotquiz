import styled from 'styled-components';
import warningImg from '../../assets/img/warning.png';

interface Props {
  content: string;
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
  gap: 24px;
  align-items: center;
  border-radius: 4px;
  background: rgba(234, 187, 22, 0.2);
  padding: 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 125%;

  @media (max-width: 991px) {
    gap: 20px;
    font-size: 16px;
  }
`;

const Icon = styled.div`
  width: 100%;
  height: auto;
`;

const Text = styled.div`
  b {
    display: block;
  }
  a {
    color: #009cde;
    display: block;
    margin-top: 12px;
    font-size: 14px;
  }

  @media (max-width: 991px) {
    p {
      font-size: 16px !important;
    }
  }
`;

const Notification = ({ content }: Props) => {
  return (
    <Wrap>
      <Icon>
        <img src={warningImg} alt="" />
      </Icon>

      <Text dangerouslySetInnerHTML={{ __html: content }} />
    </Wrap>
  );
};

export { Notification };

import { useMemo } from 'react';
import {
  BackLink,
  Button,
  ButtonLink,
  Foot,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DiagnosisHeading } from '../../elements';
import {
  diseasesList,
  notificationsList,
} from './diseases';
import { InterpretationItem } from '../../../InterpretationItem';
import { selectSrkExaminations } from '../../../../../store/srk/examinationsSlice';
import { useAppSelector } from '../../../../../app/hooks';
import { CardsList } from '../../../CardsList';
import styled from 'styled-components';
import { Notification } from '../../../Notification';

interface Props {
  onBack: () => void;
  onFamiliarize: () => void;
}

const InterpretationList = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 24px;
`;

const Interpretation = ({ onBack, onFamiliarize }: Props) => {
  const questions = useAppSelector(selectSrkExaminations);

  const diseases = useMemo(diseasesList, [questions]);
  const notifications = useMemo(notificationsList, [questions]);

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>
        Интерпретация результатов обследования
      </DiagnosisHeading>

      <Text>
        На основании выявленных отклонений результатов обследований от норм,
        можно допустить наличие у пациента следующих заболеваний:
      </Text>

      <InterpretationList>
        {diseases.map((el) => (
          <InterpretationItem
            expand={diseases.length === 1}
            item={el}
            key={el.title}
          />
        ))}
      </InterpretationList>

      <CardsList blueNotifications notifications={notifications} />

      <Notification blue content={`
        При выявлении у пациента отклонений от нормы по результатам лабораторно-диагностических исследований рекомендуется проводить терапию основного заболевания, вызвавшего данное отклонение(-ия).
        <b>При этом необходимо помнить о возможности наличия у пациента коморбидного состояния: основное заболевание и СРК. При сохранении симптомов рекомендуется продолжить диагностический поиск в этом направлении.</b>
        Продолжайте регулярно наблюдать пациента, даже если по результатам всех лабораторно-диагностических исследований не выявлено никаких отклонений.
      `} />

      <Button style={{maxWidth: '100%', margin: '32px 0'}} onClick={onFamiliarize}>
        Ознакомиться с принципами терапии СРК
      </Button>

      <Foot $align="flex-end">
        <ButtonLink to="/" $type='light'>Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { Interpretation };

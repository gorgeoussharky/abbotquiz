import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedSymptoms } from '../../store/symptomsSlice';

import { BackLink, BlueCard, ButtonLink, Foot, Heading, QuizWrap } from '../elements';

interface Props {
  onBack: () => void;
}

const Reccomendation = styled(BlueCard)`
  display: block;
`

const RecommendationsBlock = ({ onBack }: Props) => {
  const symptoms = useAppSelector(selectSelectedSymptoms);

  const extraesophagealSymptoms = () => {
    return symptoms.filter((el) => el.type === 'Внепищеводные');
  };

  const generateText = (title: string, doctors?: string) => {
    if (!doctors) return ''
    return `Учитывая наличие у пациента <span>${title}</span> с целью исключения
    сопутствующей патологии рекомендуется направить пациента на
    консультацию к следующему (-им) специалисту (-ам): <span>${doctors}</span>`;
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>
        Назад
      </BackLink>

      <Heading>Результаты диагностики</Heading>

      {extraesophagealSymptoms().map((el) => (
        <Reccomendation dangerouslySetInnerHTML={{__html: generateText(el.group, el.doctors)}}>
        </Reccomendation>
      ))}

      {/* <Recommendations
        list={extraesophagealSymptoms().map((el) =>
          generateText(el.title, el.doctors)
        )}
      /> */}

      <Foot $align='flex-end'>
        <ButtonLink to="/" $type='light'>
          Закончить прием
        </ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { RecommendationsBlock };

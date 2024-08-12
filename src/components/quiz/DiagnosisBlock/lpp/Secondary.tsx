import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectLPPSecondaryAnswers } from '../../../../store/lpp/secondarySlice';
import { QuizWrap, BackLink, Foot, ButtonLink, Text } from '../../../elements';
import { DiagnosisHeading, DiagnosisCard } from '../elements';
import styled from 'styled-components';
import { Option } from '../../../../types/interfaces';
import {
  serologicABCE,
  serologicAuto,
  serologicCirro,
  serologicLessKnown,
  visualized,
  visualizedBiliarInfiltration,
  wilsons,
} from './researches';
import { Tags } from '../../../Tags';
import { InterpretationItem } from '../../InterpretationItem';

interface Props {
  onBack: () => void;
}

const DiagnosisNotice = styled.div`
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid rgb(0, 156, 222, 0.2);
  font-size: 20px;
  font-weight: 700;
  line-height: 125%;
  margin-bottom: 32px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Content = styled.div`
  margin-bottom: 10px;
  display: grid;
  gap: 16px;
`;

const SecondaryLPPDiagnosis = ({ onBack }: Props) => {
  const answers = useAppSelector(selectLPPSecondaryAnswers);

  const type = useMemo(() => {
    return answers.find((el) => el.id === 'lpp_type')?.value?.value;
  }, [answers]);

  const typeQuestions = useMemo(() => {
    if (!type) return;

    const typeAnswer: Option[] = JSON.parse(type as string);


    if (typeAnswer[0].value === 'hollistic') {
      const arr = answers.find((el) => el.id === 'patologies_holestatic');
      return arr?.value?.value ? JSON.parse(arr.value.value as string) as Option[] : [];
    }

    const arr = answers.find((el) => el.id === 'patologies_mixed');
    return arr?.value?.value ? JSON.parse(arr.value.value as string) as Option[] : [];
  }, [type]);

  const clarifications_mixed = useMemo(() => {
    if (!typeQuestions) return [];

    const patologies = typeQuestions.map((el) => el.value);
    const result = [];

    if (!patologies.includes('viral_hepatitis')) {
      result.push(serologicABCE);
    }

    if (!patologies.includes('autoimmune_liver_diseases')) {
      result.push(serologicAuto);
    }

    if (
      !patologies.includes(
        'biliary_tract_pathologies_and_infiltrative_processes'
      )
    ) {
      result.push({
        ...visualized,
        title:
          'Визуализирующие исследования для исключения патологии билиарного тракта и инфильтративных процессов',
      });
    }

    return result;
  }, [type, typeQuestions]);

  const recommendations_mixed = useMemo(() => {
    if (!typeQuestions) return [];

    const patologies = typeQuestions.map((el) => el.value);
    const result = [];

    const lessKnown = {
      ...serologicLessKnown,
      content: () => {
        return (
          <>
            <Row>
              {!patologies.includes('cytomegalovirus_infection') && (
                <div>
                  <Text>Цитомегаловирус: </Text>
                  <Tags bold list={['анти-CMV-IgM', 'анти-CMV-IgG']} />
                </div>
              )}

              {!patologies.includes('epstein_barr_virus_infection') && (
                <div>
                  <Text>Вирус Эпштейна-Баар: </Text>
                  <Tags bold list={['анти-EBV-IgM', 'анти-EBV-IgG']} />
                </div>
              )}

              {!patologies.includes('herpes_simplex_virus_infection') && (
                <div>
                  <Text>Вирус простого герпеса:</Text>
                  <Tags bold list={['анти-HSV-IgM', 'анти-HSV-IgG']} />
                </div>
              )}

              {!patologies.includes('chickenpox_virus_infection') && (
                <div>
                  <Text>Дополнительно можно исключить:</Text>
                  <Tags bold list={['анти-VZV-IgM', 'анти-VZV-IgG']} />
                </div>
              )}
            </Row>
          </>
        );
      },
    };

    if (!patologies.includes('wilson_disease')) {
      result.push(wilsons);
    }

    if (
      !patologies.includes('cytomegalovirus_infection') ||
      !patologies.includes('epstein_barr_virus_infection') ||
      !patologies.includes('herpes_simplex_virus_infection') ||
      !patologies.includes('chickenpox_virus_infection')
    ) {
      result.push(lessKnown);
    }

    return result;
  }, [type, typeQuestions]);

  const clarifications_holestatic = useMemo(() => {
    if (!typeQuestions) return [];

    const patologies = typeQuestions.map((el) => el.value);
    const result = [];

    if (!patologies.includes('biliary_tract_pathologies_and_infiltrative_processes')) {
      result.push(visualizedBiliarInfiltration);
    }

    return result;
  }, [type, typeQuestions]);

  const recommendations_holestatic = useMemo(() => {

    if (!typeQuestions) return [];

    const patologies = typeQuestions.map((el) => el.value);
    const result = [];

    console.log(patologies)

    if (!patologies.includes('primary_biliary_holangitis')) {
      result.push(serologicCirro);
    }

    return result;  
  }, [type, typeQuestions]);

  const results = useMemo(() => {
    const typeAnswer: Option[] = JSON.parse(type as string);
    if (typeAnswer[0].value === 'hollistic') {
      return {
        recommendations: recommendations_holestatic,
        clarifications: clarifications_holestatic,
      }
    }

    return {
      recommendations: recommendations_mixed,
      clarifications: clarifications_mixed,
    }
  }, [recommendations_holestatic, recommendations_mixed, type, clarifications_holestatic, clarifications_mixed]);

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisHeading>Диагноз</DiagnosisHeading>

      <DiagnosisCard>
        <span style={{ color: '#000' }}>ЛПП.</span>
        Код по МКБ-10: К71
      </DiagnosisCard>

      {Boolean(results.clarifications.length) && (
        <>
          <DiagnosisHeading>
            Для уточнения диагноза необходимо исключить у пациента следующие
            состояния:
          </DiagnosisHeading>
          <Content>
          {results.clarifications.map((el) => (
            <InterpretationItem item={el} key={el.title} />
          ))}
          </Content>
        </>
      )}

      {Boolean(results.recommendations.length) && (
        <>
          <DiagnosisHeading>
            В зависимости от конкретных случаев рекомендуется дополнительно
            исключить у пациента следующие заболевания:
          </DiagnosisHeading>
          <Content>
          {results.recommendations.map((el) => (
            <InterpretationItem item={el} key={el.title} />
          ))}
          </Content>
        </>
      )}

      <DiagnosisNotice>
        Необходимо иметь в виду, что в условиях клинической практики возможно
        коморбидное течение нескольких заболеваний печени. В данной модели
        рассматривается только ЛПП.
      </DiagnosisNotice>

      <Foot $align="flex-end">
        <ButtonLink style={{maxWidth: 600}} $type="light" to="/lpp/medicaments">
          Оценка принимаемых лекарственных и растительных средств и БАД
        </ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { SecondaryLPPDiagnosis };

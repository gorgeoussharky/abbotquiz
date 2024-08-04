import { useMemo, useState } from 'react';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { Tabs } from '../../../../Tabs';
import { DiagnosisHeading, DiagnosisCard } from '../../elements';
import { useAppSelector } from '../../../../../app/hooks';
import { selectLPPType } from '../../../../../store/lpp/lppTypeSlice';
import { fda, hospitalizations, liverBiopsi, serologicABCE, serologicAuto, serologicCirro, serologicLessKnown, visualized, visualizedMagnet, visualizedMultiple, wilsons } from './researches';
import { InterpretationItem } from '../../../InterpretationItem';
import styled from 'styled-components';
import { Hepotoxicity } from '../../../LPP/Hepotoxicity';

interface Props {
  onBack: () => void;
}

const Info = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid #009CDE;
  background-color: #E6F7FF;
  padding-right: 20%;
  position: relative;
  display: grid;
  gap: 12px;
  font-weight: 700;
  font-size: 24px;

  @media (max-width: 576px) {
    padding-right: 16px;
    padding-top: 80px;
    font-size: 18px;
  }
`

const InfoTitle = styled.div`
 span {
  color: var(--accent);
 }
`

const InfoFoot = styled.div`
    display: flex;
    gap: 24px;

    @media (max-width: 576px) {
      flex-direction: column;
      gap: 12px;
    }

    span {
      font-weight: 400;
    }

`

const RValue = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  padding: 12px 16px;
  border-radius: 40px;
  background-color: #fff;
  border: 1px solid #009CDE;
  font-size: 20px;

  @media (max-width: 576px) {
    right: unset;
    left: 16px;
    font-size: 16px;
  }
`

const Content = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 32px;

  hr {
    width: 100%;
    opacity: 0.3;
    background-color: #BDBDBD;
    height: 1px;
  }
`

const DiagnosisTabs = styled(Tabs)`
  margin-bottom: 24px;
`

const HighProb = ({ onBack }: Props) => {
  const tabs = ['Исследования 1-ой линии', 'Исследования 2-ой линии'];
  const answers = useAppSelector(selectLPPType);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const rScore = useMemo(() => {
    const alt = answers.find((el) => el.id === 'alt');
    const shf = answers.find((el) => el.id === 'shf');

    const alt_base = alt?.value_base || 0;
    const shf_base = shf?.value_base || 0;
    const alt_max = alt?.value_max || 1;
    const shf_max = shf?.value_max || 1;

    return (alt_base / alt_max) / (shf_base / shf_max);
  }, [answers]);

  const rScoreLabel = useMemo(() => {
    if (rScore >= 5) {
      return "R>=5";
    }

    if (rScore > 2 && rScore < 5) {
      return "2<R<5";
    }

    return "R<=2";
  }, [rScore]);

  const hyLaw = useMemo(() => {
    const bili = answers.find((el) => el.id === 'bili');
    const base_value = bili?.value_base || 0;
    const max_value = bili?.value_max || 0;

    return rScore > 5 && base_value > max_value * 2

  }, [answers, rScore]);

  const type = useMemo(() => {
    if (rScore >= 5) {
      return 'гепатоцеллюлярный'
    }

    if (rScore > 2 && rScore < 5) {
      return 'смешанный'
    }

    return 'холестатический'
  }, [rScore]);

  const firstLineResearches = useMemo(() => {

    if (rScore <= 2) {
      return [visualizedMultiple]
    }
    
    return [serologicABCE, serologicAuto, visualized]

  }, [answers, rScore]);

  const secondLineResearches = useMemo(() => {
    if (rScore <= 2) {
      return [visualizedMagnet, serologicCirro, liverBiopsi]
    }
  
    return [serologicLessKnown, wilsons, liverBiopsi]
    
  }, [answers, rScore]);

  const additionalData = useMemo(() => {
      return [hospitalizations, fda]
  }, [answers, rScore]);

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Info>
        <InfoTitle>
          Уровень повышения биохимических показателей соотвествует критериям{' '}
          <span>лекарственного поражения печени (ЛПП)</span>
        </InfoTitle>

        <div>Код по МКБ-10: К71</div>

        <InfoFoot>
          <div>
            Тип поражения: <span>{type}</span>
          </div>
          <div>
            Закон Хая: <span>{hyLaw ? 'выполняется' : 'не выполняется'}</span>
          </div>
        </InfoFoot>

        <RValue>Значение {rScoreLabel}</RValue>
      </Info>

      <DiagnosisHeading>Для подтверждения диагноза необходимо дообследование:</DiagnosisHeading>

      <DiagnosisTabs activeItem={activeTab} onSelect={setActiveTab} list={tabs}  />

      <Content>
          {activeTab === 'Исследования 1-ой линии' && firstLineResearches?.map(el => (
            <InterpretationItem key={el.title} item={el} />
          ))}

          {activeTab === 'Исследования 2-ой линии' && secondLineResearches?.map(el => (
            <InterpretationItem key={el.title} item={el} />
          ))}

          <hr />

          {additionalData?.map(el => (
            <InterpretationItem transparent key={el.title} item={el} />
          ))}
      </Content>

      <Hepotoxicity />

      <Foot $align="flex-end">
        <ButtonLink to="/">
          Закончить прием
        </ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { HighProb };

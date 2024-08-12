import { useMemo, useState } from 'react';
import {
  BackLink,
  ButtonLink,
  Foot,
  QuizWrap,
  Text,
} from '../../../../elements';
import { Tabs } from '../../../../Tabs';
import { DiagnosisHeading, DiagnosisCard } from '../../elements';
import { useAppSelector } from '../../../../../app/hooks';
import { selectLPPType } from '../../../../../store/lpp/lppTypeSlice';
import {
  fda,
  hospitalizations,
  liverBiopsi,
  serologicABCE,
  serologicAuto,
  serologicCirro,
  serologicLessKnown,
  visualized,
  visualizedMagnet,
  visualizedMultiple,
  wilsons,
} from '../researches';
import { InterpretationItem } from '../../../InterpretationItem';
import styled from 'styled-components';
import { Hepotoxicity } from '../../../LPP/Hepotoxicity';
import { selectSelectedLPPMedicaments } from '../../../../../store/lpp/medicamentsSlice';
import { useLocation } from 'react-router-dom';

interface Props {
  onBack: () => void;
}

const Info = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid #009cde;
  background-color: #e6f7ff;
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
`;

const InfoTitle = styled.div`
  span {
    color: var(--accent);
  }
`;

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
`;

const RValue = styled.div<{ $staticPosition: boolean }>`
  position: absolute;
  right: 16px;
  top: 16px;
  padding: 12px 16px;
  border-radius: 40px;
  background-color: #fff;
  border: 1px solid #009cde;
  font-size: 20px;

  @media (max-width: 576px) {
    right: unset;
    left: 16px;
    font-size: 16px;
  }

  ${({ $staticPosition }) =>
    $staticPosition &&
    `
    position: static;
    width: fit-content;
  `}
`;

const Content = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 32px;

  hr {
    width: 100%;
    opacity: 0.3;
    background-color: #bdbdbd;
    height: 1px;
  }
`;

const DiagnosisTabs = styled(Tabs)`
  margin-bottom: 24px;
`;

const HighProb = ({ onBack }: Props) => {
  const tabs = ['Исследования 1-ой линии', 'Исследования 2-ой линии'];
  const answers = useAppSelector(selectLPPType);
  const selectedMeds = useAppSelector(selectSelectedLPPMedicaments);
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const rScore = useMemo(() => {
    const alt = answers.find((el) => el.id === 'alt');
    const shf = answers.find((el) => el.id === 'shf');

    const alt_base = alt?.value_base || 0;
    const shf_base = shf?.value_base || 0;
    const alt_max = alt?.value_max || 1;
    const shf_max = shf?.value_max || 1;

    return alt_base / alt_max / (shf_base / shf_max);
  }, [answers]);

  const rScoreLabel = useMemo(() => {
    if (rScore >= 5) {
      return 'R>=5';
    }

    if (rScore > 2 && rScore < 5) {
      return '2<R<5';
    }

    return 'R<=2';
  }, [rScore]);

  const hyLaw = useMemo(() => {
    const bili = answers.find((el) => el.id === 'bili');
    const base_value = bili?.value_base || 0;
    const max_value = bili?.value_max || 0;

    return rScore > 5 && base_value > max_value * 2;
  }, [answers, rScore]);

  const type = useMemo(() => {
    if (rScore >= 5) {
      return 'гепатоцеллюлярный';
    }

    if (rScore > 2 && rScore < 5) {
      return 'смешанный';
    }

    return 'холестатический';
  }, [rScore]);

  const firstLineResearches = useMemo(() => {
    if (rScore <= 2) {
      return [visualizedMultiple];
    }

    return [serologicABCE, serologicAuto, visualized];
  }, [answers, rScore]);

  const secondLineResearches = useMemo(() => {
    if (rScore <= 2) {
      return [visualizedMagnet, serologicCirro, liverBiopsi];
    }

    return [serologicLessKnown, wilsons, liverBiopsi];
  }, [answers, rScore]);

  const additionalData = useMemo(() => {
    return [hospitalizations, fda];
  }, [answers, rScore]);

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Info>
        <RValue $staticPosition={location.pathname === '/lpp/type'}>
          Значение {rScoreLabel}
        </RValue>

        {location.pathname !== '/lpp/type' && (
          <>
            <InfoTitle>
              Уровень повышения биохимических показателей соотвествует критериям{' '}
              <span>лекарственного поражения печени (ЛПП)</span>
            </InfoTitle>

            <div>Код по МКБ-10: К71</div>
          </>
        )}

        <InfoFoot>
          <div>
            Тип поражения: <span>{type}</span>
          </div>
          {location.pathname !== '/lpp/type' && (
            <div>
              Закон Хая: <span>{hyLaw ? 'выполняется' : 'не выполняется'}</span>
            </div>
          )}
        </InfoFoot>

        {location.pathname === '/lpp/type' && (
          <div>
            <span> Для подтверждения диагноза необходимо дообследование</span>
          </div>
        )}
      </Info>

      {location.pathname !== '/lpp/type' && (
        <>
          <DiagnosisHeading>
            Для подтверждения диагноза необходимо дообследование
          </DiagnosisHeading>

          <DiagnosisTabs
            activeItem={activeTab}
            onSelect={setActiveTab}
            list={tabs}
          />

          <Content>
            {activeTab === 'Исследования 1-ой линии' &&
              firstLineResearches?.map((el) => (
                <InterpretationItem key={el.title} item={el} />
              ))}

            {activeTab === 'Исследования 2-ой линии' &&
              secondLineResearches?.map((el) => (
                <InterpretationItem key={el.title} item={el} />
              ))}

            <hr />

            {additionalData?.map((el) => (
              <InterpretationItem transparent key={el.title} item={el} />
            ))}
          </Content>

          {selectedMeds.length > 0 && (
            <Hepotoxicity selectedMeds={selectedMeds} />
          )}
        </>
      )}

      {location.pathname === '/lpp/type' && (
        <>
          <Text>
            В отсутствие специфических антидотов для лечения ЛПП используются
            средства, способные либо уменьшить симптомы, либо воздействовать на
            определенные патогенетические механизмы их развития. К таким
            препаратам относятся: адеметионин, инозин + меглюмин + метионин +
            никотинамид + янтарная кислота, эссенциальные фосфолипиды, бициклол,
            УДХК и др. <sup>1,2</sup>
          </Text>
          <Text>
            На сегодняшний день среди препаратов, используемых для коррекции
            ЛПП, наибольшей доказательной базой обладает <b>адеметионин.</b>
            <sup>3</sup>
          </Text>
          <Text>
            Адеметионин – естественная аминокислота, способная повышать уровень
            глутатиона в митохондриях и поддерживать их функциональную
            активность, инактивировать CYP2E1, подавлять экспрессию ФНО-α. Всё
            это легло в основу его широкого применения в клинической практике, в
            том числе при ЛПП. Важную роль в этом аспекте играют
            <b>
              антифибротические, антинейротоксические и антидепрессивные
            </b>{' '}
            свойства адеметионина.<sup>1</sup>
          </Text>
        </>
      )}

      <Foot $align="flex-end">
        <ButtonLink to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { HighProb };

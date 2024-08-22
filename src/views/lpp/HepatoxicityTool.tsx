import { useEffect, useState } from 'react';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  BackLink,
  Container,
  QuizCard,
  QuizWrap,
  Text,
} from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import {
  addBlockHistory,
  removeLastBlockHistoryElement,
  selectHasLastDiagnosis,
  selectPrevBlocksHistory,
} from '../../store/utilsSlice';
import { MedicamentsBlock } from '../../components/quiz/MedicamentsBlock';
import {
  selectLPPMedicaments,
  selectSelectedLPPMedicaments,
  removeMedicament,
  addMedicament,
  clearMedicaments,
} from '../../store/lpp/medicamentsSlice';
import { Hepotoxicity } from '../../components/quiz/LPP/Hepotoxicity';

const totalSteps = 2;

const HepatoxicityTool = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('medicaments');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const meds = useAppSelector(selectLPPMedicaments);
  const selectedMeds = useAppSelector(selectSelectedLPPMedicaments);

  useEffect(() => {
    if (hasLastDiagosis) {
      setBlock('diagnosis');
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [block]);

  const stepTitle = () => {
    switch (step) {
      case 1:
        return 'Шаг 1: Сбор симптомов';
      case 2:
        return 'Шаг 2: Результаты';
      default:
        return '';
    }
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      case 'medicaments':
        setStep(2);
        setBlock('hepatoxicity');
        return;
    }
  };

  const handleBack = () => {
    switch (block) {
      case 'medicaments':
        setStep(1);
        break;
    }

    if (block === 'medicaments') {
      navigate('/');
      return;
    }

    if (blockHistory.length > 0) {
      setBlock(blockHistory[blockHistory.length - 1]);
      dispatch(removeLastBlockHistoryElement());
    }
  };

  const QuizBlock = () => {
    switch (block) {
      case 'medicaments':
        return (
          <MedicamentsBlock
            medicaments={meds.map((el) => el.name)}
            heading="Оценка принимаемых лекарственных и растительных средств и БАД"
            text="В поле ниже введите все лекарственные (по МНН) и растительные средства, а также БАДы, которые принимает пациент: "
            selected={selectedMeds}
            onRemove={(item) => dispatch(removeMedicament(item))}
            onSelect={(item) => dispatch(addMedicament(item))}
            onClear={() => dispatch(clearMedicaments())}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 'hepatoxicity':
        return (
          <QuizWrap>
            <BackLink onClick={handleBack}>Назад</BackLink>

            <Hepotoxicity selectedMeds={selectedMeds} />

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
            <b>антифибротические, антинейротоксические и антидепрессивные</b> свойства
            адеметионина.<sup>1</sup>
          </Text>
          </QuizWrap>
        );
      default:
        return <></>;
    }
  };

  return (
    <Container>
      <QuizCard>
        <ProgressBar step={step} totalSteps={totalSteps} title={stepTitle()} />
        <QuizBlock />
      </QuizCard>
    </Container>
  );
};

export { HepatoxicityTool };

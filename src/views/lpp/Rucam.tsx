import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearRucamAnswer,
  clearRucamGroupAnswer,
  resetList,
  selectRucamList,
  setInitialList,
  setRucamAnswer,
  setRucamGroupAnswer,
} from '../../store/lpp/rucamSlice';
import { useNavigate } from 'react-router-dom';
import { Container, QuizCard } from '../../components/elements';
import { ProgressBar } from '../../components/ProgressBar';
import { selectLPPType, resetValues } from '../../store/lpp/lppTypeSlice';
import {
  selectHasLastDiagnosis,
  selectPrevBlocksHistory,
  addBlockHistory,
  removeLastBlockHistoryElement,
} from '../../store/utilsSlice';
import { QuestionsBlock } from '../../components/quiz/QuestionsBlock';
import { DiagnosisBlock } from '../../components/quiz/DiagnosisBlock/DiagnosisBlock';
import { selectLPPSecondaryAnswers, setLPPSecondaryAnswer } from '../../store/lpp/secondarySlice';
import { Option } from '../../types/interfaces';

const totalSteps = 7;

const Rucam = () => {
  const [step, setStep] = useState(1);
  const [block, setBlock] = useState('group_1');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hasLastDiagosis = useAppSelector(selectHasLastDiagnosis);
  const blockHistory = useAppSelector(selectPrevBlocksHistory);

  const rucamList = useAppSelector(selectRucamList);
  const lppSecondaryAnswers = useAppSelector(selectLPPSecondaryAnswers);
  const answers = useAppSelector(selectLPPType);

  const rScore = useMemo(() => {
    const alt = answers.find((el) => el.id === 'alt');
    const shf = answers.find((el) => el.id === 'shf');

    if (
      !alt?.value_base ||
      !shf?.value_base ||
      !alt?.value_max ||
      !shf?.value_max
    ) {
      return;
    }

    const alt_base = alt?.value_base || 0;
    const shf_base = shf?.value_base || 0;
    const alt_max = alt?.value_max || 1;
    const shf_max = shf?.value_max || 1;

    return alt_base / alt_max / (shf_base / shf_max);
  }, [answers]);

  const type = useMemo(() => {
    const secondaryAnswerType = lppSecondaryAnswers.find(
      (el) => el.id === 'lpp_type'
    );

    if (secondaryAnswerType?.value?.value) {
      const type: Option[] = JSON.parse(
        lppSecondaryAnswers.find((el) => el.id === 'lpp_type')?.value
          ?.value as string
      );
      return type[0].value === 'hollistic' ? 'холестатический' : 'смешанный';
    }

    if (!rScore) {
      return;
    }

    if (rScore >= 5) {
      return 'гепатоцеллюлярный';
    }

    if (rScore > 2 && rScore < 5) {
      return 'смешанный';
    }

    return 'холестатический';
  }, [rScore, lppSecondaryAnswers]);

  const setListType = () => {
    if (type === 'гепатоцеллюлярный') {
      dispatch(setInitialList({ type: 'hepatocellular' }));
    } else {
      dispatch(setInitialList({ type: 'mixed' }));
    }
  };

  useEffect(() => {
    if (!type) {
      setBlock('lppType');
    } else {
      setListType();
    }

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
    return 'Предварительная оценка по шкале RUCAM';
  };

  const handleNext = () => {
    dispatch(addBlockHistory(block));

    switch (block) {
      case 'lppType':
        setStep(1);
        setListType();
        setBlock('group_1');
        break;
      case 'group_1':
        setStep(2);
        setBlock('group_2');
        break;
      case 'group_2':
        setStep(2);
        setBlock('group_3');
        break;
      case 'group_3':
        setStep(3);
        setBlock('group_4');
        break;
      case 'group_4':
        setStep(4);
        setBlock('group_5');
        break;
      case 'group_5':
        setStep(5);
        setBlock('group_5_1');
        break;
      case 'group_5_1':
        setStep(5);
        setBlock('group_6');
        break;
      case 'group_6':
        setStep(6);
        setBlock('group_7');
        break;
      case 'group_7':
        setStep(7);
        setBlock('group_8');
        break;
      case 'group_8':
        setStep(8);
        setBlock('diagnosis');
        break;
    }
  };

  const handleBack = () => {
    // Clearing results on back navigation
    switch (block) {
      case 'group_1':
        dispatch(clearRucamAnswer({ id: 'group_1' }));
        dispatch(clearRucamAnswer({ id: 'group_1_1' }));
        break;
      case 'group_2':
        dispatch(clearRucamAnswer({ id: 'group_2' }));
        break;
      case 'group_3':
        dispatch(clearRucamAnswer({ id: 'group_3' }));
        break;
      case 'group_4':
        dispatch(clearRucamAnswer({ id: 'group_4' }));
        break;
      case 'group_5':
        dispatch(
          clearRucamGroupAnswer({
            questionId: 'alt_causes',
            groupId: 'alt_causes_1',
          })
        );
        break;
      case 'group_5_1':
        dispatch(
          clearRucamGroupAnswer({
            questionId: 'alt_causes_2',
            groupId: 'alt_causes_2',
          })
        );
        dispatch(
          clearRucamGroupAnswer({
            questionId: 'alt_causes_2',
            groupId: 'alt_causes_pcr',
          })
        );
        break;
      case 'group_6':
        dispatch(clearRucamAnswer({ id: 'group_6' }));
        break;
      case 'group_7':
        dispatch(clearRucamAnswer({ id: 'group_7' }));
        break;
      case 'group_8':
        dispatch(clearRucamAnswer({ id: 'group_8' }));
        break;
    }

    if (block === 'lppType') {
      navigate('/');
      return;
    }

    if (block === 'group_1') {
      if (blockHistory[blockHistory.length - 1] === 'lppType') {
        setBlock('lppType');
      } else {
        navigate('/')
      }
    }

    if (blockHistory.length > 0) {
      setBlock(blockHistory[blockHistory.length - 1]);
      dispatch(removeLastBlockHistoryElement());
    }
  };

  const handleReset = () => {
    dispatch(resetList());
    setListType();
    setBlock('group_1');
  };

  const QuizBlock = () => {
    switch (block) {
      case 'lppType':
        return (
          <QuestionsBlock
            title="Интерпретация обследований"
            questions={lppSecondaryAnswers.filter((el) => el.id === 'lpp_type')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) => {
              dispatch(
                setLPPSecondaryAnswer({
                  id: id,
                  answer: val,
                })
              );
            }}
          />
        );
      case 'group_1':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_1')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'group_2':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_2')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'group_3':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_3')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'group_4':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_4')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'group_5':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_5')}
            onBack={handleBack}
            onNext={handleNext}
            alwaysShowBtn
            onGroupCheckboxChange={(
              value,
              optionIndex,
              groupId,
              questionId,
              valueIndex
            ) =>
              dispatch(
                setRucamGroupAnswer({
                  value,
                  optionIndex,
                  groupId,
                  questionId,
                  valueIndex,
                })
              )
            }
          />
        );
      case 'group_5_1':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_5_1')}
            onBack={handleBack}
            onNext={handleNext}
            alwaysShowBtn
            onGroupCheckboxChange={(
              value,
              optionIndex,
              groupId,
              questionId,
              valueIndex
            ) =>
              dispatch(
                setRucamGroupAnswer({
                  value,
                  optionIndex,
                  groupId,
                  questionId,
                  valueIndex,
                })
              )
            }
          />
        );
      case 'group_6':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_6')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'group_7':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_7')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'group_8':
        return (
          <QuestionsBlock
            title="признаки гепатоцеллюлярного поражения печени:"
            questions={rucamList.filter((el) => el.group === 'group_8')}
            onBack={handleBack}
            onNext={handleNext}
            onChange={(val, id) =>
              dispatch(
                setRucamAnswer({
                  id: id,
                  answer: val,
                })
              )
            }
          />
        );
      case 'diagnosis':
        return <DiagnosisBlock onBack={handleBack} onReset={handleReset} />;
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

export { Rucam };

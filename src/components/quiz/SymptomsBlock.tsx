import { Combobox } from '../form/Combobox';
import { PopularList } from './PopularList';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSelectedSymptoms,
  addSelectedSymptom,
  removeSelectedSymptom,
  clearSelectedSymptoms,
  selectSymptomsDB,
} from '../../store/symptomsSlice';
import { Option } from '../../types/interfaces';
import { SelectedList } from '../SelectedList';
import { BackLink, Button, Column, ColumnsWrap, Foot, Head, Heading, QuizWrap, Text, TextBtn } from '../elements';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const SymptomsBlock = ({onNext, onBack}: Props) => {
  const selectedSymptoms = useAppSelector(selectSelectedSymptoms);
  const db = useAppSelector(selectSymptomsDB);

  const dispatch = useAppDispatch();

  const handleSymptomSelect = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(addSelectedSymptom(dbItem));
  };

  const handleSymptomRemove = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(removeSelectedSymptom(dbItem));
  }

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

    
            <Heading>жалобы пациента</Heading>
      

          <Text >
            Добавьте все симпомы, которые беспокоят пациента
          </Text>

          <Combobox
            label="Поиск симптомов"
            list={db.map((el) => {
              return {
                value: el.title,
                label: el.title,
              };
            })}
            onSelect={handleSymptomSelect}
          />

          <Foot >
            <PopularList onSelect={handleSymptomSelect} list={db.filter(el => el.showOnFront).map(el => {
              return {
                label: el.title,
                value: el.title,
              }
            })} />
          </Foot>
        </Column>

        <Column>
          <Head>
            <Heading>Добавленные симптомы</Heading>
 
            {Boolean(selectedSymptoms.length) && (
              <TextBtn
                onClick={() => dispatch(clearSelectedSymptoms())}
              >
                Сбросить все
              </TextBtn>
            )}
          </Head>

          <SelectedList onRemove={handleSymptomRemove} list={selectedSymptoms.map(el => {
              return {
                label: el.title,
                value: el.title,
              }
            })} />


          <Foot>
            {Boolean(selectedSymptoms.length) && (
              <Button onClick={onNext}>
                Продолжить
              </Button>
            )}
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { SymptomsBlock };

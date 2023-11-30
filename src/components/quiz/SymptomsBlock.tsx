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
import { DBEntry, Option } from '../../types/interfaces';
import { SelectedList } from '../SelectedList';
import { BackLink, Button, Column, ColumnsWrap, Foot, Head, Heading, QuizWrap, Text, TextBtn } from '../elements';

interface Props {
  symptoms: DBEntry[],
  selected: DBEntry[],
  onSelect: (value: Option) => void
  onRemove: (value: Option) => void
  onNext: () => void;
  onBack: () => void;
  onClear: () => void;
}

const SymptomsBlock = ({symptoms, selected, onSelect, onRemove, onClear, onNext, onBack}: Props) => {
 

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
            list={symptoms.map((el) => {
              return {
                value: el.title,
                label: el.title,
              };
            })}
            onSelect={onSelect}
          />

          <Foot >
            <PopularList onSelect={onSelect} list={symptoms.filter(el => el.showOnFront).map(el => {
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
 
            {Boolean(selected.length) && (
              <TextBtn
                onClick={onClear}
              >
                Сбросить все
              </TextBtn>
            )}
          </Head>

          <SelectedList onRemove={onRemove} list={selected.map(el => {
              return {
                label: el.title,
                value: el.title,
              }
            })} />


          <Foot>
            {Boolean(selected.length) && (
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

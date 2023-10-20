import { Combobox } from '../form/Combobox';
import { PopularList } from './PopularList';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Option } from '../../types/interfaces';
import { SelectedList } from '../SelectedList';
import {
  BackLink,
  Button,
  Column,
  ColumnsWrap,
  Foot,
  Head,
  Heading,
  QuizWrap,
  Text,
  TextBtn,
} from '../elements';
import {
  addSelectedMedicament,
  clearSelectedMedicaments,
  removeSelectedMedicament,
  selectMedicaments,
  selectSelectedMedicaments,
} from '../../store/interactionsSlice';
import styled from 'styled-components';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const MedicamentsHeading = styled(Heading)`
    max-width: 70%;
`

const MedicamentsBlock = ({ onNext, onBack }: Props) => {
  const selectedMedicaments = useAppSelector(selectSelectedMedicaments);
  const medicamentsDb = useAppSelector(selectMedicaments);

  const popularMedicaments = [
    {
      value: 'Акалабрутиниб',
      label: 'Акалабрутиниб',
    },
    {
      value: 'Цефдиторен',
      label: 'Цефдиторен',
    },
    {
      value: 'Цефуроксим',
      label: 'Цефуроксим',
    },
    {
      value: 'Клопидогрел',
      label: 'Клопидогрел',
    },
  ];

  const dispatch = useAppDispatch();

  const handleMedicamentSelect = (item: Option) => {
    dispatch(addSelectedMedicament(item.value as string));
  };

  const handleMedicamentRemove = (item: Option) => {
    dispatch(removeSelectedMedicament(item.value as string));
  };

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <Heading>Проверка межлекарственных взаимодействий</Heading>

          <Text>
            Укажите все лекарственные препараты (МНН), которые пациент принимает
            в настоящее время, для проверки межлекарственных взаимодействий с
            препаратами для лечения ГЭРБ
          </Text>

          <Combobox
            label="Поиск препаратов"
            list={medicamentsDb.map((el) => {
              return {
                value: el,
                label: el,
              };
            })}
            onSelect={handleMedicamentSelect}
          />

          <Foot>
            <PopularList
              onSelect={handleMedicamentSelect}
              list={popularMedicaments}
            />
          </Foot>
        </Column>

        <Column>
          <Head>
            <MedicamentsHeading>Выбранные лекарственные препараты (МНН)</MedicamentsHeading>

            {Boolean(selectedMedicaments.length) && (
              <TextBtn onClick={() => dispatch(clearSelectedMedicaments())}>
                Сбросить все
              </TextBtn>
            )}
          </Head>

          <SelectedList
            onRemove={handleMedicamentRemove}
            list={selectedMedicaments.map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
          />

          <Foot>
            {Boolean(selectedMedicaments.length) && (
              <Button onClick={onNext}>Продолжить</Button>
            )}
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { MedicamentsBlock };

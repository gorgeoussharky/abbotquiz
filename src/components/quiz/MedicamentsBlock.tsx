import { Combobox } from '../form/Combobox';
import { PopularList } from './PopularList';

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
import styled from 'styled-components';

interface Props {
  selected: string[],
  medicaments: string[],
  onClear: () => void;
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const MedicamentsHeading = styled(Heading)`
    max-width: 70%;
`

const MedicamentsBlock = ({ medicaments, selected, onNext, onBack, onClear, onRemove, onSelect }: Props) => {
  const popularMedicaments = [
    
  ] as Option[];


  const handleMedicamentSelect = (item: Option) => {
    onSelect(item.value as string);
  };

  const handleMedicamentRemove = (item: Option) => {
    onRemove(item.value as string);
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
            list={medicaments.map((el) => {
              return {
                value: el,
                label: el,
              };
            })}
            onSelect={handleMedicamentSelect}
          />

          {/* <Foot>
            <PopularList
              onSelect={handleMedicamentSelect}
              list={popularMedicaments}
            />
          </Foot> */}
        </Column>

        <Column>
          <Head>
            <MedicamentsHeading>Выбранные лекарственные препараты (МНН)</MedicamentsHeading>

            {Boolean(selected.length) && (
              <TextBtn onClick={() => onClear()}>
                Сбросить все
              </TextBtn>
            )}
          </Head>

          <SelectedList
            onRemove={handleMedicamentRemove}
            list={selected.map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
          />

          <Foot>
            {Boolean(selected.length) && (
              <Button onClick={onNext}>Продолжить</Button>
            )}
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { MedicamentsBlock };

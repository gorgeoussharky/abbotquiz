import { useState } from 'react';
import { QuizWrap, BackLink, Heading, ButtonLink, Foot, Button } from '../elements';
import { Select } from '../form/Select';

import interactionsDB from '../../data/interactionsDb';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedMedicaments } from '../../store/interactionsSlice';
import styled from 'styled-components';
import { InteractionDBEntry, Option } from '../../types/interfaces';
import { InteractionItem } from './InteractionsItem';

interface Props {
  onBack: () => void;
  onBackToDiagnosis: () => void;
}

const Filters = styled.div`
  margin-bottom: 48px;

  @media (max-width: 991px) {
    margin-bottom: 24px;
  }
`;

const FiltersHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    margin-bottom: 24px;
  }
`;

const MedsList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MedsItemBtn = styled.button<{ $active: boolean }>`
  border-radius: 40px;
  padding: 10px 16px;
  border: 1px solid #d9d9d9;
  background: #fff;
  position: relative;
  transition: 500ms;

  &::after {
    content: '';
    opacity: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M1.68806 1.69626C1.80851 1.57574 1.97185 1.50804 2.14217 1.50804C2.31248 1.50804 2.47582 1.57574 2.59627 1.69626L5.99598 5.0989L9.39569 1.69626C9.45495 1.63486 9.52582 1.58588 9.60418 1.55219C9.68255 1.5185 9.76683 1.50077 9.85211 1.50002C9.9374 1.49928 10.022 1.51555 10.1009 1.54787C10.1799 1.58019 10.2516 1.62793 10.3119 1.68829C10.3722 1.74865 10.4199 1.82042 10.4522 1.89943C10.4845 1.97843 10.5007 2.06309 10.5 2.14844C10.4992 2.2338 10.4815 2.31816 10.4479 2.39659C10.4142 2.47502 10.3653 2.54595 10.3039 2.60526L6.9042 6.0079L10.3039 9.41054C10.4209 9.53179 10.4857 9.69417 10.4842 9.86273C10.4827 10.0313 10.4152 10.1925 10.2961 10.3117C10.177 10.4309 10.0159 10.4985 9.84749 10.5C9.67908 10.5014 9.51683 10.4366 9.39569 10.3195L5.99598 6.9169L2.59627 10.3195C2.47513 10.4366 2.31289 10.5014 2.14448 10.5C1.97607 10.4985 1.81497 10.4309 1.69588 10.3117C1.57679 10.1925 1.50924 10.0313 1.50778 9.86273C1.50632 9.69417 1.57106 9.53179 1.68806 9.41054L5.08777 6.0079L1.68806 2.60526C1.56764 2.4847 1.5 2.32122 1.5 2.15076C1.5 1.98029 1.56764 1.81681 1.68806 1.69626Z' fill='%238C8C8C'/%3E%3C/svg%3E");
    background-size: contain;
    width: 12px;
    height: 12px;
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    margin: auto;
    background-repeat: no-repeat;
    transition: 500ms;
  }

  ${(props) =>
    props.$active &&
    `
      background: #E6F7FF;
      border-color: transparent;
      padding-right:36px;

      &::after {
        opacity: 1;
      }
`}
`;

const MedsReset = styled.button`
  text-decoration-line: underline;
  color: var(--accent);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
`;

const InteractionsButton = styled(Button)`
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 0;
  }
`;

const orderings = [
  {
    label: 'от Высокого к Низкому',
    value: 'desc',
  },
  {
    label: 'от Низкого к Высокому',
    value: 'asc',
  },
];

const mainMedicaments = [
  'Рабепразол',
  'Омепразол',
  'Эзомепразол',
  'Лансопразол',
  'Пантопразол',
  'Декслансопразол',
  'Итоприд',
  'Сукральфат',
];

const InteractionsBlock = ({ onBack, onBackToDiagnosis }: Props) => {
  const selectedMedicaments = useAppSelector(selectSelectedMedicaments);
  const [order, setOrder] = useState<Option>(orderings[0]);

  const [activeMainMedsList, setActiveMainMedsList] = useState<string[]>(mainMedicaments);

  const [activeMedsList, setActiveMedsList] =
    useState<string[]>(selectedMedicaments);

  const handleMainMedToggle = (med: string) => {
    if (activeMainMedsList.includes(med)) {
      setActiveMainMedsList(activeMainMedsList.filter((el) => el !== med));
      return;
    }

    setActiveMainMedsList(activeMainMedsList.concat(med));
  };

  const handleInteractionsChange = (med: Option) => {
    if (activeMedsList.includes(med.value as string)) {
      setActiveMedsList(activeMedsList.filter((el) => el !== med.value));
      return;
    }

    setActiveMedsList(activeMedsList.concat(med.value as string));
  };

  const interactionsList = () => {
    const interactions: InteractionDBEntry[] = [];

    activeMainMedsList.forEach((mainMed) => {
      const interactionMedDB = interactionsDB[
        mainMed as keyof typeof interactionsDB
      ] as InteractionDBEntry[];

      if (interactionMedDB) {
        activeMedsList.forEach((med) => {
          const interactionItem = interactionMedDB.filter(
            (el) => el.name === med
          )[0];

          if (interactionItem) {
            interactions.push({
              ...interactionItem,
              mainMed,
            });
          } else {
            interactions.push({
              name: med,
              mainMed,
            });
          }
        });
      }
    });

    return interactions.sort((a, b) => {
      const getRiskLevelNumber = (risk?: string) => {
        switch (risk) {
          case 'Высокий':
            return 3;
          case 'Средний':
            return 2;
          case 'Умеренный':
            return 2;
          case 'Незначительный':
            return 1;
          case 'Низкий':
            return 1;
          default:
            return 0;
        }
      };

      const riskA = getRiskLevelNumber(a.risk);
      const riskB = getRiskLevelNumber(b.risk);

      // От низкого к высокому
      if (order.value === 'asc') {
        return riskA - riskB;
      } else {
        return riskB - riskA;
      }
    });
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Heading>Результаты Проверки межлекарственного взаимодействия</Heading>

      <Filters>
        <FiltersHead>
          <Select
            label="Риск для пациента:"
            options={orderings}
            value={order.label}
            onSelect={(option) => {
              setOrder(option);
            }}
            hasPrefix
          />

          <Select
            isMulti
            label="Показать взаимодействие только с:"
            options={selectedMedicaments.map((el) => {
              return {
                value: el,
                label: el,
              };
            })}
            value={activeMedsList}
            onSelect={handleInteractionsChange}
            hasPrefix
          />
        </FiltersHead>

        <MedsList>
          {mainMedicaments.map((el) => (
            <li key={el}>
              <MedsItemBtn
                $active={activeMainMedsList.includes(el)}
                onClick={() => handleMainMedToggle(el)}
              >
                {el}
              </MedsItemBtn>
            </li>
          ))}

          <li>
            <MedsReset onClick={() => setActiveMainMedsList([])}>
              Сбросить все
            </MedsReset>
          </li>
        </MedsList>
      </Filters>

      <List>
        {interactionsList().map((el) => (
          <InteractionItem item={el} />
        ))}
      </List>

      <Foot $align="flex-end">
        <InteractionsButton onClick={onBackToDiagnosis} $type="light">
          К результатам приема
        </InteractionsButton>
      </Foot>
    </QuizWrap>
  );
};

export { InteractionsBlock };

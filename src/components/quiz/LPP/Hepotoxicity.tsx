import { useMemo, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import {
    selectLPPMedicaments,
    selectSelectedLPPMedicaments,
} from '../../../store/lpp/medicamentsSlice';
import { Button, ButtonLink, Heading, Text } from '../../elements';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface Props {
  selectedMeds: string[]
}

const Meds = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    margin-bottom: 24px;
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const MedBtn = styled.button<{ $active: boolean }>`
  padding: 14px 28px;
  font-size: 20px;
  font-weight: 700;
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 40px;

  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }

  ${props => props.$active && `
    background: var(--accent);
    color: #fff;
  `}
`

const Content = styled.div`
  margin-bottom: 32px;
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 20px;
`;

const MedTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const MedRisk = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #bdbdbd;
  line-height: 150%;
  margin-bottom: 20px;

  var {
    color: #000;
    font-style: normal;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    @media (max-width: 576px) {
      align-items: flex-start;
    }

    span {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      flex: 0 0 auto;
      display: block;

      @media (max-width: 576px) {
        width: 8px;
        height: 8px;
        margin-top: 8px;
      }
    }
  }
`;

const List = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
  margin: 0;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.li<{ $expand?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  border: 1px solid rgb(0, 156, 222, 0.2);
  border-radius: 4px;
  padding: 12px 16px;
  height: 200px;
  overflow: hidden;

  @media (max-width: 576px) {
    height: auto;
  }

  ${props => props.$expand && `
    height: auto;
  `}
`;

const ItemTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 125%;
  color: #bdbdbd;
  margin-bottom: 4px;
`;

const ItemText = styled.div`
  line-height: 125%;
`;



const ExpandBtn = styled(Button)`
    width: fit-content;
    padding: 8px 16px;
    padding-right: 8px;
    gap: 4px;

    @media (max-width: 576px) {
        display: none;
    }
`

const Foot = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Hepotoxicity = ({selectedMeds}: Props) => {
    const meds = useAppSelector(selectLPPMedicaments);
    const [activeMed, setActiveMed] = useState<string>(selectedMeds[0]);
    const [expand, setExpand] = useState<boolean>(false);
    const location = useLocation()

    const activeMedData = useMemo(() => {
        return meds.find((med) => med.name === activeMed);
    }, [activeMed]);

    const riskColor = () => {
        if (activeMedData?.risk.includes('A')) {
            return '#FF0000';
        }

        if (activeMedData?.risk.includes('B')) {
            return '#FFCD0E';
        }

        if (activeMedData?.risk.includes('C')) {
            return '#FFCD0E';
        }

        if (activeMedData?.risk.includes('D')) {
            return '#00B140';
        }

        if (activeMedData?.risk.includes('E')) {
            return '#00B140';
        }
    };

    const btnText = location.pathname.includes('lpp/first') ? 'Предварительная оценка по RUCAM' : 'Окончательная оценка по RUCAM';

    return (
        <>
            <Heading>Оценка гепатотоксичности принимаемых препаратов</Heading>

            <Text>
                База данных по риску развития ЛПП на фоне принимаемых лекарственных
                препаратов/лекарственных комбинаций
            </Text>

            <Meds>
                {selectedMeds.map((med, i) => (
                    <MedBtn $active={med === activeMed} onClick={() => setActiveMed(med)} key={i}>
                        {med}
                    </MedBtn>
                ))}
            </Meds>

            <Content>
                <MedTitle>{activeMedData?.name}</MedTitle>

                <MedRisk>
                    Оценка вероятности лекарственно-индуцированного поражения печени:{' '}
                    <var>
                        <span style={{ backgroundColor: riskColor() }}></span>{' '}
                        {activeMedData?.risk}
                    </var>
                </MedRisk>

                <List>
                    <Item $expand={expand}>
                        <ItemTitle>Гепатотоксичность</ItemTitle>

                        <ItemText>{activeMedData?.toxicity}</ItemText>
                    </Item>

                    <Item $expand={expand}>
                        <ItemTitle>Механизм гепатотоксичности</ItemTitle>

                        <ItemText>{activeMedData?.mechanism}</ItemText>
                    </Item>

                    <Item $expand={expand}>
                        <ItemTitle>
                            Клинические исходы и контроль гепатотоксичности
                        </ItemTitle>

                        <ItemText>{activeMedData?.outcomes}</ItemText>
                    </Item>
                </List>

                <Foot>
                <ExpandBtn $type="light" onClick={() => setExpand(!expand)}>
                    {expand ? 'Свернуть' : 'Развернуть'}
                    <svg style={{ transform: `rotate(${expand ? '180' : '0'}deg)` }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4129 9.87382L12 15.2867L6.58711 9.87382" stroke="#009CDE" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                </ExpandBtn>

                <ButtonLink style={{maxWidth: 320}} to="/lpp/rucam">{btnText}</ButtonLink>
                </Foot>
            </Content>
        </>
    );
};

export { Hepotoxicity }
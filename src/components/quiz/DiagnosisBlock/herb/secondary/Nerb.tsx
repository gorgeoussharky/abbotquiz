import { phImpedance } from "../../../../../store/herb/data/examinationsData";
import { DosageList } from "../../../../DosageList";
import { CardsList } from "../../../CardsList";
import { BackLink, ButtonLink, Column, ColumnsWrap, Foot, Heading, QuizWrap, Subheading, Text } from "../../../../elements";
import { DiagnosisCard, DiagnosisHeading } from "../../elements";
import { InteractionsLinkBtn } from "../../../InteractionsLinkBtn";
import { useAppDispatch } from "../../../../../app/hooks";
import { setMedsToCheck } from "../../../../../store/utilsSlice";

interface Props {
    onBack: () => void;
  }

const Nerb = ({onBack}: Props) => {
    const dosage = [
          {
            title: 'Рабепразол',
            dosage: '20мг 1 раз в сутки',
          },
          {
            title: 'Лансопразол',
            dosage: '60 мг 1 раз в сутки',
          },
          {
            title: 'Омепразол',
            dosage: '20 мг 1 раз в сутки',
          },
          {
            title: 'Пантопразол',
            dosage: '40 мг 1 раз в сутки',
          },
          {
            title: 'Эзомепразол',
            dosage: '40 мг 1 раз в сутки',
          },
          {
            title: 'Декслансопразол',
            dosage: '60 мг 1 раз в сутки',
          },
        ]

        const pyro = [
          {
            title: 'Итоприда гидрохлорид',
          },
        ];
      
        const eso = [
          {
            title: 'Сукральфат',
          },
          {
            title: 'Альфазокс',
          },
        ];

        const mono = [
          {
            title: 'Алюминия гидроксид',
          },
          {
            title: 'Кальция карбонат',
          },
          {
            title: 'Магния гидроксид',
          },
          {
            title: 'Натрия бикарбонат',
          },
        ];

        
        const combo = [
          {
            title: 'Магния гидроксид и алюминия гидроксид',
          },
          {
            title: 'Алюминия гидроксид, магния карбонат и магния гидроксид',
          },
          {
            title: 'Кальция карбонат и магния карбонат',
          },
          {
            title: 'Алюминия гидроксид и магния карбонат',
          },
        ];

        
        const alginat = [
          {
            title: 'Кальция карбонат, Калия бикарбонат, Натрия гидрокарбонат, Натрия алгинат',
          },
        ];

        const dispatch = useAppDispatch()
        const allMeds = () => {
          const items:string[] = []
      
          dosage.forEach(el => items.push(el.title))
          pyro.forEach(el => items.push(el.title))
          eso.forEach(el => items.push(el.title))
          mono.forEach(el => items.push(el.title))
          combo.forEach(el => items.push(el.title))
      
          return items
        }
        
        dispatch(setMedsToCheck(allMeds()))
  
  
  
      return (
        <QuizWrap>
          <ColumnsWrap>
            <Column>
              <BackLink onClick={onBack}>
                Назад
              </BackLink>
  
                <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

                <DiagnosisCard>
                <div>НЭРБ, функциональная изжога, гиперсенситивный пищевод</div>
                  НЭРБ код по МКБ 21.0; функциональная изжога, гиперсенситивный пищевод код по МКБ 22.8
                </DiagnosisCard>
  

                <DiagnosisHeading>
                  Дополнительные обследования
                </DiagnosisHeading>
  
                <Text>
                  Для подтверждения диагноза рекомендуется проведение
                  дополнительных исследований
                </Text>
          
    
                <CardsList list={[phImpedance]} hasBorder />

                <CardsList title="Обратить внимание" notifications={[
                  "Обсудите риск прогрессирования болезни и развитие таких осложнений, как пищевод Барретта, стриктуры и АКП.",
                  "Разъясните важность соблюдения схемы приема препаратов и модификации образа жизни. <a target='_blank' href='/cdss/pdf/lifestyle.pdf'>памятка</a>"
                ]} />
            </Column>
  
            <Column>
              <Heading className="quiz-block__title">Рекомендуемая терапия:</Heading>

              <DosageList title="По назначению терапии:" list={dosage} />
  
              <DosageList title="Прокинетик (по показаниям):" list={pyro} />

              <DosageList title="Эзофагопротекторы:" list={eso} />

              <Subheading>Антациды с или без алгината натрия:</Subheading>

              <DosageList title="Антациды с или без алгината натрия:" smallTitle list={mono} />
              <DosageList title="Антациды с или без алгината натрия:" smallTitle list={combo} />
              <DosageList title="Антациды с или без алгината натрия:" smallTitle list={alginat} />
  
              <InteractionsLinkBtn />
  
              <Foot
                $align="flex-end"
              >
                <ButtonLink to="/" $type="light">
                  Закончить прием
                </ButtonLink>
              </Foot>

            </Column>
          </ColumnsWrap>
        </QuizWrap>
      );
}

export { Nerb }
import { phImpedance } from "../../../../../data/examinationsData";
import { DosageList } from "../../../../DosageList/DosageList";
import { CardsList } from "../../../CardsList";
import { BackLink, BlueCard, ButtonLink, Column, ColumnsWrap, Foot, Heading, Subheading, Text } from "../../../../elements";
import { DiagnosisCard, DiagnosisHeading } from "../elements";

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
  
  
  
      return (
        <div className="quiz-block">
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
                  "Разъясните важность соблюдения схемы приема препаратов и модификации образа жизни. <a target='_blank' href='/pdf/lifestyle.pdf'>Памятка для пациента</a>"
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
  
              <ButtonLink $large to="/" style={{ marginBottom: 32 }}>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5 17C14.366 17 17.5 13.866 17.5 10C17.5 6.13401 14.366 3 10.5 3C6.63401 3 3.5 6.13401 3.5 10C3.5 13.866 6.63401 17 10.5 17Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.5 21L15.5 15"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Проверить межлекарственные взаимодействия
              </ButtonLink>
  
              <Foot
                $align="flex-end"
              >
                <ButtonLink to="/" $type="light">
                  Закончить прием
                </ButtonLink>
              </Foot>

            </Column>
          </ColumnsWrap>
        </div>
      );
}

export { Nerb }
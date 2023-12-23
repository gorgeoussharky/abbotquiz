import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';

interface Props {
  onBack: () => void;
}

const Barret = ({ onBack }: Props) => {
  return (
    <QuizWrap>
      <BackLink onClick={onBack}>
        Назад
      </BackLink>

      <DiagnosisHeading>Результаты диагностики</DiagnosisHeading>

        <DiagnosisCard>
          <div>
          <span>Диагноз</span> <br></br>
          Осложненная ГЭРБ, пищевод Баррета
          </div>
          Код по МКБ 22.7
        </DiagnosisCard>

        <CardsList
          list={[
            {
              title:
                'Подробно ознакомиться с клиническими рекомендациями РГА по лечению пищевода Баррета можно по ссылке:',
              linkLabel: 'Подробнее',
              link: 'https://www.gastro.ru/userfiles/R_Barret_14.pdf',
              linkHasArrow: true,
            },
          ]}
        />
 

      <Foot $align='flex-end'>
        <ButtonLink to="/">
          Закончить прием
        </ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { Barret };

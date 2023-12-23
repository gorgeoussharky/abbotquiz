import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  QuizWrap,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { RecommendationCardType } from '../../../../../types/interfaces';

import egds from '../../../../../assets/img/egds.png';
import schedule from '../../../../../assets/img/schedule.png';
import doctor from '../../../../../assets/img/doctor.png';
import biotic from '../../../../../assets/img/biotic.png';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';

interface Props {
  onBack: () => void;
}

const Correction = ({ onBack }: Props) => {
  const recommendations = [
    {
      title: 'Пациенту с анамнезом персистирующих более года симптомов СРК может понадобиться помощь опытного психотерапевта, который успешно занимается лечением функциональных расстройств ЖКТ, при условии регулярного наблюдения у гастроэнтеролога.',
      icon: doctor,
    },
    {
      title:
        'При долгосрочном наблюдении пациента с СРК возможна смена фенотипа функциональных заболеваний ЖКТ, поэтому важно наблюдать за симптомами и корректировать терапию согласно текущим симптомам.',
      icon: schedule,
    },
  ] as RecommendationCardType[];

  const usefulMaterials = [
    {
      title: 'Памятки по питанию и модификации образа жизни:',
      icon: egds,
      expandable: true,
      unlist: true,
      list: [
        'Дневник наблюдения <a href="">Скачать</a>',
        'Рекомендации по изменению образа жизни и пищевого поведения <a href="/cdss/pdf/lifestyle.pdf">Скачать</a>',
      ],
    },
  ]  as RecommendationCardType[];

  const therapies = [
    {
        title: 'Трициклические антидепрессанты',
        text: 'Например, кломипрамин и другие препараты после консультации врача-психиатра',
        icon: biotic,
    },
    {
        title: 'Психотерапевтические методики',
        text: 'Когнитивно-поведенческая терапия, гипнотерапия, мультикомпонентная и/или динамическая психотерапия',
        icon: doctor,
    },
  ]  as RecommendationCardType[]


  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

          <DiagnosisCard>
            В случае, если у пациента ранее наблюдался СРК смешанного или
            неклассифицируемого подтипа и/или сохраняются боли в животе
          </DiagnosisCard>

          <DiagnosisHeading>Рекомендации</DiagnosisHeading>

          <CardsList
            hasBorder
            list={recommendations}
            notifications={[
              'Для устойчивой ремиссии пациенту необходимо пожизненно придерживаться советов по модификации образа жизни',
            ]}
          />

          <CardsList
            list={usefulMaterials}
            title="Полезные материалы"
          />
        </Column>

        <Column>
          <DiagnosisHeading>можно рекомендовать следующие опции терапии:</DiagnosisHeading>

          <CardsList
            list={therapies}
          />

          <InteractionsLinkBtn />

          <Foot $align="flex-end">
            <ButtonLink to="/">Закончить прием</ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { Correction };

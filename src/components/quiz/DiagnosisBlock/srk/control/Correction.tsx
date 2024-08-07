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
import drugs from '../../../../../assets/img/drugs.png';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { useAppSelector } from '../../../../../app/hooks';
import { selectSrkControlQuestions } from '../../../../../store/srk/controlAppointmentSlice';

interface Props {
  onBack: () => void;
}

const Correction = ({ onBack }: Props) => {
  const srkControlQuestions = useAppSelector(selectSrkControlQuestions);

  const diagnosis = () => {
    const type = srkControlQuestions.find((el) => el.id === 'srk_type')?.value
      ?.value;

    switch (type) {
      case 'srk-m':
        return 'В случае, если у пациента ранее наблюдался СРК смешанного или неклассифицируемого подтипа и/или сохраняются боли в животе';
      case 'srk-d':
        return 'В случае, если у пациента ранее наблюдался СРК с диареей и/или сохраняется диарея';
      case 'srk-z':
        return 'В случае, если у пациента ранее наблюдался СРК с запором и/или сохраняются запоры';
      default:
        return '';
    }
  };

  const recommendations = [
    {
      title:
        'Пациенту с анамнезом персистирующих более года симптомов СРК может понадобиться помощь опытного психотерапевта, который успешно занимается лечением функциональных расстройств ЖКТ, при условии регулярного наблюдения у гастроэнтеролога',
      icon: doctor,
    },
    {
      title:
        'При долгосрочном наблюдении пациента с СРК возможна смена фенотипа функциональных заболеваний ЖКТ, поэтому важно наблюдать за симптомами и корректировать терапию согласно текущим симптомам',
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
        '<b>Дневник наблюдения</b> <a href="/cdss/pdf/diary.pdf" target="_blank" rel="noopener">Скачать</a>',
        '<b>Рекомендации по изменению образа жизни и пищевого поведения </b>  <a target="_blank" rel="noopener" href="/cdss/pdf/diet.pdf">Скачать</a>',
      ],
    },
  ] as RecommendationCardType[];

  const therapies = () => {
    const list = [] as RecommendationCardType[];

    const type = srkControlQuestions.find((el) => el.id === 'srk_type')?.value
      ?.value;

    if (type === 'srk-z') {
      list.push({
        title: 'Агонисты 5-HT4-серотониновых рецепторов (прукалоприд)',
        icon: drugs,
      });
    }

    list.push(
      {
        title: 'Трициклические антидепрессанты',
        text: 'Например, кломипрамин и другие препараты после консультации врача-психиатра',
        icon: biotic,
      },
      {
        title: 'Психотерапевтические методики',
        text: 'Когнитивно-поведенческая терапия, гипнотерапия, мультикомпонентная и/или динамическая психотерапия',
        icon: doctor,
      }
    );

    return list;
  };

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Результаты лечения</DiagnosisHeading>

          <DiagnosisCard>{diagnosis()}</DiagnosisCard>

          <DiagnosisHeading>Рекомендации</DiagnosisHeading>

          <CardsList
            hasBorder
            list={recommendations}
            blueNotifications
            notifications={[
              'Уведомить пациента о важности строгого соблюдения рекомендаций по изменению образа жизни и питания для достижения результатов лечения',
            ]}
          />

          <CardsList
            list={usefulMaterials}
            blueNotifications
            title="Полезные материалы"
          />
        </Column>

        <Column>
          <DiagnosisHeading>
            можно рекомендовать следующие опции терапии:
          </DiagnosisHeading>

          <CardsList list={therapies()} blueNotifications />

          <InteractionsLinkBtn routePrefix='/srk'  />

          <Foot $align="flex-end">
            <ButtonLink to="/">Закончить прием</ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { Correction };

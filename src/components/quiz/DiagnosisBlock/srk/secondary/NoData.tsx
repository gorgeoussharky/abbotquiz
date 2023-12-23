import { CardsList } from '../../../CardsList';
import { BackLink, ButtonLink, Foot, QuizWrap } from '../../../../elements';
import { DiagnosisCard } from '../../elements';
import { schedule } from '../../../../../data/recommendations';
import { DosageList } from '../../../../DosageList';

interface Props {
  onBack: () => void;
}

const NoData = ({ onBack }: Props) => {
  const repeat = {
    ...schedule,
    title:
      'Рекомендовано проведение лабораторно-диагностических исследований с повторным приемом через 1 месяц',
  };

  const spasm = [
    {
      title: 'Мебеверин',
      dosage: '200 мг 2 раза в день',
    },
    {
      title: 'Гиосцина бутилбромид',
      dosage:
        'Внутрь: 10-20 мг 3-5 раз в день <br> Ректально: 10-20 мг 3-5 раз в день',
    },
    {
      title: 'Пинаверия бромид ',
      dosage: '50-100 мг 2-3 раза в день',
    },
  ];

  const antidiarhea = [
    {
      title: 'Смектит диоктаэдрический',
      dosage: '3 г до 3 раз в день',
    },
    {
      title: 'Лоперамид',
      dosage:
        'Начальная доза 4 мг, далее по 2 мг по потребности. Максимальная суточная дозировка - 12 мг',
    },
  ];

  const laxative = [
    {
      title: 'Лактулоза',
      dosage: '15-40 мл сиропа в сутки',
    },
    {
      title: 'Оболочка семян подорожника овального',
      dosage: '10 г в сутки',
    },
  ];

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <DiagnosisCard>
        <div>
          Учитывая отсутствие результатов лабораторно-диагностических
          исследований, пациенту может быть рекомендована симптоматическая
          терапия, в зависимости от проявлений заболевания
        </div>
      </DiagnosisCard>

      <DosageList title="Спазмолитики:" list={spasm} />

      <DosageList title="Противодиарейные средства:" list={antidiarhea} />

      <DosageList title="Слабительные средства" list={laxative} />

      <CardsList list={[repeat]} />

      <Foot $align="flex-end">
        <ButtonLink $type='light' to="/">Закончить прием</ButtonLink>
      </Foot>
    </QuizWrap>
  );
};

export { NoData };

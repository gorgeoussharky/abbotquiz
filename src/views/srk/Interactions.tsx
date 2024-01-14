import { InteractionsWrap } from '../../components/quiz/InteractionsWrap';
import medicamentsDB from '../../store/srk/data/medicaments.json';
import interactions from '../../store/srk/data/interactionsDb.json';

const SrkInteractions = () => {
  return (
    <InteractionsWrap
      text="Укажите все лекарственные препараты (МНН), которые пациент принимает
      в настоящее время, для проверки межлекарственных взаимодействий с
      препаратами для лечения СРК"
      interactions={interactions}
      medicaments={medicamentsDB}
    />
  );
};

export { SrkInteractions };

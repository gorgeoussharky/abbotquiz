import { InteractionsWrap } from '../../components/quiz/InteractionsWrap';
import medicamentsDB from '../../store/srk/data/medicaments.json'
import interactions from '../../store/srk/data/interactionsDb.json'


const SrkInteractions = () => {
  return <InteractionsWrap interactions={interactions} medicaments={medicamentsDB} />;
};

export { SrkInteractions };

import { InteractionsWrap } from '../../components/quiz/InteractionsWrap';
import medicamentsDB from '../../data/srk/medicaments.json'
import interactions from '../../data/srk/interactionsDb.json'


const SrkInteractions = () => {
  return <InteractionsWrap interactions={interactions} medicaments={medicamentsDB} />;
};

export { SrkInteractions };

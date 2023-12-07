import { InteractionsWrap } from '../components/quiz/InteractionsWrap';
import medicamentsDB from '../data/medicamentsDb.json'
import interactions from '../data/interactionsDb'
import { InteractionDB } from '../types/interfaces';


const Interactions = () => {
  return <InteractionsWrap interactions={interactions as InteractionDB} medicaments={medicamentsDB} />;
};

export { Interactions };

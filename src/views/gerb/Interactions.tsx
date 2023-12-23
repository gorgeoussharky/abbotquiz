import { InteractionsWrap } from '../../components/quiz/InteractionsWrap';
import medicamentsDB from '../../store/herb/data/medicamentsDb.json'
import interactions from '../../store/herb/data/interactionsDb'
import { InteractionDB } from '../../types/interfaces';


const Interactions = () => {
  return <InteractionsWrap interactions={interactions as InteractionDB} medicaments={medicamentsDB} />;
};

export { Interactions };

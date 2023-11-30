import { store } from './store';

export const getQuestions = (examTitle: string) => {
    const selectedExaminations = store.getState().examinations.selected

    const examinationQuestions = selectedExaminations.find(el => el.title === examTitle)?.questions

    if (!examinationQuestions) return []
 
    return examinationQuestions
  } 

export const getAnswer =  (examTitle: string, questionTitle: string) => {
   const selectedExaminations = store.getState().examinations.selected

   const examinationQuestions = selectedExaminations.find(el => el.title === examTitle)?.questions

   if (!examinationQuestions) return 'Не найден вопрос'

   const answer = examinationQuestions.find(el => el.title === questionTitle)?.value

   if (!answer) return 'Не найден ответ'

   return answer.value
 };


 export const hasExamination = (title: string) => {
    const selectedExaminations = store.getState().examinations.selected

    return selectedExaminations.some(el => el.title === title)
 }


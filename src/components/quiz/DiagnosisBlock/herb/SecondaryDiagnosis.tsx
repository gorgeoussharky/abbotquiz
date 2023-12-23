import { useState, useEffect } from 'react';
import { getAnswer, hasExamination } from '../../../../app/helpers';
import { Nerb } from './secondary/Nerb';
import { Barret } from './secondary/Barret';
import { EsophagitisA } from './secondary/EsophagitisA';
import { EsophagitisB } from './secondary/EsophagitisB';
import { EsophagitisC } from './secondary/EsophagitisC';
import { EsophagitisD } from './secondary/EsophagitisD';
import { HypersensitiveEsophagus } from './secondary/HypersensitiveEsophagus';
import { EsophagealMotilityDisorders } from './secondary/EsophagealMotilityDisorders';
import { Ambiguous } from './secondary/Ambiguous';
import { RefluxEsophagitis } from './secondary/RefluxEsophagitis';
import { EsophagealAchalasia } from './secondary/EsophagealAchalasia';
import { Esophagospasm } from './secondary/Esophagospasm';
import { Gpod } from './secondary/Gpod';
import { PJP } from './secondary/PJP';
import { HypercontractileEsophagus } from './secondary/HypercontractileEsophagus';
import { IneffectivePeristalsis } from './secondary/IneffectivePeristalsis';
import { FunctionalHeartburn } from './secondary/FunctionalHeartburn';
import { NoPeristalsis } from './secondary/NoPeristalsis';
import { DystalEsophagospasm } from './secondary/DystalEsophagospasm';

interface Props {
  onBack: () => void;
}

const SecondaryDiagnosis = ({ onBack }: Props) => {
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    
     // Есть рентгеноскопия
     if (hasExamination('Рентгеноскопия пищевода и желудка с сульфатом бария')) {
      //Перебираем варианты ответа
      switch (
        getAnswer(
          'Рентгеноскопия пищевода и желудка с сульфатом бария',
          'Рентгеноскопия пищевода и желудка с сульфатом бария'
        )
      ) {
        case '1':
          setDiagnosis('esophagealAchalasia');
          return;
        case '2':
          setDiagnosis('esophagospasm');
          return;
        case '3':
          setDiagnosis('gpod');
          return;
      }
    }

    console.log(1)

     // Есть манометрия
     if (hasExamination('Манометрия высокого разрешения')) {
      switch (
        getAnswer(
          'Манометрия высокого разрешения',
          'Оценка перистальтической активности'
        )
      ) {
        case 1:
          setDiagnosis('PJP');
          return;
        case 0:
          setDiagnosis('esophagealAchalasia');
          return;
      }

      


      switch (
        getAnswer(
          'Манометрия высокого разрешения',
          'Оценка перистальтической активности (детальная)'
        )
      ) {
        case '1':
          setDiagnosis('noPeristalsis');
          return;
        case '2':
          setDiagnosis('dystalEsophagospasm');
          return;
        case '3':
          setDiagnosis('hypercontractileEsophagus');
          return;
        case '4':
          setDiagnosis('ineffectivePeristalsis');
          return;
        case '5':
          setDiagnosis('ineffectivePeristalsis');
          return;
        case '6':
          setDiagnosis('functionalHeartburn');
          return;
      }
    }

    // Есть pH-импедансометрия
    if (hasExamination('Суточная pH-импедансометрия')) {
      // 1. Проверка по проценту времени

      // Больше 6% - Рефлюкс-эзофагит
      if (
        getAnswer(
          'Суточная pH-импедансометрия',
          'Процент времени, в течение которого pH был <4'
        ) === '>6%'
      ) {
        setDiagnosis('refluxEsophagitis');
        return;
      }

      // 2. Проверка по индексу симптома

      // Индекс симтома больше 50% - гиперсенситивный пищевод
      if (
        getAnswer(
          'Суточная pH-импедансометрия',
          'Индекс симптома (ИС) > 50%?'
        ) === 1
      ) {
        setDiagnosis('hypersensitiveEsophagus');
        return;
      }

      // Индекс симтома меньше 50% - Нарушения моторики пищевода
      if (
        getAnswer(
          'Суточная pH-импедансометрия',
          'Индекс симптома (ИС) > 50%?'
        ) === 0
      ) {
        setDiagnosis('esophagealMotilityDisorders');
        return;
      }

      // 3. Проверка по кол-ву эпизодов рефлюкса

      // Меньше 80 - неоднозначные данные
      if (
        getAnswer(
          'Суточная pH-импедансометрия',
          'Количество эпизодов рефлюкса в течение исследования?'
        ) === '< 80'
      ) {
        setDiagnosis('ambiguous');
        return;
      }

      // Больше 80 - Рефлюкс-эзофагит
      if (
        getAnswer(
          'Суточная pH-импедансометрия',
          'Количество эпизодов рефлюкса в течение исследования?'
        ) === '> 80'
      ) {
        setDiagnosis('refluxEsophagitis');
        return;
      }
    }

      // Есть ЭГДС
    if (hasExamination('ЭГДС')) {
      // Обнаружены признаки пищевода Баррета
      if (getAnswer('ЭГДС', 'Обнаружены признаки пищевода Барретта?') === 1) {
        setDiagnosis('barret');
        return;
      }

      // Не выявлены признаки повреждения слизистой
      if (
        getAnswer(
          'ЭГДС',
          'В ходе ЭГДС выявлены признаки повреждения слизистой оболочки пищевода?'
        ) === 0
      ) {
        setDiagnosis('nerb');
        return;
      }

      // Перебираем варианты ответа на вопрос об участках повреждения
      switch (getAnswer('ЭГДС', 'Участки повреждения слизистой оболочки:')) {
        case 'A':
          setDiagnosis('esophagitisA');
          return;
        case 'B':
          setDiagnosis('esophagitisB');
          return;
        case 'C':
          setDiagnosis('esophagitisC');
          return;
        case 'D':
          setDiagnosis('esophagitisD');
          return;
      }
    }
  }, []);

  switch (diagnosis) {
    case 'barret':
      return <Barret onBack={onBack} />;
    case 'nerb':
      return <Nerb onBack={onBack} />;
    case 'esophagitisA':
      return <EsophagitisA onBack={onBack} />;
    case 'esophagitisB':
      return <EsophagitisB onBack={onBack} />;
    case 'esophagitisC':
      return <EsophagitisC onBack={onBack} />;
    case 'esophagitisD':
      return <EsophagitisD onBack={onBack} />;
    case 'hypersensitiveEsophagus':
      return <HypersensitiveEsophagus onBack={onBack} />;
    case 'esophagealMotilityDisorders':
      return <EsophagealMotilityDisorders onBack={onBack} />;
    case 'ambiguous':
      return <Ambiguous onBack={onBack} />;
    case 'refluxEsophagitis':
      return <RefluxEsophagitis onBack={onBack} />;
    case 'esophagealAchalasia':
      return <EsophagealAchalasia onBack={onBack} />;
    case 'esophagospasm':
      return <Esophagospasm onBack={onBack} />;
    case 'gpod':
      return <Gpod onBack={onBack} />;
    case 'PJP':
      return <PJP onBack={onBack} />;
    case 'noPeristalsis':
      return <NoPeristalsis onBack={onBack} />;
    case 'dystalEsophagospasm':
      return <DystalEsophagospasm onBack={onBack} />;
    case 'hypercontractileEsophagus':
      return <HypercontractileEsophagus onBack={onBack} />;
    case 'ineffectivePeristalsis':
      return <IneffectivePeristalsis onBack={onBack} />;
    case 'functionalHeartburn':
      return <FunctionalHeartburn onBack={onBack} />;
    default:
      return <></>;
  }
};

export { SecondaryDiagnosis };

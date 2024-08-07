import { Text } from '../../../elements';

import kidney from '../../../../assets/img/kidney.png';
import tube from '../../../../assets/img/tube.png';
import bed from '../../../../assets/img/bed.png';
import cross from '../../../../assets/img/cross.png';
import pin from '../../../../assets/img/pin.png';
import drugs from '../../../../assets/img/drugs.png';
import tabletPill from '../../../../assets/img/tabletpill.png';
import kidney2 from '../../../../assets/img/kidney2.png';
import info from '../../../../assets/img/info.png';
import { Tags } from '../../../Tags';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const MarkedTags = styled(Tags)`
  ol {
    counter-reset: numbers;
  }

  li {
    width: 100%;
    counter-increment: numbers;
    display: flex;
    gap: 8px;

    &::before {
      content: counter(numbers) '. ';
    }
  }
`;

const GridTags = styled(Tags)`
  ol {
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  li {
    align-items: center;
  }
`;

const Ingredients = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 16px;
  display: grid;
`;

const Item = styled.li`
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 12px 16px;
`;

const Ingredient = styled.div`
  font-weight: 700;
  font-size: 20px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 12px;
  padding: 12px 16px;
  background: #e6f7ff;
`;

const Notice = styled.div`
  margin: 12px 0;
  padding: 12px 16px;
  border: 1px solid rgba(0, 156, 222, 0.15);
  border-radius: 4px;
  padding: 12px 16px;
`;

export const serologicABCE = {
  icon: tube,
  title:
    'Серологические исследования для исключения острых вирусных гепатитов (А,В,С,Е), определения нуклеиновых кислот вирусов',
  content: () => {
    return (
      <>
        <Tags
          bold
          list={[
            'анти-HAV-IgM',
            'анти-HCV',
            'HCV-РНК',
            'HBsAg',
            'HBV-ДНК',
            'анти-HEV-IgG',
            'HEV-РНК',
          ]}
        ></Tags>

        <Text>Дополнительно можно определить: </Text>

        <Tags bold list={['анти-HDV', 'анти-HEV-IgM']} />
      </>
    );
  },
};

export const serologicAuto = {
  icon: tube,
  title: 'Серологические исследования для исключения аутоиммунного гепатита',
  content: () => {
    return (
      <>
        <Tags
          bold
          list={['Ig G', 'антитела к гладкой мускулатуре (SMA, ASMA)']}
        ></Tags>

        <Text>Дополнительно можно определить: </Text>

        <Tags
          bold
          list={[
            'общий белок и белковые фракции',
            'антинуклеарный фактор',
            'анти-SMA',
            'анти-LKM-1',
            'анти-SLA',
          ]}
        />
      </>
    );
  },
};

export const serologicCirro = {
  icon: tube,
  title:
    'Серологические исследования для исключения первичного билиарного цирроза (холангита)',
  content: () => {
    return (
      <>
        <Tags bold list={['антитела к гладкой мускулатуре (SMA, ASMA)']}></Tags>

        <Text>Дополнительно можно определить: </Text>

        <Tags
          bold
          list={[
            'АМА (антимитохондриальные антитела)',
            'антинуклеарный фактор',
          ]}
        />
      </>
    );
  },
};

export const visualized = {
  icon: kidney,
  title: 'Визуализирующие исследования',
  content: () => {
    return (
      <>
        <Tags bold list={['УЗИ органов брюшной полости']}></Tags>
      </>
    );
  },
};

export const visualizedMultiple = {
  icon: kidney,
  title: 'Визуализирующие исследования',
  content: () => {
    return (
      <>
        <Tags
          hasAnds
          bold
          list={[
            'УЗИ органов брюшной полости',
            'КТ брюшной полости',
            'МРТ брюшной полости',
          ]}
        ></Tags>
      </>
    );
  },
};

export const visualizedMagnet = {
  icon: kidney,
  title: 'Визуализирующие исследования',
  content: () => {
    return (
      <>
        <Tags bold list={['Магнитно-резонансная холангиография']}></Tags>
      </>
    );
  },
};

export const visualizedBiliarInfiltration = {
  icon: kidney,
  title:
    'Визуализирующие исследования для исключения патологии билиарного тракта и инфильтрационных процессов',
  content: () => {
    return (
      <>
        <Tags bold list={['УЗИ брюшной полости']}></Tags>

        <Text>
          В зависимости от конкретных случаев рекомендуется дополнительно:
        </Text>

        <Tags
          bold
          list={['Холангиография (эндоскопическая или магнитно-резонансная)']}
        ></Tags>
      </>
    );
  },
};

export const hospitalizations = {
  icon: bed,
  title: 'Критерии госпитализации',
  content: () => {
    return (
      <>
        <MarkedTags
          list={[
            'Тяжелое ЛПП, с развитием печеночно-клеточной недостаточностью и выраженной клинической симптоматикой (рвота, обезвоживание, кровотечение, признаки печеночной энцефалопатии)',
            'Признаки плохого прогноза течения ЛПП (выполняется закон Хая)',
          ]}
        ></MarkedTags>
      </>
    );
  },
};

export const fda = {
  icon: cross,
  title: 'Критерии FDA по отмене препарата',
  content: () => {
    return (
      <>
        <Text>
          Согласно рекомендациям FDA (2009), показаниями к обязательной отмене
          ЛС считаются:
        </Text>
        <GridTags
          list={[
            'Повышение активности AЛT или AСT > 8 ВПН',
            'Повышение активности AЛT или AСT > 5 ВПН более 2 нед',
            'Повышение активности AЛT или AСT > 3 ВПН и содержание общего билирубина > 2 ВПН или МНО > 1,5',
            'Повышение активности AЛT или AСT > 3 ВПН в сочетании с появлением слабости, тошноты, рвоты, болей или болезненности при пальпации в правом верхнем квадранте живота, лихорадки, сыпи и/или эозинофилии (>5 %)',
          ]}
        ></GridTags>
      </>
    );
  },
};

export const serologicLessKnown = {
  icon: tube,
  title:
    'Серологические исследования для исключения менее распространенных вирусов',
  content: () => {
    return (
      <>
        <Row>
          <div>
            <Text>Цитомегаловирус: </Text>
            <Tags bold list={['анти-CMV-IgM', 'анти-CMV-IgG']} />
          </div>
          <div>
            <Text>Вирус Эпштейна-Баар: </Text>
            <Tags bold list={['анти-EBV-IgM', 'анти-EBV-IgG']} />
          </div>

          <div>
            <Text>Вирус простого герпеса:</Text>
            <Tags bold list={['анти-HSV-IgM', 'анти-HSV-IgG']} />
          </div>

          <div>
            <Text>Дополнительно можно исключить:</Text>
            <Tags bold list={['анти-VZV-IgM', 'анти-VZV-IgG']} />
          </div>
        </Row>
      </>
    );
  },
};

export const wilsons = {
  icon: tube,
  title: 'Болезнь Вильсона',
  content: () => {
    return (
      <Tags
        bold
        list={[
          'Сывороточный церулоплазмин',
          'Суточная экскреция меди',
          'Осмотр офтальмолога',
          'Осмотр невролога',
        ]}
      />
    );
  },
};

export const liverBiopsi = {
  icon: pin,
  title: 'Биопсия печени',
};

export const paracetomolAntidote = {
  icon: tabletPill,
  title: 'Антидот к парацетамолу',
  content: () => {
    return (
    <Ingredients>
      <Item>
        <Ingredient>N-ацетил L-цистеин</Ingredient>

        <Text>
          Пероральный 72-часовой режим: насыщающая (ударная) доза 140 мг/кг,
          далее 70 мг/кг каждые 4 часа (до 72 ч)
        </Text>
      </Item>
    </Ingredients>
    )
  },
};

export const valproatAntidote = {
  icon: tabletPill,
  title: 'Антидот к вальпроату',
  content: () => {
    return (
    <Ingredients>
      <Item>
        <Ingredient> L-карнитин</Ingredient>

        <Text>
          В дозе от 100 мг/кг каждые 6 ч до максимальной дозы, составляющей 3000
          мг/сут
        </Text>
      </Item>
    </Ingredients>
    )
  },
};

export const hepatoprotectors = {
  icon: kidney2,
  title: 'Гепатопротекторы',
  content: () => {
    return (
      <Ingredients>
        <Item>
          <Ingredient>Адеметионин</Ingredient>

          <Text>
            <b>1 этап:</b> 800 мг в сутки внутривенно или внутримышечно в
            течение 2-х недель;
          </Text>
          <Text>
            <b>2 эта</b>п: 800–1600 мг перорально в сутки в течение 4-х недель
            (если используется доза 400 мг в 1-й таблетке) или 1000–1500 мг
            перорально в сутки в течение 4-х недель (если используется доза 500
            мг в 1-й таблетке)
          </Text>

          <Notice>
            На сегодняшний день среди препаратов, используемых для коррекции
            ЛПП, наибольшей доказательной базой обладает адеметионин¹
          </Notice>
          <Notice>
            Адеметионин — естественная аминокислота, способная повышать уровень
            глутатиона в митохондриях и поддерживать их функциональную
            активность, инактивировать CYP2E1, подавлять экспрессию ФНО-α. Всё
            это легло в основу его широкого применения в клинической практике, в
            том числе при ЛПП. Важную роль в этом аспекте играют
            антифибротические, антинейротоксические и антидепрессивные свойства
            Адеметионина²
          </Notice>
        </Item>

        <Item>
          <Ingredient>
            Инозин+Меглюмин+Метионин+Никотинамид+Янтарная кислота
          </Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>

        <Item>
          <Ingredient>Бициклол</Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>

        <Item>
          <Ingredient>Урсодезоксихолевая кислота (УДХК)</Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>

        <Item>
          <Ingredient>Эссенциальные фосфолипиды</Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>
      </Ingredients>
    );
  },
};

export const glukokortikosteroides = {
  icon: drugs,
  title: 'Глюкокортикостероиды ',
  content: () => {
    return (
      <Ingredients>
        <Item>
          <Text style={{ color: 'var(--accent)' }}>
            Если необходима дифференциация истинного лекарственно-идуцированного
            аутоиммунного гепатита от ЛПП
          </Text>
          <Ingredient>Преднизолон</Ingredient>

          <Notice>
            20–40 мг в день с последующим постепенным снижением дозы после
            нормализации биохимических показателей в течение 6 мес
          </Notice>
          <Notice>
            Аутоиммуноподобное ЛПП после отмены ГКС не возобновляется в отличие
            от истинного
          </Notice>
        </Item>

        <Item>
          <Ingredient>
            Инозин+Меглюмин+Метионин+Никотинамид+Янтарная кислота
          </Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>

        <Item>
          <Ingredient>Бициклол</Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>

        <Item>
          <Ingredient>Урсодезоксихолевая кислота (УДХК)</Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>

        <Item>
          <Ingredient>Эссенциальные фосфолипиды</Ingredient>

          <Text>
            Режим применения и доза лекарственного препарата подбирается лечащим
            врачом индивидуально, в зависимости от повреждающего агента
          </Text>
        </Item>
      </Ingredients>
    );
  },
};

export const lppRiskMinimizationMem = {
  icon: info,
  title: 'Памятка для минимизации риска повторения ЛПП ',
  content: () => {
    return (
      <GridTags
        list={[
          'Сделать в истории болезни пациента запись с указанием подозреваемого или причинного ЛС',
          'Выдать пациенту медицинский документ (памятку) с описанием побочной реакции и указанием этиологического фактора/ЛС',
        ]}
      ></GridTags>
    );
  },
};

export const patientMem = {
  icon: info,
  title: 'Памятка для пациента',
  content: () => {
    return (
      <GridTags
        list={[
          'Избегать самостоятельного приема ЛС, вызвавшего ЛПП, а также других препаратов данной фармакологической группы',
          'При посещении других специалистов здравоохранения иметь при себе заключение/медицинский документ в котором указан препарат, вызвавший эпизод ЛПП',
        ]}
      ></GridTags>
    );
  },
};

import { Text } from '../../../../elements';

import kidney from '../../../../../assets/img/kidney.png';
import tube from '../../../../../assets/img/tube.png';
import bed from '../../../../../assets/img/bed.png';
import cross from '../../../../../assets/img/cross.png';
import pin from '../../../../../assets/img/pin.png';
import { Tags } from '../../../../Tags';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  gap: 8px;
`

export const serologicABCE = {
  icon: tube,
  title:
    'Серологические исследования для исключения острых вирусных гепатитов (А,В,С,Е), определения нуклеиновых кислот вирусов',
  content: () => {
    return (
      <>
        <Tags bold
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
        <Tags bold
          list={['Ig G', 'антитела к гладкой мускулатуре (SMA, ASMA)']}
        ></Tags>

        <Text>Дополнительно можно определить: </Text>

        <Tags bold
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
  title: 'Серологические исследования для исключения аутоиммунного гепатита',
  content: () => {
    return (
      <>
        <Tags bold
          list={['антитела к гладкой мускулатуре (SMA, ASMA)']}
        ></Tags>

        <Text>Дополнительно можно определить: </Text>

        <Tags bold
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
        <Tags hasAnds bold list={['УЗИ органов брюшной полости', 'КТ брюшной полости', 'МРТ брюшной полости']}></Tags>
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
`

export const fda = {
  icon: cross,
  title: 'Критерии FDA по отмене препарата',
  content: () => {
    return (
      <>
        <Text>
          Согласно рекомендациям FDA (2009), показаниями к обязательной отмене ЛС считаются:
        </Text>
        <GridTags
          list={[
            'Повышение активности AЛT или AСT > 8 ВПН',
            'Повышение активности AЛT или AСT > 5 ВПН более 2 нед',
            'Повышение активности AЛT или AСT > 3 ВПН и содержание общего билирубина > 2 ВПН или МНО > 1,5',
            'Повышение активности AЛT или AСT > 3 ВПН в сочетании с появлением слабости, тошноты, рвоты, болей или болезненности при пальпации в правом верхнем квадранте живота, лихорадки, сыпи и/или эозинофилии (>5 %)'
          ]}
        ></GridTags>
      </>
    );
  },
}

export const serologicLessKnown = {
  icon: tube,
  title: 'Серологические исследования для исключения менее распространенных вирусов',
  content: () => {
    return (
      <>
        <Row>
          <div>
            <Text>Цитомегаловирус: </Text>
            <Tags bold
              list={[
                'анти-CMV-IgM',
                'анти-CMV-IgG',
              ]}
            />
          </div>
          <div>
            <Text>Вирус Эпштейна-Баар: </Text>
            <Tags bold
              list={[
                'анти-EBV-IgM',
                'анти-EBV-IgG',
              ]}
            />
          </div>

          <div>
            <Text>Вирус простого герпеса:</Text>
            <Tags bold
              list={[
                'анти-HSV-IgM',
                'анти-HSV-IgG',
              ]}
            />
          </div>

          <div>
            <Text>Дополнительно можно исключить:</Text>
            <Tags bold
              list={[
                'анти-VZV-IgM',
                'анти-VZV-IgG',
              ]}
            />
          </div>
        </Row>
      </>
    );
  },
}

export const wilsons = {
  icon: tube,
  title: 'Болезнь Вильсона',
  content: () => {
    return (
      <Tags bold
        list={[
          'Сывороточный церулоплазмин',
          'Суточная экскреция меди',
          'Осмотр офтальмолога',
          'Осмотр невролога'
        ]}
      />
    )
  }
}

export const liverBiopsi = {
  icon: pin,
  title: 'Биопсия печени',
}

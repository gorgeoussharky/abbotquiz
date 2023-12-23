import { MouseEvent, useState } from 'react';
import { Modal } from '../Modal';
import styled from 'styled-components';

import type1 from '../../assets/img/bsfk/1.png';
import type2 from '../../assets/img/bsfk/2.png';
import type3 from '../../assets/img/bsfk/3.png';
import type4 from '../../assets/img/bsfk/4.png';
import type5 from '../../assets/img/bsfk/5.png';
import type6 from '../../assets/img/bsfk/6.png';
import type7 from '../../assets/img/bsfk/7.png';

const Toggler = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent);
  font-size: 20px;
  text-decoration: underline;
  margin-top: 24px;
  width: fit-content;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const types = [
  {
    title: '<b>Тип 1.</b> Отдельные твердые комки, как орехи',
    img: type1,
  },
  {
    title: '<b>Тип 2.</b> В форме колбаски, комковатый',
    img: type2,
  },
  {
    title: '<b>Тип 3.</b> В форме колбаски, с ребристой поверхностью',
    img: type3,
  },
  {
    title: '<b>Тип 4.</b> В форме колбаски или змеи, гладкий и мягкий',
    img: type4,
  },
  {
    title: '<b>Тип 5.</b> Мягкие маленькие шарики с ровными краями',
    img: type5,
  },
  {
    title: '<b>Тип 6.</b> Рыхлые частицы с неровными краями, кашеобразный стул',
    img: type6,
  },
  {
    title: '<b>Тип 7.</b> Водянистый, без твердых частиц',
    img: type7,
  },
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableCell = styled.td`
  font-size: 20px;
  border: 1px solid var(--accent);
  padding: 8px 12px;
  vertical-align: middle;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 8px;
  }
`;

const BSFKModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = (e: MouseEvent) => {
    e.stopPropagation()

    setShowModal(!showModal)
  }

  return (
    <>
      <Toggler onClick={handleToggleModal}>
        Бристольская шкала форм кала
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="20"
          viewBox="0 0 30 20"
          fill="none"
        >
          <path
            d="M30 5.73913L22.6222 0V3.30435C8 4.13043 8 20 8 20C10.8889 8.69565 18.0444 8 22.6222 7.95652V11.4783L30 5.73913Z"
            fill="#009CDE"
          />
          <path
            d="M12.3226 2H3C1.89543 2 1 2.89543 1 4V16C1 17.1046 1.89543 18 3 18H25C26.1046 18 27 17.1046 27 16V12"
            stroke="#009CDE"
          />
        </svg>
      </Toggler>

      <Modal
        show={showModal}
        title="Бристольская шкала форм кала"
        onClose={() => setShowModal(false)}
      >
        <>
          <Table>
            <tbody>
              {types.map((el) => (
                <tr key={el.title}>
                  <TableCell style={{ textAlign: 'center' }}>
                    <img src={el.img} alt={el.title} />
                  </TableCell>
                  <TableCell>
                    <div dangerouslySetInnerHTML={{ __html: el.title }}></div>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      </Modal>
    </>
  );
};

export { BSFKModal };

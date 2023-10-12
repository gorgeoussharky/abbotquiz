import img from '../../assets/img/consult-banner.jpg'
import './ConsultBanner.scss'

const ConsultBanner = () => {
  return (
    <section className="consult-banner">
      <img
        className="consult-banner__img"
        src={img}
        alt="Цифровой консультант врача"
      />
      <div className="consult-banner__container">
        <div className="consult-banner__content">
          <div className="consult-banner__content__title">
            Цифровой консультант врача
          </div>
          <div className="consult-banner__content__desc">
            Индивидуальные решения по ведению пациента на основе клинических
            рекомендаций, стандартов и международных баз знаний
          </div>
        </div>
      </div>
    </section>
  );
};

export { ConsultBanner }

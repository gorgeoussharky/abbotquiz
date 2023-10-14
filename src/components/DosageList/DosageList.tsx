import './DosageList.scss'

interface Props {
    list: {
        title: string;
        dosage: string;   
    }[]
}

const DosageList = ({list}: Props) => {
    return (
        <div className="quiz-block__dosage-list">
        <ul className="dosage-list__list">
          {list.map((item) => (
            <li className="dosage-list__item">
              {item.title}
              <span>{item.dosage}</span>
            </li>
          ))}
        </ul>
      </div>
    )
}

export { DosageList }
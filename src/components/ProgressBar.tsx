import styled from "styled-components"

interface Props {
    step: number
    totalSteps: number
    title: string
}

const Wrap = styled.div`
     display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        margin-bottom: 24px;
    }
`

const Title = styled.div`
    color: #009cde;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    width: calc(100% - 50px);
`

const Percent = styled.div`
     color: #009cde;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 125%;
    width: 50px;
    text-align: right;
`

const Progress= styled.div`
      width: 100%;
    margin-top: 10px;
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 12px;
    background: #d9d9d9;

    span {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      background: #009cde;
      transition: all 0.4s;
    }
`

const ProgressBar = ({step, totalSteps, title}: Props) => {
    const progress = () => {
        return `${Math.round((step / totalSteps) * 100)}%`;
      };
    

    return (
        <Wrap>
          <Title>{title}</Title>
          <Percent>{progress()}</Percent>
          <Progress>
            <span style={{ width: progress() }}></span>
          </Progress>
        </Wrap>
    )
}

export { ProgressBar }
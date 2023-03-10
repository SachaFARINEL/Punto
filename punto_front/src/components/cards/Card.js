import './styles/cardStyle.css'
import CardColumn from './CardColumn'
import {puntoColor} from "../../ressources/puntoColor";

export default function Card({num, color}) {
    num = 9
    color = 'green';
    color = puntoColor[color]
    const intToStringNumber = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
    const diceSchema = {
        fourth: [2, 2],
        fifth: [2, 1, 2],
        sixth: [3, 3],
        seventh: [3, 1, 3],
        eighth: [3, 2, 3],
        ninth: [3, 3, 3],
    }
    const diceElement = [];
    const schema = diceSchema[intToStringNumber[num - 1]]
    if (schema) {
        for (let i = 0; i < schema.length; i++) {
            diceElement.push(<CardColumn nbrDot={schema[i]} color={color}/>)
        }
    } else {
        for (let i = 0; i < num; i++) {
            diceElement.push(<span style={{backgroundColor: color}} className="dot"></span>)
        }
    }

    return (
        <div className={`dice ${intToStringNumber[num - 1]}-face`}>{diceElement}</div>
    )
}
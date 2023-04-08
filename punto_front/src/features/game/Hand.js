import Card from "./cards/Card";
import BackCard from "./cards/BackCard";
import styled from "styled-components";
import {useGameContext} from "./GameProvider";

const Center = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    `
const CardLocation = styled.div`
      width: 3rem;
      height: 3rem;
    `

const Hand = () => {
    const {cardInHand} = useGameContext()
    console.log(cardInHand)
    const num = cardInHand?.number
    const color = cardInHand?.color
    return (
        <Center>
            <CardLocation>
                <BackCard/>
            </CardLocation>
            <CardLocation>
                {color && num && <Card num={cardInHand?.number} color={cardInHand?.color} isDraggable={true} />}
            </CardLocation>
        </Center>
    )
}
export default Hand;
import Card from "./cards/Card";
import BackCard from "./cards/BackCard";
import {useShuffleAndDistributeQuery} from "./cards/cardsApiSlice";
import styled from "styled-components";
import {useState} from "react";

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
    const {data, isError} = useShuffleAndDistributeQuery(2);
    const [deck, setDeck] = useState(data && data.firstDeck)
    const [cardInHand, setCardInHand] = useState(deck)
    console.log(data && data.firstDeck)

    console.log(cardInHand)



    return (
        <Center>
            <CardLocation>
                <BackCard/>
            </CardLocation>
            <CardLocation>
                <Card num={5} color={'green'} isDraggable={true}/>
            </CardLocation>
        </Center>
    )
}
export default Hand;
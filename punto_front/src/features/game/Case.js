import {useDrop} from "react-dnd";
import {dragTypes} from "../../ressources/Constants";
import styled from "styled-components";
import {useGameContext} from "./GameProvider";

const ACase = styled.div`
  width: 3rem;
  height: 3rem;
  border: 1px solid white;
  position: relative;
  padding: 2px;
`
export default function Case({x, y, updateGrid, children}) {
    const {updateHand} = useGameContext();

    const [{isOver, canDrop}, drop] = useDrop(() => ({
            accept: dragTypes.CARD,
            drop: (card) => {
                console.log("Dropped card:", card.num, card.color);
                updateGrid(x, y, card)
                updateHand()
            },
            collect: monitor => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop()
            })
        }),
        [x, y]
    )

    return (
        <ACase ref={drop}>
            {children}
        </ACase>
    )
}
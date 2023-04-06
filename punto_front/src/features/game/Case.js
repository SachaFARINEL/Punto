import {useDrop} from "react-dnd";
import {puntoColor, dragTypes} from "../../ressources/Constants";
import styled from "styled-components";

const ACase = styled.div`
  width: 4rem;
  height: 4rem;
  border: 2px solid white;
  position: relative;
  padding: 2px;
`
export default function Case({x, y, game, updateBoard, children}) {
    const [{isOver, canDrop}, drop] = useDrop(() => ({
            accept: dragTypes.CARD,
            drop: (card) => {
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
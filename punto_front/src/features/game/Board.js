import Case from "./Case"
import {boardLength} from "../../ressources/Constants";
import styled from "styled-components";
import {useState} from "react";
import Card from "./cards/Card";
import {useGameContext} from "./GameProvider";

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const Grid = styled.div`
  margin-top: 2rem;
`

export default function Board({}) {
    const {grid} = useGameContext()


    const filterByY = (y) => {
        return grid.filter(square => square.position.y === y);
    }

    const rows = [];
    for (let i = 0; i < 11; i++) {
        rows.push(
            <Row className="row" key={i}>
                {filterByY(i).map(square => (
                    <div
                        key={`${square.position.x}-${square.position.y}`}
                    >
                        <Case x={square.position.x} y={square.position.y}>
                            {square.card && <Card color={square.card.color} num={square.card.num}/>}
                        </Case>
                    </div>
                ))}
            </Row>
        );
    }

    return (
        <Grid>
            {rows}
        </Grid>
    )
}
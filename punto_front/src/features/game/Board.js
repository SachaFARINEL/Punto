import Case from "./Case"
import {boardLength} from "../../ressources/Constants";
import styled from "styled-components";
import {useState} from "react";
import Card from "./cards/Card";

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const Grid = styled.div`
  margin-top: 4rem;
`
export default function Board({}) {
    const grid = []
    for (let i = 0; i < boardLength.rows; i++) {
        for (let j = 0; j < boardLength.columns; j++) {
            grid.push(({x: i, y: j}));
        }
    }

    function filterByY(y) {
        return grid.filter(square => square.y === y);
    }

    const rows = [];
    for (let i = 0; i < 11; i++) {
        rows.push(
            <Row className="row" key={i}>
                {filterByY(i).map(square => (
                    <div
                        key={`${square.x}-${square.y}`}
                    >
                        <Case x={square.x} y={square.y}/>
                    </div>
                ))}
            </Row>
        );
    }

    return (
        <>
            <Grid>
                {rows}
            </Grid>
        </>
    )
}
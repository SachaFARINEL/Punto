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
  margin-top: 2rem;
`
const createGridArray = () => {
    const grid = []
    for (let i = 0; i < boardLength.rows; i++) {
        for (let j = 0; j < boardLength.columns; j++) {
            grid.push(({'position': {x: i, y: j}}));
        }
    }
    return grid
}


export default function Board({}) {
    const [grid, setGrid] = useState(createGridArray())
    const updateGrid = (x, y, card) => {
        setGrid(grid =>
            grid.map(square =>
                square.position.x === x && square.position.y === y
                    ? Object.assign({}, square, {card})
                    : square
            )
        );

    };

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
                        <Case x={square.position.x} y={square.position.y} updateGrid={updateGrid}>
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
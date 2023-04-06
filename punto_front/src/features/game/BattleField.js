import LobbyHeader from "../../components/lobby/LobbyHeader";
import Board from "./Board";
import Card from "./cards/Card";
import BackCard from "./cards/BackCard";

const BattleField = () => {

    return (
        <>
        <LobbyHeader/>

    <Board/>
    <div style={{
        display: 'flex',
        gap: "1rem"
    }}>
        <div style={{
            width: '4rem',
            height: '4rem',

        }}>
            <Card num={5} color={'green'}/>
        </div>
        <div style={{
            width: '4rem',
            height: '4rem',
        }}>
            <Card num={9} color={'red'}/>

        </div>
        <div style={{
            width: '4rem',
            height: '4rem',

        }}>
            <BackCard/>

        </div>

    </div>
        </>
    )
}
export default BattleField;
import LobbyHeader from "../../components/lobby/LobbyHeader";
import Board from "./Board";
import Hand from "./Hand";
import {GameProvider} from "./GameProvider";

const BattleField = () => {

    return (
        <>
            <GameProvider>
                <LobbyHeader/>
                <Board/>
                <Hand/>
            </GameProvider>
        </>
    )
}
export default BattleField;
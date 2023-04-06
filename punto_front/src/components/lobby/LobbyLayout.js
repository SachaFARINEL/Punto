import LobbyHeader from "./LobbyHeader";
import {Outlet} from "@mui/icons-material";
import Card from "../../features/game/cards/Card";
import Case from "../../features/game/Case";
import Board from "../../features/game/Board";

const LobbyLayout = () => {
    return (
        <>
            <LobbyHeader/>
            <Board/>
            <Card num={5} color={'green'}/>
        </>
    )
}

export default LobbyLayout;
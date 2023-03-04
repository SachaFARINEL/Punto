import LobbyHeader from "./LobbyHeader";
import {Outlet} from "@mui/icons-material";

const LobbyLayout = () => {
    return (
        <>
            <LobbyHeader/>
            <Outlet/>
        </>
    )
}

export default LobbyLayout;
import {Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout";
import Public from "./components/Public";
import NewUserForm from "./features/users/NewUserForm";
import Login from './features/auth/Login'
import Prefetch from "./features/auth/Prefetch";
import LobbyLayout from './components/lobby/LobbyLayout'
import BattleField from './features/game/BattleField'
import PersistLogin from "./features/auth/PersistLogin";
import GlobalDndContext from "./ressources/GlobalDndContext";

function App() {
    return (
        <Routes>

            <Route path="/">

                {/* Public routes */}
                <Route index element={<Public/>}/>
                <Route element={<Layout/>}>
                    <Route path="signup" element={<NewUserForm/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>

                {/* Protected routes */}
                <Route element={<PersistLogin/>}>
                    <Route element={<Prefetch/>}>
                        <Route path="lobby" element={<LobbyLayout/>}/>
                        <Route path="battlefield" element={<GlobalDndContext><BattleField/></GlobalDndContext>}/>
                    </Route>
                </Route>
            </Route>

        </Routes>
    )
}

export default App;

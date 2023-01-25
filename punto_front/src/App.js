import {Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout";
import Public from "./components/Public";
import NewUserForm from "./features/users/NewUserForm";
import EditUserForm from "./features/users/EditUserForm";
import Prefetch from "./features/auth/Prefetch";

function App() {
    return (
        <Routes>

            <Route path="/">
                <Route index element={<Public/>}/>
                <Route element={<Layout/>}>
                    <Route path="signup" element={<NewUserForm/>}/>
                    <Route path="test" element={<EditUserForm/>}/>
                </Route>
                <Route path="start">

                </Route>

            </Route>
        </Routes>
    )
}

export default App;

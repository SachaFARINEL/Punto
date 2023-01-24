import {Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout";
import Public from "./components/Public";
import NewUserForm from "./features/users/NewUserForm";

function App() {
    return (
        <Routes>

            <Route path="/">
                <Route index element={<Public/>}/>
                <Route path="/" element={<Layout/>}>
                    <Route path="signup" element={<NewUserForm/>}/>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;

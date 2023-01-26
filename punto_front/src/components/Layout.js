import Punto from './Punto'
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Punto/>

            <Outlet/>
        </>
    )
}

export default Layout;
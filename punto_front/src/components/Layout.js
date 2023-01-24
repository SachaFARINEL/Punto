import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <h1 className="layout__punto">
                <span className="title__red">P</span>
                <span className="title__blue">u</span>
                <span className="title__yellow">n</span>
                <span className="title__green">t</span>
                <span className="title__red">o</span>
            </h1>

            <Outlet/>
        </>
    )
}

export default Layout;
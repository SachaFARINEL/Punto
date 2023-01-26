import Punto from './Punto'
import {Link} from 'react-router-dom'

const Public = () => {

    return (<div className="div_title">
        <div className="div_punto__main">
            <h3 className="subtitle_punto">Welcome to</h3>
            <Punto/>
            <h3 className="subtitle_punto__small">(One of the most fun games in the world, I promise)</h3>
        </div>
        <div className="div_punto__sub">
            <Link to="/signup"><h1 className="title_sub signup">Sign up</h1></Link>
            <Link to="/login"><h1 className="title_sub">Log in</h1></Link>
        </div>
    </div>)
};

export default Public;

import Punto from './Punto'
import {Link} from 'react-router-dom'
import styled from 'styled-components';

const DivCenter = styled.div`
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: 100vh;
      align-items: center;
      justify-content: center;
    `
const Welcome = styled.h2`
      font-size: 2rem;
    `
const Subtitle = styled.h3`
      font-size: 1rem;
    `
const LinkTo = styled.div`
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-top: 5rem;
    `
const SignUp = styled.h1`
      border: 0.2rem solid white;
      border-radius: 1rem;
      padding: 1rem;

      &:hover {
        border: 0.2rem double #ACAAAAE5;
      }
    `
const Public = () => {
    return (
        <DivCenter>
            <Welcome>Welcome to</Welcome>
            <Punto size='8rem'/>
            <Subtitle>(One of the most fun games in the world, I promise)</Subtitle>

            <LinkTo>
                <Link to="/signup"><SignUp>Sign up</SignUp></Link>
                <Link to="/login"><h1>Log in</h1></Link>
            </LinkTo>
        </DivCenter>
    )
};

export default Public;

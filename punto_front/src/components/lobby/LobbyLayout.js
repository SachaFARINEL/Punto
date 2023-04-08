import LobbyHeader from "./LobbyHeader";
import {Link} from "react-router-dom";
import styled from "styled-components";

const LinkTo = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
`

const Game = styled.h1`
  border: 0.2rem solid white;
  border-radius: 1rem;
  padding: 1rem;

  &:hover {
    border: 0.2rem double #ACAAAAE5;
  }
`

const LobbyLayout = () => {
    return (
        <>
            <LobbyHeader/>
            <LinkTo>
                <Link to={'/battlefield'}><Game>Start a game</Game></Link>
            </LinkTo>

        </>
    )
}

export default LobbyLayout;
import Header from "../Header";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useNavigate, Link} from "react-router-dom";
//import {useLocation} from "react-router-dom";
import {useSendLogoutMutation} from "../../features/auth/authApiSlice";
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Button = styled.button`
  border: 2.5px solid white;
  border-radius: 1rem;
  padding: 0.5rem;
  background: black;
  color: white;
  width: 10rem;
  margin: auto;

  &:hover {
    cursor: pointer;
    border: 2.5px solid #ACAAAAE5;
    color: #ACAAAAE5;
  }
`
const LobbyHeader = () => {
    const navigate = useNavigate()
    //const {pathname} = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onLogoutClicked = () => sendLogout()

    if (isLoading) return <p>Logging Out ...</p>

    if (isError) return <p>Error: {error.message}</p>

    return (
        <>
            <Div>

                <Header/>

                <Button
                    title="Logout"
                    onClick={onLogoutClicked}>
                    Log Out <FontAwesomeIcon icon={faRightFromBracket}/>
                </Button>
            </Div>
        </>
    )
}

export default LobbyHeader;
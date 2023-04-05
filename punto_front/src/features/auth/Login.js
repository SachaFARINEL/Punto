import {useRef, useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setCredentials} from './authSlice'
import {useLoginMutation} from './authApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackward} from "@fortawesome/free-solid-svg-icons";
import {puntoColor} from "../../ressources/puntoColor";
import usePersist from "../../hooks/usePersist";

const Icon = styled.div`
  margin-left: 5rem;
  font-size: 2rem;
`
const Title = styled.h1`
  text-align: center;
  margin-top: 2rem;
`
const Form = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  align-items: center;
  justify-content: center;
`
const DivNewUserForm = styled.div`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  background: #ACAAAAE5;
  width: 20rem;
  height: 2rem;
  border: 2.5px solid darkgray;
  border-radius: 10px;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem;

  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  border: 2.5px solid white;
  border-radius: 1rem;
  padding: 1rem;
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
const Error = styled.p`
  color: ${puntoColor.red};
  font-size: 1.5rem
`

const Trust = styled.label`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`

const Login = () => {
    const emailRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, {isLoading}] = useLoginMutation()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {accessToken} = await login({email, password}).unwrap()
            dispatch(setCredentials({accessToken}))
            setEmail('')
            setPassword('')
            navigate('/lobby')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    if (isLoading) return <PulseLoader color={"#FFF"}/>

    const content = (
        <div>
            <Icon>
                <Link to={'/'}>
                    <FontAwesomeIcon icon={faBackward}/>
                </Link>
            </Icon>

            <Title>Start the adventure</Title>

            <Form>
                <Error aria-live="assertive">{errMsg}</Error>

                <form className="form" onSubmit={handleSubmit}>

                    <DivNewUserForm>
                        <label htmlFor="email">Email:</label>
                        <Input
                            type="text"
                            id="email"
                            ref={emailRef}
                            value={email}
                            onChange={handleEmailInput}
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <Input
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />

                        <Button>Sign In</Button>

                        <Trust htmlFor="persist">
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            Trust this device
                        </Trust>
                    </DivNewUserForm>
                </form>
            </Form>
        </div>
    )

    return content
}
export default Login
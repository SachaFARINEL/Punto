import {useState, useEffect} from "react"
import {useAddNewUserMutation} from "./usersApiSlice"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave} from "@fortawesome/free-solid-svg-icons"
import styled from 'styled-components';
import {faBackward} from "@fortawesome/free-solid-svg-icons"
import {Link} from 'react-router-dom'
import {puntoColor} from "../../ressources/Constants";
import {useLoginMutation} from "../auth/authApiSlice";
import {setCredentials} from "../auth/authSlice";
import {useDispatch} from "react-redux";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^.{4,}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const BIRTHDAY_REGEX = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/

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
  border: 2.5px solid ${props => props.borderColor};
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
const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [validPasswordConfirmation, setValidPasswordConfirmation] = useState(false)
    const [birthday, setBirthday] = useState('')
    const [validBirthday, setValidBirthday] = useState(false)
    const [login] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidPasswordConfirmation(password === passwordConfirmation)
    }, [password, passwordConfirmation])

    useEffect(() => {
        setValidBirthday(BIRTHDAY_REGEX.test(birthday))
    }, [birthday])

    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setUsername('')
            setPassword('')
            setBirthday('')
        }
    }, [isSuccess])

    const onEmailChanged = e => setEmail(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onPasswordConfirmationChanged = e => setPasswordConfirmation(e.target.value)
    const onBirthdayChanged = e => setBirthday(e.target.value)

    const canSave = [validEmail, validUsername, validPassword, validPasswordConfirmation, validBirthday].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({email, username, password, birthday})
            const {accessToken} = await login({email, password}).unwrap()
            console.log(accessToken)
            dispatch(setCredentials({accessToken}))
            navigate('/lobby')
        }
    }

    const content = (
        <div>
            <Icon>
                <Link to={'/'}>
                    <FontAwesomeIcon icon={faBackward}/>
                </Link>
            </Icon>

            <Title>Sign up for the adventure</Title>

            <Form>
                <Error>{error?.data?.message}</Error>

                <form className="form" onSubmit={onSaveUserClicked}>

                    <DivNewUserForm>

                        <label className="form__label" htmlFor="email">
                            Email: <span className="nowrap"></span></label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChanged}
                            borderColor={validEmail ? puntoColor.green : puntoColor.red}
                        />

                        <label className="form__label" htmlFor="username">
                            Username: <span className="nowrap">[3-20 letters]</span></label>
                        <Input
                            className={`form__input`}
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={onUsernameChanged}
                            borderColor={validUsername ? puntoColor.green : puntoColor.red}
                        />

                        <label className="form__label" htmlFor="password">
                            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                            borderColor={validPassword ? puntoColor.green : puntoColor.red}
                        />

                        <label className="form__label" htmlFor="passwordConfirmation">
                            Password confirmation:
                        </label>
                        <Input
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={onPasswordConfirmationChanged}
                            borderColor={validPasswordConfirmation && passwordConfirmation.length !== 0 ? puntoColor.green : puntoColor.red}
                        />

                        <label className="form__label" htmlFor="birthday">
                            Birthday: <span className="nowrap">[JJ/MM/AAAA]</span></label>
                        <Input
                            className={`form__input`}
                            id="birthday"
                            name="birthday"
                            type="text"
                            value={birthday}
                            onChange={onBirthdayChanged}
                            borderColor={validBirthday ? puntoColor.green : puntoColor.red}
                        />

                        <Button
                            title="Save"
                            disabled={!canSave}
                            style={{visibility: canSave ? 'visible' : 'hidden'}}
                        >
                            Sign In <FontAwesomeIcon icon={faSave}/>
                        </Button>

                    </DivNewUserForm>
                </form>
            </Form>
        </div>
    )

    return content
}
export default NewUserForm
import {useState, useEffect} from "react"
import {useAddNewUserMutation} from "./usersApiSlice"
import {Link, useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave} from "@fortawesome/free-solid-svg-icons"
import {Button, TextField} from "@mui/material";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

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
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [birthday, setBirthday] = useState('')

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setEmail('')
            setUsername('')
            setPassword('')
            setBirthday('')
            navigate('/start')
        }
    }, [isSuccess, navigate])

    const onEmailChanged = e => setEmail(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onBirthdayChanged = e => setBirthday(e.target.value)

    const canSave = [validEmail, username, validPassword, birthday].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({email, username, password, birthday})
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    const content = (
        <>
            <FontAwesomeIcon icon="fa-regular fa-backward"/>

            <div className="form__user">
                <p className={errClass}>{error?.data?.message}</p>

                <form className="form" onSubmit={onSaveUserClicked}>
                    <div className="form__title-row">
                        <h1>Entering the adventure</h1>
                    </div>

                    <label className="form__label" htmlFor="email">
                        Email: <span className="nowrap"></span></label>
                    <input
                        className={`form__input ${validEmailClass}`}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        value={email}
                        onChange={onEmailChanged}
                    />

                    <label className="form__label" htmlFor="username">
                        Username: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        className={`form__input`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />

                    <label className="form__label" htmlFor="password">
                        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input
                        className={`form__input ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />

                    <label className="form__label" htmlFor="birthday">
                        Birthday: <span className="nowrap">[JJ/MM/AAAA]</span></label>
                    <input
                        className={`form__input`}
                        id="birthday"
                        name="birthday"
                        type="text"
                        value={birthday}
                        onChange={onBirthdayChanged}
                    />


                        <button
                            title="Save"
                            className="btn_form_user"
                            disabled={!canSave}
                            style={{
                                width: '100%',fontSize: '1.5rem',
                                border: '0.2rem solid white', borderRadius: '1rem', padding: '0.5rem', marginTop: '2rem'
                            }}
                        >
                            Validate <FontAwesomeIcon icon={faSave}/><FontAwesomeIcon icon="fa-solid fa-floppy-disk" /><FontAwesomeIcon icon="fa-solid fa-floppy-disk-circle-xmark" />
                        </button>


                </form>
            </div>
        </>
    )

    return content
}
export default NewUserForm
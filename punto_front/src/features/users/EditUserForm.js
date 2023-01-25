import {useState, useEffect} from "react"
import {useUpdateUserMutation, useDeleteUserMutation} from "./usersApiSlice"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons"

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({user}) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [birthday, setBirthday] = useState('')
    //const [active, setActive] = useState(user.active)

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

    }, [isSuccess, isDelSuccess, navigate])

    const onEmailChanged = e => setEmail(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onBirthdayChanged = e => setBirthday(e.target.value)
    //const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({id: user.id, email, username, password, birthday})
        } else {
            await updateUser({id: user.id, email, username, birthday})
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({id: user.id})
    }

    let canSave

    if (password) {
        canSave = [validEmail, username, validPassword, birthday].every(Boolean) && !isLoading
    } else {
        canSave = [validEmail, username, birthday].every(Boolean) && !isLoading
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validEmailClass = !validEmail ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave}/>
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                        </button>
                    </div>
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


            </form>
        </>
    )

    return content
}
export default EditUserForm
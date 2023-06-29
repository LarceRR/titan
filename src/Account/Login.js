
import Logo from '../Logo';
import Session from './Session';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MainContext from '../cntxt';
import ThemeToggler from '../ThemeToggler'

export default function Login(props) {
    const { LoggedStateChanger } = useContext(MainContext)
    const {changeRegisterMode} = props
    const [inputsHighlight, setInputsHighlight] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState()
    const [lastSessions, setLastSessions] = useState([])

    const [inputsState, setInputsState] = useState({
        login: '',
        pass: ''
    })

    function loginIn() {
        LoggedStateChanger(true)
    }

    useEffect(() => {
        const lastSessionsArray = []
        var lastSessionsStorage = JSON.parse(localStorage.getItem('lastSessions'))
        if (lastSessionsStorage) {
            for (let i = 0; i < lastSessionsStorage.sessions.length; i++) {
                var parsedSessions = JSON.parse(lastSessionsStorage.sessions[i])
                lastSessionsArray.push(<Session username={parsedSessions.login} userfullname={parsedSessions.nsm} role_id={parsedSessions.perm} reloadLastSessions={reloadLastSessions} setInput={setInputsState}/>)
            }
            setLastSessions(lastSessionsArray)
        }
    }, [])

    const reloadLastSessions = () => {
        const lastSessionsArray = []
        var lastSessionsStorage = JSON.parse(localStorage.getItem('lastSessions'))
        if (lastSessionsStorage) {
            for (let i = 0; i < lastSessionsStorage.sessions.length; i++) {
                var parsedSessions = JSON.parse(lastSessionsStorage.sessions[i])
                lastSessionsArray.push(<Session username={parsedSessions.login} userfullname={parsedSessions.nsm} role_id={parsedSessions.perm} reloadLastSessions={reloadLastSessions} setInput={setInputsState}/>)
            }
            setLastSessions(lastSessionsArray)
            
            if (lastSessions.length > 0) {
                console.log(lastSessions);
            }
        }
    }

    function checkInputs() {
        const highLarr = [];
        for (var k in inputsState) {
            if (inputsState.hasOwnProperty(k)) {
                if (inputsState[k] === '' || inputsState[k] === null || inputsState[k] === false) {
                    highLarr.push(k)
                }
            }
        }
        setInputsHighlight(highLarr)
        if (highLarr.length > 0) {
            return false
        } else return true
    }

    const LoginUpdate = (l) => {
        setInputsState(prevState => ({
            login: l,
            pass: prevState.pass
        }))
    }

    const PassUpdate = (pass) => {
        setInputsState(prevState => ({
            login: prevState.login,
            pass: pass
        }))
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const createLastSession = (user) => {
        if (localStorage.getItem('lastSessions') == null) {
            localStorage.setItem('lastSessions', JSON.stringify({
                sessions: [user]
            }))
        } else {
            var oldSessions = JSON.parse(localStorage.getItem('lastSessions'))
            var newSessions = oldSessions
            for (let i = 0; i < newSessions.sessions.length; i++) {
                var sessArrayIndex = JSON.parse(newSessions.sessions[i])
                if (sessArrayIndex.login == JSON.parse(user).login) {
                    return false
                }
            }
            newSessions.sessions.push(user)
            localStorage.setItem('lastSessions', JSON.stringify(newSessions))
        }
    }

    const auth = () => {
        if (checkInputs()) {
            setLoading(true)
            var body = {
                'login': inputsState.login,
                'pass': inputsState.pass
            }
            axios.post('http://192.168.1.187:3002/api/auth', body,
                {
                    withCredentials: true,
                    headers: {
                        'Authorization': localStorage.getItem('frame')
                    }
                }
            )
                .then(response => {
                    if (response.data.code_state === 'error') {
                        setError(response.data.code_message)
                        setLoading(false)
                    } else {
                        switch (response.data.code) {
                        case 50:
                            localStorage.setItem('frame', response.data.token)
                            localStorage.setItem('user', JSON.stringify(response.data.user_data))
                            createLastSession(JSON.stringify(response.data.user_data))
                            loginIn()
                        break;
                        
                        default:
                            break;
                        }
                    }
                })
                .catch(error => {
                    setError(error.message)
                    setLoading(false)
                })
        }
    }

    return (
        <div className="Login">
            <ThemeToggler />
                <div className='Login-white-body'>
                    <div className="Login-title">
                        <h1>Авторизация</h1>
                        <h2>Авторизируйтесь, чтобы открыть <span>панель управления</span> умным домом</h2>
                    </div>
                    <div className="Login-body">
                        <div className="Login-left-body">
                            <div className="Login-last-sessions">
                                <div className='Login-last-sessions-title'>
                                    <span>Последние сессии, использованные на этом устройстве</span>
                                    <span>Кликните на блок, чтобы авторизоваться</span>
                                </div>
                                <div className='Login-sessions'>
                                    <div className='Login-sessions-body'>
                                        {lastSessions ? lastSessions.length > 0 ? lastSessions : 'Сессии отсутствуют' : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="Login-register-body">
                                <div className='register-title'>
                                    <span>
                                        После регистрации вам станут доступны все возможности умного дома, такие как:
                                    </span>
                                    <span>
                                        <span>Управление электро</span> и <span>водоснабжением</span>, <span>сценарии</span> и многое другое!
                                    </span>
                                </div>
                                <div className='register-button' onClick={changeRegisterMode}>
                                    Зарегистрироваться
                                </div>
                            </div>
                        </div>
                        <div className="Login-right-body">
                            <Logo className='register-logo'/>
                            <div className='Login-inputs'>
                                <div className='Input'>
                                    <input className='Input-this' style={{'border' : inputsHighlight.includes('login') ? '1px solid red' : 'var(--auth-input-border)'}} value={inputsState.login} type={props.type} onChange={e => LoginUpdate(e.target.value)} autoComplete='off'></input>
                                    <span className='Input-placeholder'>{props.placeholder}</span>
                                </div>
                                <div className='Input'>
                                    <input className='Input-this' value={inputsState.pass} style={{'border' : inputsHighlight.includes('pass') ? '1px solid red' : 'var(--auth-input-border)'}} type={showPassword ? 'text' : 'password'} onChange={e => {PassUpdate(e.target.value)}} autoComplete='off'></input>
                                    <div className={showPassword ? 'ShowPass' : 'ShowPass active'} onClick={toggleShowPassword}></div>
                                </div>
                                <span>Восстановить пароль</span>
                            </div>
                            {isLoading ? 
                            <div className='Login-button'>
                                <img src="../icons/loading.svg"></img>
                            </div> 
                            : 
                            <div className='Login-button' onClick={auth}>
                                Войти
                            </div>
                            }
                            {isError ? <span className="UnderError">{isError}</span> : ''}
                        </div>
                    </div>
                </div>
            </div>
    )
}

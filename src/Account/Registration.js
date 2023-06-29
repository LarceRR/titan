import Input from "../modules/Input/Input"
import Avatar from "./Avatar"
import { useEffect, useState } from "react"
import '../modules/Input/Input.css'
import axios, { Axios } from "axios"
import './Registration.css'
import Logo from "../Logo"

export default function Registration(props) { 
    const {changeRegisterMode} = props

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(null)

    // RANDOM COLOR
    const randomColor = () => {
        return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
    }

    // RANDOM AVATAR GENERATOR
    const generateRandomAvatar = (username) => {
        var initials = username.substring(0, 1).toUpperCase()

        var canvas = document.createElement('canvas')
        canvas.width = 200;
        canvas.height = 200;

        var ctx = canvas.getContext('2d')
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,200);
        ctx.lineTo(200,200);
        ctx.lineTo(200,0)
        ctx.fillStyle = randomColor();
        ctx.fill();
        ctx.fillStyle = "white"
        ctx.font = "bold 90px Arial";
        ctx.textAlign = 'center';
        ctx.fillText(initials, 100, 133)
        return canvas.toDataURL('image/jpeg')
    }

    const [inputsState, setInputsState] = useState({
        avatar: '',
        login: '',
        nsm: '',
        pass: '',
        passConfirm: '',
        passMatch: ''
    })

    const [inputsHighlight, setInputsHighlight] = useState('')

    // INPUTS SETTERS
    const avatarUpdate = (img) => {
        setInputsState(prevState => ({
            avatar: img,
            login: prevState.login,
            nsm: prevState.nsm,
            pass: prevState.pass,
            passConfirm: prevState.passConfirm,
            passMatch: prevState.passMatch
        }))
    } 

    const LoginUpdate = (l) => {
        setInputsState(prevState => ({
            avatar: prevState.avatar,
            login: l,
            nsm: prevState.nsm,
            pass: prevState.pass,
            passConfirm: prevState.passConfirm,
            passMatch: prevState.passMatch
        }))
    } 

    const NSMUpdate = (nsm) => {
        setInputsState(prevState => ({
            avatar: prevState.avatar,
            login: prevState.login,
            nsm: nsm,
            pass: prevState.pass,
            passConfirm: prevState.passConfirm,
            passMatch: prevState.passMatch
        }))
    } 

    const PassUpdate = (pass) => {
        setInputsState(prevState => ({
            avatar: prevState.avatar,
            login: prevState.login,
            nsm: prevState.nsm,
            pass: pass,
            passConfirm: prevState.passConfirm,
            passMatch: prevState.passConfirm === pass ? true : false
        }))
    }
    
    const PassMathcer = (pass) => {
        if (inputsState.pass !== pass) {
            setInputsState(prevState => ({
                avatar: prevState.avatar,
                login: prevState.login,
                nsm: prevState.nsm,
                pass: prevState.pass,
                passConfirm: pass,
                passMatch: false
            }))
        } else {
            setInputsState(prevState => ({
                avatar: prevState.avatar,
                login: prevState.login,
                nsm: prevState.nsm,
                pass: prevState.pass,
                passConfirm: pass,
                passMatch: true
            }))
        }
    } 

    // SHOW PASSWORD TOGGLER
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    function checkInputs() {
        const highLarr = [];
        for (var k in inputsState) {
            if (inputsState.hasOwnProperty(k)) {
                if (inputsState[k] === '' || inputsState[k] === null || inputsState[k] === false) {
                    if (k !== 'avatar') {
                        highLarr.push(k)
                    }
                }
            }
        }
        setInputsHighlight(highLarr)
        if (highLarr.length > 0) {
            return false
        } else return true
    }

    // NO MORE WORDS
    const registration = () => {
        if (checkInputs()) {
            setLoading(true)
            var body = {
                'login': inputsState.login,
                'nsm': inputsState.nsm,
                'pass': inputsState.pass,
                'avatar': inputsState.avatar ? inputsState.avatar : generateRandomAvatar(inputsState.login)
            }
            axios.post('http://192.168.1.187:3002/api/register', body)
                .then(response => {
                    if (response.data.code) {
                        setError(response.data.code_message)
                        setLoading(false)
                    } else {
                        console.log(response)
                        setError(null)
                        setLoading(false)
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
            <div className='Login-white-body'>
                <div className="Login-title">
                    <h1>Регистрация</h1>
                    <h2>Зарегистрируйтесь, чтобы открыть <span>панель управления</span> умным домом</h2>
                </div>
                <div className="Login-body">
                    <div className="Login-right-body">
                        <Logo className='register-logo'/>
                        <div className='Login-inputs'>
                            <Avatar avatarUpdater={avatarUpdate}/>
                            <div className='Input'>
                                <input className='Input-this' style={{'border' : inputsHighlight.includes('login') ? '1px solid red' : 'var(--auth-input-border)'}} value={inputsState.login} type={props.type} onChange={e => LoginUpdate(e.target.value)}></input>
                                <span className='Input-placeholder'>{props.placeholder}</span>
                            </div>
                            <div className='Input'>
                                <input className='Input-this' style={{'border' : inputsHighlight.includes('nsm') ? '1px solid red' : 'var(--auth-input-border)'}} value={inputsState.nsm} type={props.type} onChange={e => NSMUpdate(e.target.value)}></input>
                                <span className='Input-placeholder'>{props.placeholder}</span>
                            </div>
                            <div className='Input'>
                                <input className='Input-this' value={inputsState.pass} style={{'border' : inputsHighlight.includes('pass') ? '1px solid red' : 'var(--auth-input-border)'}} type={showPassword ? 'text' : 'password'} onChange={e => {PassUpdate(e.target.value)}}></input>
                            </div>
                            <div className='Input'>
                                <input className='Input-this' style={{'border' : inputsState.passMatch ? 'var(--auth-input-border)' : inputsState.passConfirm?.length > 0 || inputsHighlight.includes('passConfirm') ? '1px solid red' : 'var(--auth-input-border)'}} type={showPassword ? 'text' : 'password'} onChange={e => PassMathcer(e.target.value)}></input>
                                <div className={showPassword ? 'ShowPass' : 'ShowPass active'} onClick={toggleShowPassword}></div>
                            </div>
                            <span>Уже есть аккаунт? <b onClick={changeRegisterMode}>Войти</b></span>
                        </div>
                        {isLoading ? 
                        <div className='Login-button'>
                            <img src="../icons/loading.svg"></img>
                        </div> 
                        : 
                        <div className='Login-button' onClick={registration}>
                            Зарегистрироваться
                        </div>
                        }
                        {isError ? <span className="UnderError">{isError}</span> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
    
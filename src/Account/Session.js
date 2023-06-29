import { useState } from 'react'
import Role from './Role'
import './Session.css'

export default function Session(props) {
    const { reloadLastSessions,setInput } = props
    const [isHover, setIsHover] = useState(false)

    const removeSession = () => {
        const lastSessionsArray = []
        const sessionsComponents = []
        const lastSessions = JSON.parse(localStorage.getItem('lastSessions'))
        for (let i = 0; i < lastSessions.sessions.length; i++) {
            const session = JSON.parse(lastSessions.sessions[i])
            if (session.login !== props.username) {
                lastSessionsArray.push(JSON.stringify(session))
            }
        }
        localStorage.setItem('lastSessions', JSON.stringify({
            sessions: lastSessionsArray
        }))
        reloadLastSessions()
    }

    const insertLogin = () => {
        setInput({
            login: props.username,
            pass: ''
        })
    }

    return (
            <div className="Session"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() =>  setIsHover(false)}
                onClick={insertLogin}
            >
                {isHover ? <div className='SessionRemove' onClick={removeSession}><img src='./icons/close.svg'></img></div> : ''}
                <div className='SessionAvatarContainer'>
                    <img src={`http://${window.location.hostname}:3002/api/avatar/${props.username}`}></img>
                    <Role role_id={props.role_id}/>
                </div>
                <span>{props.userfullname}</span>
            </div>
    )
}
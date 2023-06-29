import { useState } from 'react';
import './Login.css';
import Registration from './Registration';
import Login from './Login';

export default function Authorization(props) {
    const [isRegister, setIsRegister] = useState(false)
    
    const toggleRegister = () => {
        setIsRegister(!isRegister)
    }

    if (!isRegister) {
        return (
            <Login changeRegisterMode={toggleRegister}/>
        )
    } else {
        return (
            <Registration changeRegisterMode={toggleRegister}/>
        )
    }
}
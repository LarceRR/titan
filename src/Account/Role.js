import { useEffect, useState } from "react"
import './Role.css'

export default function Role(props) {
    const [role, setRole] = useState(null)
    const [roleClassName, setRoleClassName] = useState(null)

    useEffect(() => {
            switch (props.role_id) {
                case 1:
                    setRole("Г")
                    setRoleClassName("guest")
                break;
                case 2:
                    setRole("А")
                    setRoleClassName("admin")
                break;
                case 3:
                    setRole("П")
                    setRoleClassName("panel")
                break;
            
                default:
                    setRole("?")
                    setRoleClassName("unknown")
                break;
            }
    },[])

    return (
        <div className="Role">
            <span className={`role ${roleClassName}`}>
                {role ? role : '?'}
            </span>
        </div>
    )
}
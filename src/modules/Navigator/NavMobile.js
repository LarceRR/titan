import './Nav.css';

export default function NavMobile(props) {

    const getName = () => {
        const name = JSON.parse(localStorage.getItem('user'))
        return name.login
    }

    return (
        <div className='NavMobile'>
            <div className='navigator-profile'>
                <img src={`http://${window.location.hostname}:3002/api/avatar/${getName()}`}></img>
            </div>
        </div>
    )
}

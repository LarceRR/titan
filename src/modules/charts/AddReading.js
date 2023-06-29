import './AddReading.css'

export default function AddReading(props) {
    return (
        <div className="AddReading">
            <div className="AddReading-title">
                <span>Добавление показаний</span>
            </div>
            <select className='AddReading-select'>
                <option name='gas'>Газ</option>
                <option name='water'>Вода</option>
                <option name='light'>Электричество</option>
            </select>
            <div className="AddReading-wrapper">
                <div className='AddReading-inputs-wrap'>
                    <div className='AddReading-input-cont'>
                        <span>Выберите дату:</span>
                        <input className='Input-this'></input>
                    </div>
                    <div className='AddReading-input-cont'>
                        <span>Укажите текущее показание:</span>
                        <input className='Input-this'></input>
                    </div>
                    <div className='AddReading-input-cont'>
                        <span>Предыдущее показание:</span>
                        <input className='Input-this'></input>
                    </div>
                    <div className='AddReading-input-cont'>
                        <span>Разница:</span>
                        <input className='Input-this'></input>
                    </div>
                </div>
                <div className='AddReading-button-wrap'>
                    <button><img src='./icons/plus.svg'></img></button>
                    <button>Стереть</button>
                </div>
            </div>
        </div>
    )
}
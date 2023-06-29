import './Loading.css';
export default function Loading(props) {
    if (props.size === 'max') {
        return (
            <div className="Loading" style={{'width':`${props.width}`,'height':`${props.height}`}}>
                <img src='./icons/loading.svg'></img>
                <span>Trying to reconnect...</span>
            </div>
        )
    } else {
        return (
            <div className="LoadingMin">
                <img src='./icons/loading.svg'></img>
            </div>
        )
    }
}
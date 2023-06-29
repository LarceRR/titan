export default function CamFullScreen(props) {
    return (
        <div className='CamFullScreen'>
            <div className='Cam-header'>
                Cam {props.item}
            </div>
            <img src={props.img}></img>
        </div>
    )
}
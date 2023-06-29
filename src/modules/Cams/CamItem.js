import './Cam.css'
import MainContext from '../../cntxt'
import { useContext, useState } from 'react'
import CamFullScreen from './CamFullScreen'

export default function CamItem(props) {
    const { setModal } = useContext(MainContext)

    const openCamFullscreen = () => {
        setModal({
            isModOpen: true,
            children: <CamFullScreen item={props.item} img={props.img}/>
        })
    }

    return (
        <div className='Cam' onClick={openCamFullscreen}>
            <div className='Cam-header'>
                Cam {props.item}
            </div>
            <img src={props.img}></img>
        </div>
    )
}
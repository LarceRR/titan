import './Avatar.css';
import { useState, useContext } from 'react';
import MainContext from '../cntxt';
import AvatarSelector from './AvatarSelector';

export default function Avatar(props) {
    const [isImageLoaded, setImageLoaded] = useState();
    const { setModal } = useContext(MainContext)
    const avatarUpdate = props.avatarUpdater
    const setImage = (img) => {
        setImageLoaded(img)
    }
    const applyImage = (img) => {
        avatarUpdate(img)
    }

    const openImageLoader = () => {
        setModal({isModOpen: true, children: <AvatarSelector img={{setImage,applyImage}} closeModal={setModal}/>})
    }

    return (
        <div className='Avatar-body'>
            <div className='Avatar'>
                {isImageLoaded ? 
                <div className='Avatar-set'>
                    <img src={isImageLoaded} onClick={openImageLoader}></img>
                </div> 
                : 
                <div className='Avatar-not-set' onClick={openImageLoader}>
                    
                </div>
                }
            </div>
        </div>
    )
}
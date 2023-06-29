import './AvatarSelector.css';
import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.min.css';

export default function AvatarSelector(props) {
    const [src, selectFile] = useState(null)
    const [result, setResult] = useState(null)
    const { img,closeModal } = props
    const { setImage,applyImage } = img

    const cropperRef = useRef(null);
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setResult(cropper.getCroppedCanvas().toDataURL('image/jpeg'));
    }

    const handleImageChange = e => {
        if (e.target.files.lenght > 1) {
            alert('You can load only 1 image');
            e.preventDefault()
        } else {
            selectFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    const saveImage = (e) => {
        e.preventDefault()
        setImage(result)
        closeModal({isModalOpen: false, children: null})
        applyImage(result)
    }

    return (
        <div className="AvatarSelector">
            <div className='AS-title-body'>
                <span className='AvatarSelectorTitle'>Выберите изображение</span>
                <span className='AvatarSelectorSubTitle'>Максимальный размер загружаемого изображения не должен превышать 5мб</span>
            </div>
            <div className='AS-preview-wrapper'>
                <div className='AvatarWrapper'>
                    {src ?
                        <Cropper 
                            src={src}
                            aspectRatio={ 1 / 1 }
                            initialAspectRatio={ 1 / 1 }
                            guides={false}
                            autoCrop={true}
                            responsive={true}
                            checkOrientation={false}
                            autoCropArea={1}
                            cropBoxResizable={false}
                            viewMode={3}
                            dragMode='none'
                            preview={'.lil_prev'}
                            cropend={onCrop}
                            ready={onCrop}
                            ref={cropperRef}
                        />
                    :
                        <div className='AvatarSelector-not-set'>

                        </div>
                    }
                </div>
                <div className='lil_prev'>
                    <div className='prev1'>

                    </div>
                </div>
            </div>
            <div className='Avatar-form'>
                <form onChange={handleImageChange}>
                    <label className="input-file">
                        <input type="file" name="file"></input>
                        <span className="input-file-btn">Выберите файл</span>
                    </label>
                </form>
                {src ? 
                <div onClick={saveImage} className='AvatarSubmit'>Сохранить</div>
                    :
                ''
                }
            </div>
        </div>
    )
}
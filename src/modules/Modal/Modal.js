import './Modal.css';
import MainContext from '../../cntxt';
import { useContext } from 'react';

function Modal({active, children}) {
    const { setModal } = useContext(MainContext);

    const closeModal = () => {
        setModal({isModOpen: false, children: null})
    }

    return (
        <div className={active ? 'ModalActive' : 'Modal'} onClick={closeModal}>
            <img src='./icons/close.svg' className='closebtn' onClick={closeModal}></img>
            <div className='Modal-body' onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
};

export default Modal
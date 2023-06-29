import { useState } from "react"

export default function AddButtonModal(props) {
    const [isExpandableChildrenSet, SetExpandableChildren] = useState(false)
    const [isEditableChildrenSet, SetEditableChildren] = useState(false)
  
    const ExpandBody = (props) => {
      if (isExpandableChildrenSet) 
        return (
          <div>Expandable</div>
        )
    }
  
    const EditBody = (props) => {
      if (isEditableChildrenSet) 
        return (
          <div>Editable</div>
        )
    }
  
    const Expandable = (props) => {
      const [isEnabled, setIsEnabled] = useState(false)
  
      const expToggle = () => {
        setIsEnabled(!isEnabled);
        SetExpandableChildren(!isExpandableChildrenSet);
      }
  
      return (
        <button className={isEnabled ? 'ModalExpandable meActive' : 'ModalExpandable'} onClick={expToggle}>Расширяемая</button>
      )
    }
  
    const Editable = (props) => {
      const [isEnabled, setIsEnabled] = useState(false)
  
      const expToggle = () => {
        setIsEnabled(!isEnabled);
        SetEditableChildren(!isEditableChildrenSet);
      }
  
      return (
        <button className={isEnabled ? 'ModalExpandable meActive' : 'ModalExpandable'} onClick={expToggle}>Редактируемая</button>
      )
    }
  
    const getPlaceRuName = (place) => {
      switch (place) {
        case 'room1':
          return 'Комната 1'
        case 'room2':
          return 'Комната 2'
        case 'kitchen':
          return 'Кухня'
        case 'bathroom':
          return 'Ванная'
        case 'street':
          return 'Улица'
        case 'globalfunction':
          return 'Глобальные функции'
        
        default:
          return place
      }
    }
  
    return (
      <div>
        <div className='ModalTitle'>
          <span>Добавить кнопку</span>
          <span>Кнопка будет добавлена в раздел "{getPlaceRuName(props.place)}"</span>
        </div>
        <div className='ModalBody'>
          <div className='ModalInpWrapper'>
            <input type='text' placeholder='Название'></input>
            <div className='ModalQuestion'>?</div>
          </div>
          <div className='ModalInpWrapper'>
            <input type='text' placeholder='ID'></input>
            <div className='ModalQuestion'>?</div>
          </div>
          <div className='ModalInpWrapper'>
            <div className='ModalSelectIcon'>
              <img className='ModalImgSel' src='./icons/picture.svg'></img>
            </div>
            <Expandable />
            <Editable />
          </div>
          <ExpandBody />
          <EditBody />
        </div>
      </div>
    )
  }
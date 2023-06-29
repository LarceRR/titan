import { useState,useContext } from "react"
import MainContext from "../../cntxt"
import AdditionalEditor from "./AdditionalEditor"

export default function Btn(props) {
    const { setModal } = useContext(MainContext)
    const [ToggleState,setToggleState] = useState('Off')
  
    const handleClick = () => {
      if (ToggleState == 'Off') {
        setToggleState('On')
      } else {
        setToggleState('Off')
      }
    }
  
    const openEditor = () => {
        setModal({
            isModOpen: true,
            children: <AdditionalEditor />
        })
    }
  
      if (props.expandable) {
        return (
          <div className={ToggleState === 'Off' ? 'Btn' : 'Btn active'} data-place={props.place} onClick={openEditor} id={props.id}>
            <div className='BtnImg' style={{'WebkitMaskImage': `url(./icons/${props.icon})`, 'WebkitMaskSize':'contain', 'WebkitMaskRepeat':'no-repeat', 'WebkitMaskPosition':'center'}}></div>
            <span className='expandable'>1</span>
            <span className='btn-name'>{props.name}</span>
        </div>
        )
      } else {
        return (
          <div className={ToggleState === 'Off' ? 'Btn' : 'Btn active'} data-place={props.place} onClick={handleClick} id={props.id}>
            <div className='BtnImg' style={{'WebkitMaskImage': `url(./icons/${props.icon})`, 'WebkitMaskSize':'contain', 'WebkitMaskRepeat':'no-repeat', 'WebkitMaskPosition':'center'}}></div>
            <div className='btn-state'>{ToggleState}</div>
            <span className='btn-name'>{props.name}</span>
          </div>
          )
      }
    }
import { useContext } from 'react';
import MainContext from '../../cntxt';
import AddButtonModal from './AddButtonModal';
import Btn from './Btn';
const config = require('./config.json');

export default function BtnContainer(props) {

    function AddButton(props) {
        const { setModal } = useContext(MainContext);
      
        return (
            <div>
              <div className='AddButton' onClick={() => setModal({isModOpen: true, children: <AddButtonModal place={props.place}/>})}></div>
            </div>
        )
      }

    const button = [];
    for (let i = 0; i < config.buttons[`${props.name}`].btns.length; i++) {
      button.push(
        <Btn
          place = {props.name}
          id = {config.buttons[`${props.name}`].btns[i].id}
          icon = {config.buttons[`${props.name}`].btns[i].icon}
          expandable = {config.buttons[`${props.name}`].btns[i].expandable}
          editable = {config.buttons[`${props.name}`].btns[i].editable}
          name = {config.buttons[`${props.name}`].btns[i].name}
        />
      )
    }
    button.push(
        <AddButton place={props.name}/>
    )
    return (
        button
    )
  }
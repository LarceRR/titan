import PlaceStatisticShort from "./PlaceStatisticShort"
import BtnContainer from "./BtnContainer"
const config = require('./config.json');

export default function BtnFullContainer(props) {
    return (
      <div className='BtnFullContainer'>
          <div className='BtnFC-title-wrap'>
            <span className='BtnFC-title'>{config.buttons[`${props.name}`].title}</span>
              {props.stat ? <PlaceStatisticShort place={props.name}/> : ''}
          </div>
          <div className='BtnContainer'>
              <BtnContainer name={props.name} />
          </div>
      </div>
    )
  }
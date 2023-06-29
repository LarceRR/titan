import { useState,useContext } from "react"

export default function PlaceStatisticShort(props) {
    const [isStatOpen, setStatOpen] = useState(false)
  
    const toggleStat = () => {
      setStatOpen(!isStatOpen)
    }
  
    function PlaceStatistic(props) {
      if (isStatOpen) {
        return (
          <div className='PlaceStatistic'>
            {props.place}
          </div>
        )
      }
    }
  
    return (
      <div className='place-statistic-wrapper' onClick={toggleStat}>
        <div className='place-statistic'>
          <div>
          <div className='PlaceStatBtnImg' style={{'WebkitMaskImage': `url(./icons/temp.svg)`, 'WebkitMaskSize':'contain', 'WebkitMaskRepeat':'no-repeat', 'WebkitMaskPosition':'center'}}></div>
            <span>20°</span>
          </div>
          <div>
          <div className='PlaceStatBtnImg' style={{'WebkitMaskImage': `url(./icons/humidity.svg)`, 'WebkitMaskSize':'contain', 'WebkitMaskRepeat':'no-repeat', 'WebkitMaskPosition':'center'}}></div>
            <span>21%</span>
          </div>
          <div>
          <div className='PlaceStatBtnImg' style={{'WebkitMaskImage': `url(./icons/wind.svg)`, 'WebkitMaskSize':'contain', 'WebkitMaskRepeat':'no-repeat', 'WebkitMaskPosition':'center'}}></div>
            <span>ОК</span>
          </div>
        </div>
      <PlaceStatistic place={props.place}/>
      </div>
    )
  }
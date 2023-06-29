import './Nav.css';
import NavButton from './NavButton';
import NavCursor from './NavCursor';
import NavMobile from './NavMobile';

export default function Nav(props) {

  const getName = () => {
    const name = JSON.parse(localStorage.getItem('user'))
    return name.login
  }

  const getShortNSM = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const done = user.nsm.split(' ')
    return done[1]+' '+done[0].substr(0,1)
  }

  return (
      <div className='NavWrapper'>
        <div className='nav_wrap'>
          <div className='navigator'>
          <div className='NavCursor'>
            <NavCursor currSwiperIndex={props.currentSwiper}/>
          </div>
            <div className='navigator-profile'>
              <img src={`http://${window.location.hostname}:3002/api/avatar/${getName()}`}></img>
              <span>{getShortNSM()}</span>
            </div>
            <div className='navigator-buttons-wrapper'>
              <div className='navigator-buttons-body'>
                <span>Сценарии</span>
                <div className='buttons-body'>
                  <NavButton icon='light'/>
                  <NavButton icon='water'/>
                  <NavButton icon='silent'/>
                  <NavButton icon='sex'/>
                </div>
              </div>
              <div className='navigator-buttons-body'>
                <span>Страницы</span>
                <div className='buttons-body'>
                  <NavButton icon='home' slideIndex={0}/>
                  <NavButton icon='chart' slideIndex={1}/>
                  <NavButton icon='weather' slideIndex={2}/>
                  <NavButton icon='cctv' slideIndex={3}/>
                </div>
              </div>
              <div className='navigator-buttons-body'>
                <span>Система</span>
                <div className='buttons-body'>
                  <NavButton icon='calendar' slideIndex={4}/>
                  <NavButton icon='settings' slideIndex={5}/>
                  <NavButton icon='security' slideIndex={6}/>
                  <NavButton icon='alarm' slideIndex={7}/>
                </div>
              </div>
              <div className='navigator-buttons-body'>
                <span>Прочее</span>
                <div className='buttons-body'>
                  <NavButton icon='messanger' slideIndex={8}/>
                  <NavButton icon='sys_info' slideIndex={9}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='NavMobile'>
          <NavMobile />
        </div>
      </div>
  );
}

import './styiling/Main.css';
import Nav from './modules/Navigator/Nav';
import Modal from './modules/Modal/Modal';
import MainSlider from './MainSlider';
import MainContext from './cntxt';
import { useState } from 'react';
import Authorization from './Account/Authorization';
import ThemeToggler from './ThemeToggler';
import axios from 'axios';

function Main() {

  const [isLoggedIn, setLoggedIn] = useState(false)
  const [modalActive, setModalActive] = useState({isModOpen: false, children: null})
  const [currentSwiperIndex, setSwiperIndex] = useState()
  const [swiper, setSwiper] = useState(null)

  axios.post('http://192.168.1.187:3002/api/session', {}, {
      headers: {
        Authorization: localStorage.getItem('frame')
      }
  }).then((resp) => {
    if (resp.data.code === 80) {
      setLoggedIn(true)
      localStorage.setItem('user', JSON.stringify(resp.data.user_data))
    } else {
    }
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });

  // window.onresize = console.log(window);
  
  if (isLoggedIn) {
    return (
      <div className='main_container'>
        <MainContext.Provider value={{setModal: setModalActive, currentSwiperIndexChange: setSwiperIndex, swiperController: swiper, swiperSet: setSwiper, currentSwipInd: currentSwiperIndex, LoggedStateChanger: setLoggedIn}}>
          <Nav currentSwiper={currentSwiperIndex} swiperContr={swiper}/>
          <MainSlider setSwiper={setSwiper}/>
          <Modal active={modalActive.isModOpen} children={modalActive.children}/>
        </MainContext.Provider>
        <ThemeToggler />
      </div>
    );
  } else {
    return (
      <div className='main_container'>
        <MainContext.Provider value={{setModal: setModalActive, LoggedStateChanger: setLoggedIn}}>
          <Authorization />
          <Modal active={modalActive.isModOpen} children={modalActive.children}/>
        </MainContext.Provider>
      </div>
    )
  }
}

export default Main;

import './styiling/MainSlider.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import Buttons from './modules/Buttons/Buttons';
import 'swiper/css';
import { useContext } from 'react';
import MainContext from './cntxt';
import ReadsChart from './modules/charts/readsChart';
import Cam from './modules/Cams/Cam';
import Weather from './modules/Weather/Weather';
import Loading from './modules/MiniModules/Loading';
import SystemInfo from './modules/SystemInfo/SystemInfo';


export default function MainSlider(props) {
  var { currentSwiperIndexChange,currentSwipInd,swiperSet } = useContext(MainContext);

  const changeSwipe = (index) => {
    currentSwiperIndexChange(index)
  }
  
  return (
    <div className='MainSlider'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onInit={swiperSet}
        onSwiper={(swiper) => changeSwipe(swiper.realIndex)}
        onSlideChangeTransitionEnd={(swiper) => changeSwipe(swiper.realIndex)}
        // onSliderMove={(swiper)}
      >
        <SwiperSlide>{currentSwipInd === 0 ? <Buttons /> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 1 ? <ReadsChart /> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 2 ? <Weather /> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 3 ? <Cam /> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 4 ? <div>Calendar</div> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 5 ? <div>Settings</div> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 6 ? <div>Security</div> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 7 ? <div>Alarm</div> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 8 ? <div>Messanger</div> : <Loading size='min'/>}</SwiperSlide>
        <SwiperSlide>{currentSwipInd === 9 ? <div><SystemInfo /></div> : <Loading size='min'/>}</SwiperSlide>
        {/* <SwiperSlide>{currentSwipInd == 10 ? <div>System info</div> : <Loading size='min'/>}</SwiperSlide> */}
    </Swiper>
    </div>
  );
}

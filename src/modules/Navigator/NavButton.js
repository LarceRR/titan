
import React, { useContext, useState } from 'react';
import MainContext from '../../cntxt';

export default function NavButton(props) {
    const { slideIndex } = props
    const { swiperController } = useContext(MainContext)

    const slideTo = () => {
        swiperController.slideTo(slideIndex)
    }

    return (
        <button>
            <div className='NavBtnImg' onClick={slideTo} style={{'WebkitMaskImage': `url(./icons/nav_${props.icon}.svg)`, 'WebkitMaskSize':'contain', 'WebkitMaskRepeat':'no-repeat', 'WebkitMaskPosition':'center'}}></div> 
        </button>
    )
    }
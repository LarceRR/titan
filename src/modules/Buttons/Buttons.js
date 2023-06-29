import './Buttons.css';
import React, { useContext } from 'react';
import BtnFullContainer from './BtnFullContainer';

export default function Buttons() {
  return (
    <div className='Buttons'>
      <BtnFullContainer name='room1' stat={true}/>
      <BtnFullContainer name='room2' stat={true}/>
      <BtnFullContainer name='kitchen' stat={true}/>
      <BtnFullContainer name='bathroom' stat={true}/>
      <BtnFullContainer name='street' stat={false}/>
      <BtnFullContainer name='globalfunction' stat={false}/>
    </div>
  );
}

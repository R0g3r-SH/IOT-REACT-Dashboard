import React from 'react'
import 'normalize.css';
import './splash.css'
import logo from '../assets/logot.png'

function splash() {
  return (
    <div className="Splash">
      <img  className="splashlogo"src={logo}></img>
    </div>
  )
}

export default splash

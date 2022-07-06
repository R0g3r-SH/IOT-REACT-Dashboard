import React, { useState, useEffect, button } from 'react';
import './App.css';
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Splash from './components/splash'
import ButtonNotification from "./components/ButtonNotification";
import { store } from "react-notifications-component";
import { ReactNotifications, Store } from 'react-notifications-component'
import "react-notifications-component/dist/theme.css";
import "animate.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {


  const [loading, setloading] = useState(false);
  // const [alerts, setalerts] = useState([]);


  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);

    }, 1500)
  }, [])


  const notification = {
    title: "Riesgo Critico!",
    message: "Medicion 200-100 PPM",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
  };


  useEffect(() => {

    const timer = setInterval(() => {
      Store.addNotification({
        ...notification,
        touchSlidingExit: {
          swipe: {
            duration: 400,
            timingFunction: 'ease-out',
            delay: 0,
          },
          fade: {
            duration: 400,
            timingFunction: 'ease-out',
            delay: 0
          }
        }
      })

    }, 10000)
  }, [])










  return (
    <>
      {
        loading ?
          <Splash />
          :

          <BrowserRouter>
            <Navbar />
            <ReactNotifications />
            <Routes>
              <Route exact path="/" element={<Products />} />
              <Route exact path="/reports" element={<Home />} />
            </Routes>
          </BrowserRouter>
      }
    </>
  );
}

export default App;

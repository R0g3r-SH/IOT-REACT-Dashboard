import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Personal.css'

//import { PersonalData } from './PersonalData';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

function Personal() {
  const [data, setdata] = useState([])
  
  useEffect(() => {
    getapiData()
    const timer = setInterval(() => {
      getapiData()
    }, 2000)
  }, [])

  const getapiData = async () => {
    const res = await axios.get("http://localhost:3000/last")
    setdata(res.data)
  }
  const getBackgroundColor = (value) => {
    let color;
    if (value < 50) {
      color = 'state-good';
    } else if (value >= 50 && value < 75) {
      color = 'state-y';
    } else if (value >= 75 && value < 200) {
      color = 'state-n';
    }else if (value >= 200 && value < 1000) {
      color = 'state-r';
    }else if (value >=1000) {
      color = 'state-m';
  }
    return color;
  }



  return (
    <>
      <div className="personalCard">
        <div className="personal-inner">
          {/* 
          <div className="personal-element">
            <FaIcons.FaMicrochip className="personal-icon" />
            <div className="p-elemt-text">
              <h2>ID</h2>
              <h3>S-123454</h3>
            </div>
            <FaIcons.FaCircle className="state-good" />
          </div>

          */}

          <h3 className="p-ti">Personal View</h3>

          {
            data && data.map((item, index) => {
              return (
                <div key={index} className="personal-element" >
                  <FaIcons.FaMicrochip className="personal-icon" />
                  <div className="p-elemt-text">
                    <h2>ID</h2>
                    <h3>S-000{item.id}</h3>
                    <h2 className="medi">PPM: {item.medicion} </h2>
                  </div>
                  <FaIcons.FaCircle className={getBackgroundColor(item.medicion)} />
                </div>
              );
            })

          }
        </div>
      </div>
    </>
  )
}

export default Personal

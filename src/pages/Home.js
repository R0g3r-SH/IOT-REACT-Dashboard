import React, { useState, useEffect } from 'react'
import { render } from "react-dom";
import axios from 'axios'
import './home.css'
import '../components/Cards.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import '../components/Personal.css'
import Personal from '../components/Personal';
import { getapiData } from '../API/apiData'

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./ChangingProgressProvider";
import ProgressBar from "@ramonak/react-progress-bar";

// Radial separators
import RadialSeparators from "./RadialSeparators";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const percentage = 50;


const options = {
  scales: {
    x: {
      grid: {
        display: false
      }
    },
  }
  ,
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,

    }
  }

}



let selector = 0;

function Home() {

  const [dataapi, setdataapi] = useState([])
  const [labelapi, setlabelapi] = useState([])
  const [datap, setdatap] = useState([])
  const [progres, setprogres] = useState(0)
  const [xdata, setxdata] = useState(0)
  const [ydata, setydata] = useState(0)






  const getapiData = async () => {

    const Mapx = (value) => {
      let to1 = 93.41;
      let from1 = -94.9;
      let from2 = -100.3078353757136;
      let to2 = -100.29235084639414;
      return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
    }


    const Mapy = (value) => {
      let to1 = 92;
      let from1 = -91.3;
      let from2 = 25.71530179910215;
      let to2 = 25.728408037838058;
      return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
    }

    const res = await axios.get("http://localhost:3000/data")
    const data = res.data[0].sensores[selector].historial
    let dataapi = []
    let lalabelapi = []
    let xdata1 = []
    let ydata1 = []

    for (let i = 0; i < data.length; i++) {
      dataapi.push(data[i].medicion)
      lalabelapi.push(data[i].hora)
      xdata1.push(data[i].x)
      ydata1.push(data[i].y)
    }
    setdataapi(dataapi.slice(dataapi.length - 9, dataapi.length))
    setxdata(Mapx(xdata1[xdata1.length - 1]).toFixed(5))
    setydata(Mapy(ydata1[ydata1.length - 1]).toFixed(5))
    setprogres(dataapi[dataapi.length - 1])
    setlabelapi(lalabelapi.slice(dataapi.length - 9, dataapi.length - 1))
  }




  useEffect(() => {
    getapiData()
    const timer = setInterval(() => {
      getapiData()
    }, 3000)
  }, [])

  useEffect(() => {
    getapiDatap()
    const timer = setInterval(() => {
      getapiDatap()
    }, 3000)
  }, [])

  const getapiDatap = async () => {
    const res = await axios.get("http://localhost:3000/last")

    setdatap(res.data)
  }



  const labels = labelapi;
  const data = {
    labels,
    datasets: [
      {
        label: 'Sensor 1',
        data: dataapi,
        borderColor: 'rgb(250, 173, 66)',
        backgroundColor: 'rgba(250, 173, 66 ,.15)',
        lineTension: .5,
        pointRadius: 4,
        fill: true,
      },
    ],
  };




  const getBackgroundColor = (value) => {
    let color;
    if (value < 50) {
      color = 'state-good';
    } else if (value >= 50 && value < 75) {
      color = 'state-y';
    } else if (value >= 75 && value < 200) {
      color = 'state-n';
    } else if (value >= 200 && value < 1000) {
      color = 'state-r';
    } else if (value >= 1000) {
      color = 'state-m';
    }
    return color;
  }


  const setProgresColor = (value) => {
    let color;
    if (value < 50) {
      color = '#12EC83';
    } else if (value >= 50 && value < 75) {
      color = '#ffe135';
    } else if (value >= 75 && value < 200) {
      color = '#F2A840';
    } else if (value >= 200 && value < 1000) {
      color = '#fd5c63';
    } else if (value >= 1000) {
      color = '#9400d3';
    }
    return color;
  }




  function ChangeSelector(key) {
    console.log("Me picaron bnb")
  }

  function handleId(e) {
    console.log(e.currentTarget.id);
    selector = e.currentTarget.id;
    getapiData();
  }

  return (
    <div className="container">
      <div className="sub-container">

        {/*
        <div className="top">
          <p>DASHBOARD</p>
          <h3>Overview</h3>
        </div>
        <div className="topCards">
      </div>
      */}
        <div className="card1">
          <div className="cardsubcontainer">
            <div className="tupper">
              <h3>DASHBOARD</h3>
              <FaIcons.FaAngleRight className="icons" />
            </div>
            <div className="tupper">
              <h2>Mediciones en tiempo real S-000{selector}</h2>
              <IoIcons.IoMdAlert className="icons" />
            </div>

            <div className="chart">
              <Line options={options} data={data} />
            </div>

            <div className="wiggets">

              <div className="cicularbarContainer">
                <h2>Medicion Actual</h2>

                <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={progres}
                  duration={.5}
                  easingFunction={easeQuadInOut}
                >
                  {value => {
                    const roundedValue = Math.round(value);
                    return (
                      <CircularProgressbar
                        className="cicularbar"
                        maxValue={1200}
                        value={value}
                        text={`${roundedValue} PPM`}
                        /* This is important to nclude, because if you're fully managing the
                  animation yourself, you'll want to disable the CSS animation. */
                        styles={buildStyles({
                          pathTransition: "none",
                          pathColor: setProgresColor(progres),
                          trailColor: "#eee",
                          textColor: setProgresColor(progres),
                          textSize: 15

                        })}
                      />
                    );
                  }}
                </AnimatedProgressProvider>
              </div>
              <div className="counter-container">



                <div>

                  <div className="counter">
                    <div className="bumblg" /> <h2 className="btext">0-50 PPM No existe riesgo</h2>
                  </div>
                </div>


                <div>
                  <div className="counter">
                    <div className="bumbly" /> <h2 className="btext">50-75 PPM Riesgo Bajo</h2>
                  </div>

                </div>


                <div>
                  <div className="counter">
                    <div className="bumbl1" /> <h2 className="btext">75-200 PPM </h2>
                  </div>
                </div>

                <div>
                  <div className="counter">
                    <div className="bumbl" /> <h2 className="btext" >200-1000 PPM </h2>
                  </div>

                </div>

                <div>
                  <div className="counter">
                    <div className="bumblm" /> <h2 className="btext" >1000 o mayor Riesgo Critico</h2>
                  </div>
                </div>


              </div>


              <div>

                <div>
                  <div className="tupper2">
                    <h2>Promedio de medciones S-000{selector}</h2>
                    <IoIcons.IoMdAlert className="icons" />
                  </div>
                  <div className="counter">
                    <h1 className="bigfish">{progres}</h1>
                    <h2 className="complement">PPM</h2>
                  </div>
                  <ProgressBar completed={progres} isLabelVisible={false} maxCompleted={1200} height={12} bgColor={setProgresColor(progres)} />
                </div>
                <div className="coordenates">

                  <div className="x">
                    <div className="counter">
                      <div className="bumbl1" /> <h2 > x </h2>
                    </div>
                    <h2 className="complement" >{xdata}</h2>
                  </div>
                  <div>

                    <div className="counter">
                      <div className="bumbl1" /> <h2 > y </h2>
                    </div>

                    <h2 className="complement" >{ydata}</h2>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>




        <div className="personalCard2">
          <div className="personal-inner">
            <h3 className="p-ti">Personal View</h3>
            {
              datap && datap.map((item, index) => {
                return (
                  <div key={index} id={index} mykey={index} className="personal-element2" onClick={handleId}>
                    <FaIcons.FaMicrochip className="personal-icon" />
                    <div className="p-elemt-text">
                      <h2>ID</h2>
                      <h3>S-000{item.id}</h3>
                      <p className="Medi"> PPM: {item.medicion} </p>
                    </div>
                    <FaIcons.FaCircle className={getBackgroundColor(item.medicion)} />
                  </div>
                );
              })
            }
          </div>
        </div>

      </div>
    </div >
  )
}

export default Home
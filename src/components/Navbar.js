import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../assets/logot.png'

function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const [selected, setSelected] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const pageSelection = () => setSelected (!selected);
  

  return (
    <>
      <div className="sContainer">
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
          <div className='logo'>
            <img src={logo}></img>
          </div>

            {/*
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
*/}
            {SidebarData.map((item, index) => {
              return (
                <div className='libg' onClick={pageSelection}>
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      <div className='icon'>{item.icon}</div>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
          </Link>
        </div>
      </div>



    </>
  );
}

export default Navbar;
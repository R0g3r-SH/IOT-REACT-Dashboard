import React from 'react'
import './products.css'

import Unity, { UnityContext } from "react-unity-webgl";
import Personal from '../components/Personal';

import { ReactNotifications, Store } from 'react-notifications-component'
import "react-notifications-component/dist/theme.css";
import "animate.css";


const unityContext = new UnityContext({
  loaderUrl: "/WebGLBuild/Build/WebGLBuild.loader.js",
  dataUrl: "/WebGLBuild/Build/WebGLBuild.data.unityweb",
  frameworkUrl: "/WebGLBuild/Build/WebGLBuild.framework.js.unityweb",
  codeUrl: "/WebGLBuild/Build/WebGLBuild.wasm.unityweb",
});






function Products() {




  return (

    <div className="container">
      <Unity unityContext={unityContext} style={{ width: '100%', height: '100%' }} />
      <div className="floating">
        <Personal/>
      </div>
 
    </div>
    
  )
}
export default Products

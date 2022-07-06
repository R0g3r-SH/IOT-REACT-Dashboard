import React from "react";

import '@testing-library/jest-dom/extend-expect'
import { render } from "@testing-library/react";

import Navbar from "./Hello"

test('renders content',()=>{
    const note ={
        content: 'this is a test',
        important:true,
    }
    const component = render(<Navbar/>)
    console.log(component)
})
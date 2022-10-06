//---------- imports

// react
import React from "react";

// lib
import { BrowserRouter, Routes, Route } from "react-router-dom";

// component
import Home from '../Components/Home';
import Artist from '../Components/Artist';



//---------- export main component

export default function RoutesComponent() {

    //---------- state and veriables

    //---------- main returns

    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<Home />} />

                <Route path="/artist/:id" element={<Artist />} />


            </Routes>
        </BrowserRouter>
    );
}
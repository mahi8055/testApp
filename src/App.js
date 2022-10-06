//---------- imports

// react
import React, { useEffect, useState, useContext } from "react";

//css
import './App.css';

// navigation
import RoutesComponent from "./Route/Routes";

// context
import { GlobalContextHelper } from './ContextHooks/GlobalContextHelper'

//---------- main app / component

const App = () => {

  //---------- state

  //---------- life cycle

  useEffect(() => {

  }, []);

  //---------- user's action

  //---------- return main view

  return (
    <GlobalContextHelper>

      <RoutesComponent />

    </GlobalContextHelper>
  );
};

//---------- export component

export default App;

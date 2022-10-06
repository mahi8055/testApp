//---------- imports

// react
import React, { useEffect, useState, createContext, useContext } from "react";

// lib
import { useNavigate , useLocation  } from "react-router-dom";

//---------- context

import { AppContext } from './GlobalContextHelper'


const GlobalContextProvider = () => {

    //---------- state, veriable, context and hooks
    
  let navigate = useNavigate(); 
  let params = useLocation(); 

    const {
        appStateObject,
        appStateArray,

        getDataFromServerHelper,
        storeDataInAppState,
        removeDataFromAppState,
        removeAllDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        removeDataFromAsyncStorage,
    } = useContext(AppContext);

    //---------- main app / component

    return {
        appStateObject,
        appStateArray,
        navigate,
        params, 

        getDataFromServerHelper,
        storeDataInAppState,
        removeDataFromAppState,
        removeAllDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        removeDataFromAsyncStorage,
    }

}

//---------- export component

export default GlobalContextProvider;

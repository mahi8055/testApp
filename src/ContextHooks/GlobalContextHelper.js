//---------- imports

// react
import React, { useEffect, useState, createContext } from "react";

// third party lib

// api call
import { getDataFromServer } from '../Utils/Axios'


//---------- context

const AppContext = createContext();

//---------- main app / component

const GlobalContextHelper = (props) => {

    //---------- state, veriables and hooks
    const [appStateObject, setAppStateObject] = useState({})
    const [appStateArray, setAppStateArray] = useState([])

    //---------- life cycle

    useEffect(() => {

    }, []);


    //---------------------------------- Axios Api cal ----------------------------------------//

    const getDataFromServerHelper = ({
        data, key, end_point, params = {}, return_params
    }) => {

        getDataFromServer({
            appStateObject, data, key, end_point, call_back: postDataCallBack, return_params
        })
    }

    const postDataCallBack = (response) => {

        // veriable
        let key = response.key
        let data

        // success
        if (response.status === 'success') {

            data = {
                response: { data: response.response, return_params: response.return_params }
            }

            // error
        } else {

            data = {
                error: response.error
            }

            alert(response.error)

        }

        storeDataInAppState({ key, data })
    }

    //---------- user's action

    //----------------------------------- Store data in state---------------------------------//


    // store data in state
    const storeDataInAppState = ({ key, data }) => {

        setAppStateObject({
            ...appStateObject,
            [key]: data,
        })
    }

    // remove data from app state
    const removeDataFromAppState = ({ key }) => {

        setAppStateObject({
            ...appStateObject,
            [key]: {},
        })
    }


    // remove data from app state
    const removeAllDataFromAppState = () => {

        setAppStateObject({})
    }

    //------------------------------ Async Storage ------------------------------------------//

    //---------- async storage

    // store
    const storeDataInAsyncStorage = async ({ key, value }) => {

        try {
            const jsonValue = JSON.stringify(value)
            await localStorage.setItem(key, jsonValue)
            return true
        } catch (e) {
            // saving error
            return false
        }
    }

    // get data
    const getDataFromAsyncStorage = async (key) => {
        try {
            const value = await localStorage.getItem(key)
            if (value !== null) {

                return JSON.parse(value)
            }

            return false
        } catch (e) {

            // error reading value
            return false
        }
    }

    // remove async storage
    const removeDataFromAsyncStorage = async (key) => {

        await localStorage.removeItem(key)
    }

    //---------- return main view

    return (
        <AppContext.Provider
            value={{
                appStateObject,
                appStateArray,

                getDataFromServerHelper,
                storeDataInAppState,
                removeDataFromAppState,
                removeAllDataFromAppState,
                storeDataInAsyncStorage,
                getDataFromAsyncStorage,
                removeDataFromAsyncStorage,
            }}
        >

            {
                props.children
            }
        </AppContext.Provider >

    );
};

//---------- export component

export { GlobalContextHelper, AppContext };
// export default { GlobalContextProvide, AppContext };

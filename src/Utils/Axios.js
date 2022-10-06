import axios from "axios";

const BASE_URL = 'http://private-anon-b943a5c574-fanarttv.apiary-mock.com/v3/'

export const getDataFromServer = async ({ key, end_point, call_back, return_params }) => {

   
    let url = BASE_URL + end_point

    // api call
    await axios.get(url)

        // success
        .then(function (response) {

            // console.log('                                     ')
            // console.log(`api resposense for  key : ${key}, end point : ${end_point}  `, response.data)
            // console.log('                                     ')

            // success
            if (response?.data) {

                call_back({
                    status: 'success',
                    response: response?.data,
                    key,
                    return_params
                })

                // error
            } else {


                // console.log('                                     ')
                // console.log(` error :==> api resposense for  key : ${key}, end point : ${end_point}  `, response.data)
                // console.log('                                     ')


                call_back({
                    status: 'error',
                    error: response?.data,
                    key,
                    return_params
                })
            }
        })

        // axios error
        .catch(function (error) {

            console.log('catch error axios error =', error)

            call_back({
                status: 'error',
                error: error?.toString(),
                key,
                return_params
            })
        });
}

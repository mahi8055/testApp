//---------- imports

// react
import React, { useEffect, useState } from "react";

// context
import GlobalContextProvider from "../ContextHooks/GlobalContextProvider";

// imges
import Image0 from '../Assets/0.jpg'
import Image1 from '../Assets/0.jpg'
import Image2 from '../Assets/0.jpg'
import Image3 from '../Assets/0.jpg'
import Image4 from '../Assets/0.jpg'


// global veriable
let current_index


//---------- main Home / component

const Home = () => {

    //---------- state
    const [loading, setLoadig] = useState(false);
    const [artistId, setArtistId] = useState('');
    const [artistData, setArtistData] = useState([]);
    const [artistImageData, setArtistImageData] = useState([]);

    const {
        appStateObject,
        appStateArray,
        navigate,

        getDataFromServerHelper,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
    } = GlobalContextProvider()

    //---------- life cycle

    useEffect(() => {

        getDataFromServer();
    }, []);


    useEffect(() => {

        // success
        if (appStateObject?.latest_artist_pocket?.response?.data && loading) {


            setArtistData(appStateObject?.latest_artist_pocket?.response?.data)
            setLoadig(false)
        }
    }, [appStateObject?.latest_artist_pocket])

    useEffect(() => {

        // success
        if (appStateObject?.artist_image_pocket?.response?.data && loading) {



        }
    }, [appStateObject?.artist_image_pocket])

    // useEffect(() => {

    //     // success
    //     if (appStateObject?.album_pocket?.response) {

    //         console.log('------album_pocket ------ : ', appStateObject?.album_pocket?.response)
    //     }
    // }, [appStateObject?.album_pocket])

    // useEffect(() => {

    //     // success
    //     if (appStateObject?.labels_pocket?.response) {

    //         console.log('---labels_pocket --------- : ', appStateObject?.labels_pocket?.response)
    //     }
    // }, [appStateObject?.labels_pocket])


    //---------- user's action

    const getDataFromServer = () => {

        // getDataFromServerHelper({
        //     key: 'artist_image_pocket',
        //     end_point: 'music/f4a31f0a-51dd-4fa7-986d-3095c40c5ed9',
        // })

        // getDataFromServerHelper({
        //     key: 'album_pocket',
        //     end_point: 'music/albums/9ba659df-5814-32f6-b95f-02b738698e7c',
        // })

        // getDataFromServerHelper({
        //     key: 'labels_pocket',
        //     end_point: 'music/labels/e832b688-546b-45e3-83e5-9f8db5dcde1d',
        // })

        setLoadig(true);
        getDataFromServerHelper({
            key: 'latest_artist_pocket',
            end_point: 'music/latest',
        })


    }

    //---------- render helper

    const renderArtists = () => {

        // console.log('artist data', artistData)
        return artistData?.map((item, index) => {

            // console.log('item', item)

            return (
                <div
                    className="blog"
                    key={index}

                    onClick={() => {
                        navigate(`/artist/${item.id}`, { state: item })
                    }}
                >
                    <img
                        src={`${Image0}`}
                        className="img_inner fleft"
                    />
                    <div className="extra_wrapper">
                        <h3 className="blog_head color1"><a href="#">{item.name}</a></h3>
                        <p>Cras facilisis, nulla vel viverra auctor, leo magna sodales felis, quis malesuada nibh odio ut velit. Proin pharetra luctus diam, a scelerisque eros convallis <br /> accumsanInteger convallis orci vel mi laoreet, at ornare lorem consequatasellus erat nisl</p>
                        Auctor vel velit sed,pharetra venenatis nulla. Vestibulum volutpat turpis ut massa commodo, quis aliquam massa facilisis. Donec non sapien a erat porttitor aliquet. Integer convallis orci vel mi laoreet, at ornare lorem consequat. Phasellus erat nisl, auctor vel velit sed, pharetra venenatis nulla. Vestibulum volutpat turpis ut massa commodo, quis aliquam massa facilisis. Donec non sapien a erat porttitor aliquet.
                    </div>
                </div>
            )
        })
    }

    //---------- return main view

    return (
        <div className="main">
            <section className="content">

                <h1>Artist</h1>

                <div className="row">
                    <div className="grid_11">
                        {
                            renderArtists()
                        }
                    </div>
                </div>
            </section>
        </div>

    );
};

//---------- export component

export default Home;

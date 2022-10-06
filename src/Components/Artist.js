//---------- imports

// react
import React, { useEffect, useState } from "react";

// lib
import { Swiper, SwiperSlide } from 'swiper/react';

// image
import Like from '../Assets/like.png'

// css
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//---------- context
import GlobalContextProvider from "../ContextHooks/GlobalContextProvider";

//---------- main Home / component

const Artist = () => {

    //---------- state

    const [artistData, setArtistData] = useState({});
    const [albums, setAlbums] = useState([]);
    const [loading, setLoadig] = useState(false);

    const {
        appStateObject,
        appStateArray,
        navigate,
        params,

        getDataFromServerHelper,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
    } = GlobalContextProvider()

    let artist = params?.state;

    //---------- life cycle

    useEffect(() => {
        setLoadig(true)
        getDataFromServerHelper({
            key: 'artist_image_pocket',
            end_point: `music/${artist.id}`
        })
    }, []);

    useEffect(() => {

        // success
        if (appStateObject?.artist_image_pocket?.response?.data) {

            setArtistData(appStateObject?.artist_image_pocket?.response?.data)

            createAlbumdata(appStateObject?.artist_image_pocket?.response?.data?.albums || [])
            setLoadig(false)
        }
    }, [appStateObject?.artist_image_pocket])

    //---------- user's action


    //---------- render helpers

    const renderSwiper = ({ data, renderView, image_per_page }) => {
        return (
            <Swiper
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                spaceBetween={50}
                slidesPerView={image_per_page}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    renderView(data)
                }

            </Swiper>

        )
    }

    const renderItem = (data) => {

        return data?.length > 0 && data.map((item, index) => {

            return (
                <SwiperSlide
                    key={index}
                >
                    <img style={{ width: '100%' }} src={item.url} />

                    <div
                        style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 10, left: 10 }}
                    >
                        <img style={{ height: '5%', width: '5%', marginRight: 10 }} src={Like} />
                        <p style={{ margin: 0, padding: 0, fontSize: 20 }}>
                            {item.likes}
                        </p>
                    </div>
                </SwiperSlide>
            )
        })
    }

    // const renderItem = (data) => {

    //     return data?.length > 0 && data.map((item, index) => {

    //         return (
    //             <SwiperSlide
    //                 key={index}
    //             >
    //                 <img
    //                     style={{ width: '100%' }}
    //                     src={item.url}
    //                 />

    //                 <div
    //                     style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 10, left: 10 }}
    //                 >
    //                     <img
    //                         style={{ height: '5%', width: '5%', marginRight: 10 }}
    //                         src={Like}
    //                     />
    //                     <p
    //                         style={{ margin: 0, padding: 0, fontSize: 20 }}
    //                     >
    //                         {item.likes}
    //                     </p>
    //                 </div>
    //             </SwiperSlide>
    //         )
    //     })
    // }

    //---------- contruct data

    const createAlbumdata = (data) => {

        let keys = Object.keys(data);

        let albums_array = []

        keys.forEach((key) => {



            if (data[key]?.albumcover?.length > 0) {

                albums_array.push(...data[key]?.albumcover)
            }

        });

        setAlbums(albums_array)

    }

    //---------- return main view

    // loading
    if (loading) {
        return null
    }

    return (
        <div className="main">
            <section className="content">
                <div className="container">

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >

                        <img
                            style={{
                                height: 100,
                                width: 300,
                            }}
                            src={artistData?.hdmusiclogo?.length > 0 && artistData?.hdmusiclogo[1]?.url}
                        />

                    </div>

                    <section className="content">
                        <div className="container">

                            {
                                renderSwiper({ data: artistData?.musicbanner, renderView: renderItem, image_per_page: 1 })
                            }

                        </div>
                    </section>

                    <section className="content">
                        <div className="container">

                            <h1>Artist Images  </h1>

                            {
                                renderSwiper({ data: artistData?.artistthumb, renderView: renderItem, image_per_page: 3 })
                            }

                        </div>
                    </section>

                    <section className="content">
                        <div className="container">

                            <h1>Musics  </h1>

                            {
                                renderSwiper({ data: artistData?.artistbackground, renderView: renderItem, image_per_page: 1 })
                            }

                        </div>
                    </section>

                    <section className="content">
                        <div className="container">

                            <h1>Albums  </h1>

                            {
                                renderSwiper({ data: albums, renderView: renderItem, image_per_page: 2 })
                            }

                        </div>
                    </section>

                </div>
            </section>

        </div>
    );
};

//---------- export component

export default Artist;

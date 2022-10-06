//---------- imports

// react
import React, { useEffect, useState } from "react";

// lib
import { Swiper, SwiperSlide } from 'swiper/react';

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
            setLoadig(false)
        }
    }, [appStateObject?.artist_image_pocket])

    //---------- user's action


    //---------- render helpers

    const renderSwiper = (data) => {

        return data?.length > 0 && data.map((item, index) => {

            console.log('item', item)
            return (
                <SwiperSlide
                    key={index}
                >
                    <img style={{ width: '100%' }} src={item.url} />
                </SwiperSlide>
            )
        })
    }

    const renderAlbums = () => {

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
                    <h1 style={{ textAlign: 'center' }}>{artistData?.name}</h1>

                    <Swiper
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            renderSwiper(artistData?.artistbackground)
                        }

                    </Swiper>

                    <div
                        style={{
                            marginTop: 50
                        }}
                    >

                    </div>

                </div>
            </section>

        </div>

    );
};

//---------- export component

export default Artist;

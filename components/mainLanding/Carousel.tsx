'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import CarouselItems from './CarouselItems';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { storage } from '../../app/firebase';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../app/firebase';

const getRandomFileNames = async () => {
    const storageRef = ref(storage, 'thumbnails');
    const allFiles = await listAll(storageRef);

    const selectedVideoFileNames = [];

    while (selectedVideoFileNames.length < 5 && allFiles.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * allFiles.items.length);
        const randomFile = allFiles.items.splice(randomIndex, 1)[0];
        selectedVideoFileNames.push(randomFile.name);
    }

    return selectedVideoFileNames;
};

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray', borderRadius: '50px', paddingTop: '1px' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray', borderRadius: '50px', paddingTop: '1px' }}
            onClick={onClick}
        />
    );
}

export default class Carousel extends Component {
    state = {
        gameItem: [],
    };

    settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 1,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    async componentDidMount() {
        const items = await getRandomFileNames();
        const gameItem = await Promise.all(
            items.map(async (fileName) => {
                const gameRef = doc(collection(db, 'Game'), fileName);
                const gameSnapshot = await getDoc(gameRef);
                const gameData = gameSnapshot.data();

                const thumbnailRef = ref(storage, `thumbnails/${fileName}`);
                const thumbnailURL = await getDownloadURL(thumbnailRef);

                const videoRef = ref(storage, `video/${fileName}`);
                const videoURL = await getDownloadURL(videoRef);

                return {
                    gameData,
                    thumbnailURL,
                    videoURL,
                };
            })
        );

        this.setState({ gameItem });
    }

    render() {
        return (
            <div className="carousel w-[700px] h-[300px] bg-slate-500 mx-auto mb-12">
                <Slider {...this.settings}>
                    {this.state.gameItem.map((item) => {
                        return <CarouselItems key={item.gameData.게임명} videoItem={item} />;
                    })}
                </Slider>
            </div>
        );
    }
}

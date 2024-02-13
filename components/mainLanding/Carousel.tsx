'use client';
import React, { Component } from 'react';
import Slider from 'react-slick';
import CarouselItems from './CarouselItems';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { storage } from '@/app/firebase';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

const getRandomFileNames = async () => {
    const storageRef = ref(storage, 'video');
    const allFiles = await listAll(storageRef);

    const selectedVideoFileNames = [];

    while (selectedVideoFileNames.length < 5 && allFiles.items.length > 0) {
        const randomIndex = Math.floor(Math.random() * allFiles.items.length);
        const randomFile = allFiles.items.splice(randomIndex, 1)[0];
        selectedVideoFileNames.push(randomFile.name);
    }

    return selectedVideoFileNames;
};

const Items = getRandomFileNames();

// Import necessary modules

export default class Carousel extends Component {
    state: { videoItems: never[] };
    constructor(props: any) {
        super(props);
        this.state = {
            videoItems: [],
        };
    }

    async componentDidMount() {
        try {
            const selectedVideoFileNames = await getRandomFileNames();
            this.setState({ videoItems: selectedVideoFileNames });
        } catch (error) {
            console.error('Error fetching random file names:', error);
        }
    }
    setState(arg0: { videoItems: string[] }) {
        throw new Error('Method not implemented.');
    }

    settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 500,
    };

    render() {
        return (
            <div className="carousel w-[700px] bg-slate-500">
                <Slider {...this.settings}>
                    {this.state.videoItems.map((item, i) => (
                        <Carousel Items key={i} videoItem={item} />
                    ))}
                </Slider>
            </div>
        );
    }
}

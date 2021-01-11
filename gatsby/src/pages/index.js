import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
    return (
        <div>
            <p>Currently Slicing</p>
        </div>
    )
}

function HotSlices() {
    return (
        <div>
            <p>Hot Slices</p>
        </div>
    )
}

export default function HomePage() {
    const {slicemasters, hotSlices} = useLatestData();
    return (
        <div className="center">
            <h1>
                The Best Pizza Downtown!
            </h1>
            <p>
                Open 11am to 11pm 24/7
            </p>
            <div>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices hotSlices={hotSlices} />
            </div>
        </div>
    );
}
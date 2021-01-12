import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid, ItemsGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({slicemasters}) {
    return (
        <div>
            <h2 className="center">
                <span className="mark tilt" style={{display: "inline-block", transform: "rotate(-5deg)"}}>Slicemasters On</span>
            </h2>
            <p>
                Standing by, ready to slice you up!
            </p>
            {!slicemasters && <LoadingGrid count={4} />}
            {slicemasters && !slicemasters?.length && (<p>There are no Slicemasters right now</p>)}
            {slicemasters?.length && <ItemGrid items={slicemasters} />}            
        </div>
    )
}

function HotSlices({hotSlices}) {
    return (
        <div>
            <h2 className="center">
                <span className="mark tilt" style={{display: "inline-block", transform: "rotate(-5deg)"}}>Hot Slices</span>
            </h2>
            <p>
                Buy by the slice
            </p>
            {!hotSlices && <LoadingGrid count={4} />}
            {hotSlices && !hotSlices?.length && (<p>There are no Pizzas in the oven</p>)}
            {hotSlices?.length && <ItemGrid items={hotSlices} />}
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
            <HomePageGrid>
                <CurrentlySlicing slicemasters={slicemasters} />
                <HotSlices hotSlices={hotSlices} />
            </HomePageGrid>
        </div>
    );
}
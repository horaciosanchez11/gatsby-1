import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({slicemasters}) {
    return (
        <div>
            {!slicemasters && <LoadingGrid count={4} />}
            {slicemasters && !slicemasters?.length && (<p>There are no Slicemasters right now</p>)}
        </div>
    )
}

function HotSlices({hotSlices}) {
    return (
        <div>
            {!hotSlices && <LoadingGrid count={4} />}
            {hotSlices && !hotSlices?.length && (<p>There are no Pizzas in the oven</p>)}
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
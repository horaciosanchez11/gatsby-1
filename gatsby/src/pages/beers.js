import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerGridStyle = styled.div`
    display:grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyle = styled.div`
    border: 1px solid var(--grey);
    padding: 2rem;
    text-align: center;
    img {
        width:100%;
        height:200px;
        object-fit:contain;
        display:block;
        display:grid;
        align-items:center;
        font-size:10px;        
    }
`;

export default function BeersPage({data}) {
    console.clear();
    console.log(data);
    return (
        <>
            <h2 className="center">
                We have {data.beers.nodes.length} available
            </h2>
            <BeerGridStyle>
                {data.beers.nodes.map(beer => {
                    const rating = Math.round(beer.rating.average);
                    return (
                        <SingleBeerStyle key={beer.id}>
                            <img src={beer.image} alt={beer.name} />
                            <h3>{beer.name}</h3>
                            {beer.price}
                            <p title={`${rating} out of 5 stars`} style={{color:'orange'}}>
                                {'*'.repeat(rating)}
                                <span style={{filter:`grayscale(100%)`}}>
                                    {'*'.repeat(5 - rating)}
                                </span>
                            </p>
                        </SingleBeerStyle>                        
                    )
                })}
            </BeerGridStyle>
        </>
    );
}

export const query = graphql`
    query {
        beers: allBeer {
            nodes {
                id
                name
                price
                image
                rating {
                    reviews
                    average
                }
            }
        }
    }
`;
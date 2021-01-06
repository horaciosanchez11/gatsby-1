import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom:4rem;
    a {
        display:grid;
        padding: 5px;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        background: var(--grey);
        align-items:center;
        border-radius:15px;
        .count {
            background:white;
            padding: 2px 5px;
        }
    }
    [aria-current="page"] {
        background: var(--yellow);
    }
`;

function countPizzasInToppings(pizzas) {
    // Return the pizzas with count
    const counts = pizzas
        .map(pizza => pizza.toppings)
        .flat()
        .reduce((acc, topping) => {
            const existingTopping = acc[topping.id];
            if (existingTopping) {
                existingTopping.count += 1;                
            } else {
                acc[topping.id] = {
                    id: topping.id,
                    name: topping.name,
                    count: 1
                }
            }
            return acc;
    }, {});
    const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count);
    return sortedToppings;
}

export default function ToppingsFilter({activeTopping}) {
    // Get a list of toppings
    // Get a list of all the pizzas with their toppings
    const {toppings, pizzas} = useStaticQuery(graphql`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                    vegetarian
                }
            }
            pizzas: allSanityPizza {
                nodes {
                    toppings {
                        name
                        id
                    }
                }
            }
        }
    `);
    console.clear();
    console.log({toppings, pizzas});    
    // Count how many pizzas are in each topping
    const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
    console.log(toppingsWithCounts);
    
    // Loop over the list of toppings and display the topping and the count of pizzas in that topping
    return (
        <ToppingStyles>
            <Link to="/pizzas">
                <span className="name">All</span>
                <span className="count">{pizzas.nodes.length}</span>
            </Link>
            {toppingsWithCounts.map(topping => (
                <Link to={`/topping/${topping.name}`} key={topping.id}>
                    <span className="name">{topping.name}</span>
                    <span className="count">{topping.count}</span>
                </Link>
            ))}
        </ToppingStyles>        
    );
}
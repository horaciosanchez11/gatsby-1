import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({graphql, actions}) {
    // 1. get template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js'); 
    // 2. query all pizzas
    const {data} = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // 3. loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current
            }
        });
    });
}

async function turnToppingsIntoPages({graphql, actions}) {
    const toppingTemplate = path.resolve('./src/pages/pizzas.js');
    const {data} = await graphql(`
        query {
            toppings: allSanityTopping {
                nodes {
                    name
                    id
                    vegetarian
                }
            }
        }
    `);
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                toppingRegex: `/${topping.name}/i`
            }
        });
    });
}

async function fetchBeersAndTurnIntoNodes({actions, createNodeId, createContentDigest}) {
    // fetch list of beers
    const res = await fetch('https://api.sampleapis.com/beers/ale');
    const beers = await res.json();
    // loop over each one
    for (const beer of beers) {
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: [],
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer)
            }
        };
        actions.createNode({
           ...beer,
           ...nodeMeta 
        });
    }
    // create a node for that beer
}

async function turnSlicemastersIntoPages({graphql, actions}) {
    const {data} = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);

    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    Array.from({ length: pageCount }).forEach((_, i) => {
        actions.createPage({
            path: `/slicemasters/${i + 1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            // This data is pass to the template when we create it
            context: {
                skip: i * pageSize,
                currentPage: i + 1,
                pageSize,
            }
        })
    });
}

export async function sourceNodes(params) {
    // fetch list of beers and source them into Gatsby API
    await Promise.all([
        fetchBeersAndTurnIntoNodes(params)
    ]);
}

// special function name from Gatsby
export async function createPages(params) {
    // create pages dynamically
    // Pizzas // Toppings
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
        turnSlicemastersIntoPages(params)
    ]);
    
    // Slicemasters
}
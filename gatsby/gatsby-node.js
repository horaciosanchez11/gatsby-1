import path from 'path';

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

// special function name from Gatsby
export async function createPages(params) {
    // create pages dynamically
    // Pizzas // Toppings
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params)
    ]);
    
    // Slicemasters
}
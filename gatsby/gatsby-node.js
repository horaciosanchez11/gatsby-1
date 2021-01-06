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
    console.log(data);
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

// special function name from Gatsby
export async function createPages(params) {
    // create pages dynamically
    // Pizzas
    await turnPizzasIntoPages(params);
    // Toppings
    // Slicemasters
}
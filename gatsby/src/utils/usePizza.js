import { useState } from "react";

export default function usePizza({pizzas, inputs}) {
    // 1. create state to hold order
    const [order, setOrder] = useState([]);

    // 2. make function to add pizzas to order
    function addToOrder(orderedPizza) {
        setOrder([...order, orderedPizza]);
    }

    // 3. make a function to remove pizzas from order
    function removeFromOrder(index) {
        setOrder([
            ...order.slice(0, index),
            ...order.slice(index + 1)
        ]);
    }

    // 4. send data to serverless function when they checkout
    return {
        order,
        addToOrder,
        removeFromOrder
    }
}
import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import calculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";

export default function usePizza({pizzas, values}) {
    // 1. create state to hold order
    //const [order, setOrder] = useState([]);
    const [order, setOrder] = useContext(OrderContext);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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

    // function that is run when someone submits the place order form
    async function submitOrder(e) {
        e.preventDefault();
        
        setLoading(true);
        setError(null);
        //setMessage(null);
        // gather all the data that needs to be sent
        const body = {
            order: attachNamesAndPrices(order, pizzas),
            total: formatMoney(calculateOrderTotal(order, pizzas)),
            name: values.name,
            email: values.email,
            mapleSyrup: values.mapleSyrup
        }

        // 4. send data to serverless function when they checkout
        const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'            
            },
            body: JSON.stringify(body),
        });

        const text = JSON.parse(await res.text());

        if (res.status >= 400 && res.status < 600) {
            setLoading(false);
            setError(text.message);
        }  else {
            setLoading(false);
            setMessage('Success!');
        }
    }    

    return {
        order,
        addToOrder,
        removeFromOrder,
        error,
        loading,
        message,
        submitOrder
    }
}
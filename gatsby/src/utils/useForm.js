import { useState } from 'react';

export default function useForm(defaults) {
    const [values, setValues] = useState(defaults);

    function updateValues(e) {
        //check if it is a number and convert
        let value = e.target.value;
        if (e.target.type === 'number') {
            value = parseInt(e.target.value);
        }

        setValues({
            // copy existing values into it
            ...values,
            // update new values that changed
            [e.target.name]: value
        });
    }

    return {values, updateValues};
}
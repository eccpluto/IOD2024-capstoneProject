// use this hook to streamline form input callbacks,
// call with the inialvalue you want to set
import { useState } from "react";

// an array of inputProps and a reset callback
export default function useFormInput(initialValue = '') {
    // manage value state internally
    const [value, setValue] = useState(initialValue);

    // update internal state
    function handleChange(e) {
        setValue(e.target.value);
    }

    // reset to empty string
    const reset = () => {
        setValue('');
    }

    const inputProps = {
        value: value,
        onChange: handleChange
    }

    return [inputProps, reset];
}
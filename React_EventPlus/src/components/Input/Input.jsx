import React, { useState } from 'react';

const Input = ({onChance, type, placeholder, name, value}) => {
    //const[numero1, setNumero1] = useState();//dados do componente

    return (
        <>
            <input type={type} placeholder={placeholder} name={name} value={value} 
            onChange={onChance}
            />
            <span> {value} </span>
        </>
    );
};

export default Input;
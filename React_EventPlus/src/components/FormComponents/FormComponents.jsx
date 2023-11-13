import React from 'react';
import "./FormComponents.css"

export const Input = ( {
    type,
    id,
    value,
    required,
    additionalClass,
    name,
    placeholder,
    manipulationFuntion
} ) => {
    return(
        <input 
            type={type} 
            id={id}
            value={value}
            required={required ? "required" : ""}
            className={`input-component ${additionalClass}`}
            name={name}
            placeholder={placeholder}
            onChange={manipulationFuntion}
            autoComplete='off'
        />
    )
};

export const Label = ( {
    htmlFor,
    labelText
} ) => {
    return(
        <label htmlFor={htmlFor}> {labelText} </label>
    );
}

export const Button = ( {
    textButton,
    id,
    name,
    additionalClass,
    type,
    manipulationFuntion
} ) => {
    return(
        <button
            id={id}
            name={name}
            className={additionalClass}
            type={type}
            onClick={manipulationFuntion}
        >
            {textButton}
        </button>
    );
}

export const Select = ( {
    required,
    id,
    name,
    options,
    manipulationFuntion,
    additionalClass = "",
    defaultValue
    
} ) => {
    return(
        <select 
            name={name} 
            id={id} 
            required={required ? "required" : ""}
            className={`input-component ${additionalClass}`}
            onChange={manipulationFuntion}
            value={defaultValue}
        >
            <option value="">Selecione</option>

            {options.map((o) => {
                return(
                    <option key={Math.random()} value={o.value}>{o.text}</option>
                );
            })}
        </select>
    );
}
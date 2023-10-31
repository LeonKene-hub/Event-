import React from "react";
import './Titulo.css'

function Title(props) {
    return(
        <h1 className="title">{props.titulo}</h1>
    );
}

export default Title
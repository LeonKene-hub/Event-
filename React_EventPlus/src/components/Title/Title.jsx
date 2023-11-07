import React from "react";
import './Title.css'

const Title = ( {titleText, color = "", titleClass = ""} ) => {
    return(
        <h1 className={`title ${titleClass}`} style={ {color: color} }>
            {titleText}
            <hr 
                className="title__underscore"
                style={ 
                    color !== "" ? {borderColor: color} : {}
            }
            />
        </h1>
    );
}

export default Title
import React from 'react';
import 'ImageIllustrator.css'
import tipoEventoImage from "../../assets/images/tipo-evento.svg"

const ImageIllustrator = ( {altText, imageName, addicionalClass} ) => {

    let imageResource

    switch (imageName) {
        case "tipo-evento":
            imageResource = tipoEventoImage
            break;
    
        default:
            break;
    }
    return (
        <figure className='illustrator-box'>
            <img 
                src={imageResource} 
                alt={altText} 
                className={`illustrator-box__image ${addicionalClass}`}
            />
        </figure>
    );
};

export default ImageIllustrator;
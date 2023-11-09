import React from 'react';
import './VisionSection.css'

import Title from "../Title/Title"

const VisionSection = () => {
    return (
        <section className='vision'>
            <div className="vision__box">
                <Title titleText="Visao" color='white' titleClass='vision__title'/>

                <p className="vision__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor id assumenda placeat amet ipsum explicabo delectus quidem nisi, aliquid laborum quam quia minima quae, libero molestias qui iste tenetur aspernatur!
                </p>
            </div>
        </section>
    );
};

export default VisionSection;
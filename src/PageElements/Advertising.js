import React from 'react';
import advertising from './../img/depositphotos_150942246-stock-photo-digital-tablet-with-business-concept.jpg';
import './../css/index.css';

export default function Advertising() {
    return (
        <div className="center">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <br/>
                        <img src={advertising} alt="advertising"/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

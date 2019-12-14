import React from 'react';

import Basket from './Basket';

export default function Delivery() {
    return (
        <div>
            <h1 className="mt-4" id="delivery">Доставка</h1>
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <Basket/>

                        <br/>
                        <p><label><b>Адрес:</b> <input id="address" type="text" required placeholder="ул. Садовая, дом 123, квартира 123"/></label></p>
                        <p><label><b>Номер телефона:</b> <input id="phone_number" type="text" required placeholder="+7 (123) 456-78-91"/></label></p>
                        <button type="button" className="btn btn-primary" onClick="order();">Заказать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

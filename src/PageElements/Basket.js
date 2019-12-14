import React from 'react';

export default function Basket() {
    return (
        <div>
            <p><b>Корзина</b></p>
            <table id="table-pizza" className="mt-4 center">
                <caption>Корзина с пиццами</caption>

                <thead>
                <tr>
                    <th scope="col" id="col-name">Название</th>
                    <th scope="col" id="col-number">Количество (шт)</th>
                    <th scope="col" id="col-price">Цена(руб)</th>
                    <th scope="col" id="col-delete"></th>
                </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
        </div>
    )
}

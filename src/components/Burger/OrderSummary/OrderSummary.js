import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}: {props.ingredients[igKey]}
                    </span>
                </li>
            );
        });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Auxiliary>
    );
};

export default OrderSummary;
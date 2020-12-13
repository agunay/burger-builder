import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

// This could be a functional component
class OrderSummary extends Component {
    // componentWillUpdate() {
    //     console.log('[OrderSummary] componentWillUpdate')
    // }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}: {this.props.ingredients[igKey]}
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
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
            </Auxiliary>
        );
    }
};

export default OrderSummary;
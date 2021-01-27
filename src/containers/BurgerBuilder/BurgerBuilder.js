import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentWillMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onAuthSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }    

    isPurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchaseable={this.isPurchaseable(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth = {this.props.isAuthenticated}
                    />
                </Auxiliary>
            );
            
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingredients} 
                    price={this.props.totalPrice}
                    cancelled={this.purchaseCancelHandler} 
                    continued={this.purchaseContinueHandler} 
                />  
            );
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onAuthSetRedirectPath: (path) => dispatch(actions.authSetRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
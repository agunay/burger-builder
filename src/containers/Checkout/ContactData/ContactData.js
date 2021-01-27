import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Max the Cat',
                address: {
                    street: '14 Cats Rd',
                    postcode: 'AB1 2CD',
                    email: 'max@cat.com'
                }
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                setTimeout(() => {
                    this.setState({ loading: false });
                    this.props.history.push('/');
                }, 2000);
            })
            .catch(error => {
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 2000);
            });        
    }

    render() {
        let form = (
            <form>
                <Input type="input" name="name" placeholder="Name"></input>
                <Input type="input" name="email" placeholder="Email"></input>
                <Input type="input" name="street" placeholder="Street"></input>
                <Input type="input" name="postcode" placeholder="Postcode"></input>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>            
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
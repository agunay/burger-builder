import React from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
    <Auxiliary>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div 
            className={classes.Modal} 
            style={{opacity: props.show ? '1' : '0'}}
        >
            {props.children}
        </div>
    </Auxiliary>
);

export default Modal;
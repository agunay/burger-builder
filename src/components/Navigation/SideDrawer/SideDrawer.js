import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const SideDrawer = (props) => {
    let attechedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attechedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attechedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Auxiliary>
    );
}

export default SideDrawer;
import React from 'react';
import NavItem from './NavItem';
import classes from './Navbar.css';

const navbar = () => {
    return (
        <div className={classes.Navbar} >
            <NavItem label={'24H'} />
            <NavItem label={'7D'} />
            <NavItem label={'1M'} />
        </div>
    )
};

export default navbar;
import React from 'react';
import NavItem from './NavItem';

const navbar = () => {
    return (
        <React.Fragment>
            <NavItem label={'24H'} />
            <NavItem label={'7D'} />
            <NavItem label={'1M'} />
        </React.Fragment>
    )
};

export default navbar;
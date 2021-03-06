import React, { Component } from 'react';

import classes from './Layout.css';
import Navbar from '../../components/Navigation/Navbar';

class Layout extends Component {

    render () {
        return (
            <React.Fragment>
                <Navbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default Layout;
import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <AppBar position='static' color='secondary'>
                    <Toolbar>
                        <Typography variant='title' color='inherit'>
                            Nutri Intel
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


export default NavBar;
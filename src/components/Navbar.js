import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom';

//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';



const styles={
   
}

class Navbar extends Component {
    render() {
        const { classes} = this.props;
        return (
            <AppBar>
            <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/">HomePage</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Toolbar>
        </AppBar>
        )
        
    }
}
export default withStyles(styles)(Navbar)

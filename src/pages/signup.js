import React, { Component } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppIcon from './../images/signup.png';



const styles = {
    form:{
        textAlign:'center'
    },
    image:{
        margin: '20px auto 20px auto',
        width: '70px',

    },
    pageTitle:{
        margin: '10px auto 10px auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop: 20
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
    }
};


class signup extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            email:'',
            password:'',
            errors:{},
            err_response:''
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password:this.state.password,
            username:this.state.username
        }
        //signup request
        axios.post('http://127.0.0.1:9000/user/signup',userData).then((res)=>{
            console.log(res.data );
            localStorage.setItem("user_auth",res.data.data.token);
            this.setState({
                loading: false
            });
           this.props.history.push('/login');
        }).catch((e)=>{
            this.setState({
                err_response: e.response.data.message,
                loading: false
            });
           
            
        })
    }

    handleChange= (event)=>{
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    
    render() {
        const { classes } = this.props;
        const {errors, err_response, loading} = this.state;
        return (
           <Grid container className={classes.form}>
               <Grid item sm/>
               <Grid item sm>
               <img src={AppIcon} alt="loginIcon" className={classes.image}/>
            <Typography variant="h2" className="classes.pageTitle">
            Signup
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
                <TextField id="email" name="email" label="Email" className={classes.textField} value={this.state.email} helperText={errors.email} error={errors.email? true:false} onChange={this.handleChange} fullWidth />
                <TextField id="username" name="username" label="Username" className={classes.textField} value={this.state.username}  helperText={errors.username} error={errors.username? true:false} onChange={this.handleChange} fullWidth/>
                <TextField id="password" name="password" label="Password" className={classes.textField} value={this.state.password} helperText={errors.password} error={errors.password? true:false} onChange={this.handleChange} fullWidth />
                {
                    err_response && (
                        <Typography variant="body2" className={classes.customError}>
                            {err_response}
                        </Typography>
                    )
                }
                <Button type="submit" variant="contained" color="primary" className={classes.button}>Signup</Button>
            </form>
               </Grid>
               <Grid item sm/>
               </Grid>
        )
    }
}

signup.propTypes={
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup)

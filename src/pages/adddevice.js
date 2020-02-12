import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";


const styles = {
    form:{
        textAlign:'center',
        padding:'20px'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '10px auto 10px auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop: 20
    }, card:{
        display: 'flex',
        margin: 5,
        // backgroundColor:'#6896de'
    },
    customError:{
        color: 'red',
        fontSize: '0.8rem'
    },
    content:{
        backgroundColor:'rgb(213, 224, 232)',
        padding: 30,
        
    }
};

class adddevice extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            description: '',
            attributes:'',
            loading: false,
            errors:{},
            err_response:''
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
       if(this.state.name.match(/[!@#$%^&*(),.?":{}|<>]/g)){
           this.setState({errors: {name : 'device name must not contain special characters.'
       }});
           console.log('device name must not contain special characters.');
         
           return false;
       }
       else {
          
        try {
            JSON.parse(this.state.attributes)
       } catch(e){
        this.setState({errors: {attributes : 'enter a valid JSON string for attributes'
    }});
        return false;
       }
        this.setState({errors: {name : null
    }});
   
    var deviceData = {
        name: this.state.name,
        description: this.state.description,
        attributes:  JSON.parse(this.state.attributes)
    }
    console.log('hello' );
    axios.post('http://127.0.0.1:9000/device/register',deviceData,{headers:{
        'X-Auth': localStorage.getItem("user_auth")
    }}).then((res)=>{
        console.log(res.data.data );
        this.setState({
            loading: false
        });
       this.props.history.push('/');
    }).catch((e)=>{
        this.setState({
            err_response: e.response.data.message,
            loading: false
        });
       
        
    })
    return true;
       }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.name, this.state.description);
    };

    toHome = (event)=>{
        this.props.history.push('/');
    }

    render() {

        const { classes } = this.props;
        const {errors, err_response,loading} = this.state;

        return (
            <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm >
            <AppBar position="static">
                <Toolbar>
    <Typography variant="h6" className={classes.title}>
      Add Device
    </Typography>
    <span className={classes.toolbarButtons}>
    <IconButton color="inherit" onClick={this.toHome}  aria-label="Edit">
    <HomeIcon  />
    </IconButton>
    </span>
  </Toolbar>

</AppBar>
           
        <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="name" name="name" label="name" className={classes.textField} value={this.state.name} helperText={errors.name} error={errors.name? true:false} onChange={this.handleChange} fullWidth />
            <TextField id="description"  name="description" label="description" className={classes.textField} value={this.state.description} helperText={errors.description} error={errors.description? true:false} onChange={this.handleChange} fullWidth />
            <TextField
          id="attributes"
          label="attributes"
          multiline
          rowsMax="40"
          name="attributes"
          variant="outlined"
          className={classes.textField} value={this.state.attributes} helperText={errors.attributes} error={errors.attributes? true:false} onChange={this.handleChange} fullWidth
        />
            {
                err_response && (
                    <Typography variant="body2" className={classes.customError}>
                        {err_response}
                    </Typography>
                )
            }
            <Button type="submit" variant="contained" color="primary" className={classes.button}>Add Device</Button> <br/>
            <Button onClick={this.toHome} variant="contained" color="secondary" className={classes.button}>Cancel</Button>
        </form>
  
                </Grid>
            <Grid item sm/>
        </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(adddevice))


// header: {
//     "X-Auth": <token>
// }
// body:{
    // {
	// "attributes":{
	// 	"temp": "Number",
	// 	"Humidity":"Number",
	// 	"sensorstate": "Boolean"
	// },
	// "name":"device_1_example",
	// "description":"example device"
//}
// }

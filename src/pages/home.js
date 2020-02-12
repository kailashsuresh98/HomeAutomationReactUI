import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import DeviceView from './../components/DeviceView'
import ProfileView from './../components/ProfileView'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";

import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles'

// import 
const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
    buttonLeft:{
        marginLeft: "auto",
        marginRight: -12
        // backgroundColor:"rgb(194, 198, 204)",
        // color:"rgb(2, 96, 247)"
    },
    elements:{
        backgroundColor:'rgb(213, 224, 232)'
    },
    toolbarButtons: {
        marginLeft: "auto",
        marginRight: -12
      }

 
  };

 
export class home extends Component {
  
            
    state = {
        devices: null,
        token: localStorage.getItem("user_auth"),
        username: null,
        email: null,
        role: null

    };

    toAddDevice = (event)=>{
        this.props.history.push('/adddevice');
    }

    componentDidMount(){
        if(! localStorage.getItem('user_auth')){
            this.props.history.push('/login');
        }
        axios.get('http://127.0.0.1:9000/device/list',{headers:{
            'X-Auth': localStorage.getItem("user_auth")
        }}).then((res)=>{
            console.log(res.data);
            this.setState({
                devices: res.data.data
            });
        });
        axios.get('http://127.0.0.1:9000/user/user',{headers:{
            'X-Auth': localStorage.getItem("user_auth")
        }}).then((res)=>{
            console.log(res.data);
            this.setState({
                username: res.data.data.username,
                email: res.data.data.email,
                role: res.data.data.role
            });
        });
    }
    render() {
        const {classes} = this.props;
       
     
        var device_list = this.state.devices ? ( 
            this.state.devices.map(device=>(<DeviceView key={device._id} devid={device._id} device={device}/>
            ))
        ) : <p>Create Devices to view.</p>;
        if(device_list.length === 0){
            device_list = <p>Enroll Devices to view.</p>;
        }

        var profile = <ProfileView username={this.state.username} email={this.state.email} role={this.state.role} />;
      
        return (
       <Grid container spacing={5} className={classes.elements}>

           <Grid item >
          
               <Grid container item> 
               <AppBar position="static">
                <Toolbar>
    <Typography variant="h6" className={classes.title}>
      Devices
    </Typography>
    <span className={classes.toolbarButtons}>
    <IconButton color="inherit" onClick={this.toAddDevice} aria-label="Edit">
    <AddIcon  />
    </IconButton>
    </span>
  </Toolbar>

</AppBar>
                   {device_list}   
                </Grid>
           </Grid>
           <Grid item >
               <Grid container item>
            {profile}
            </Grid>
            </Grid>
       </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(home))

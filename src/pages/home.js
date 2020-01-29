import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import DeviceView from './../components/DeviceView'
import ProfileView from './../components/ProfileView'


export class home extends Component {

    
    state = {
        devices: null,
        token: localStorage.getItem("user_auth"),
        username: null,
        email: null,
        role: null

    };

    componentDidMount(){
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
        if(! localStorage.getItem('user_auth')){
            this.props.history.push('/login');
        }
        var device_list = this.state.devices ? ( 
            this.state.devices.map(device=>(<DeviceView key={device._id} device={device}/>
            ))
        ) : <p>Create Devices to view.</p>;
        if(device_list.length === 0){
            device_list = <p>Enroll Devices to view.</p>;
        }

        var profile = <ProfileView username={this.state.username} email={this.state.email} role={this.state.role} />;
      
        return (
       <Grid container spacing={10}>
           <Grid item sm={8} xs={12} >
               <Grid container item>
                   {device_list}   
                </Grid>
           </Grid>
           <Grid item sm={4} xs={12}>
               <Grid container item>
            {profile}
            </Grid>
            </Grid>
       </Grid>
        )
    }
}

export default home

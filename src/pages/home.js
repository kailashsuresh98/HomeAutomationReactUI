import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import DeviceView from './../components/DeviceView'



export class home extends Component {
    state = {
        devices: null
    };
    componentDidMount(){
        axios.get('/device/list',{headers:{
            'X-Auth':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNub3dAZ21haWwuY29tIiwiaWF0IjoxNTc4MDMxMzIxfQ.psLhsiLl1QsuTmtRrgEknL263tZrXIjlW4ArEcfQXvY'
        }}).then((res)=>{
            console.log(res.data);
            this.setState({
                devices: res.data.data
            });
        })
    }
    render() {
        var device_list = this.state.devices ? ( 
            this.state.devices.map(device=>(<DeviceView key={device._id} device={device}/>
            ))
        ) : <p>Loading</p>;
      
        return (
       <Grid container spacing={10}>
           <Grid item sm={8} xs={12} >
               <Grid container item>
                   {device_list}   
                </Grid>
           </Grid>
           <Grid item sm={4} xs={12}>
            <p>
                Profile.....
                </p>
               </Grid>
       </Grid>
        )
    }
}

export default home

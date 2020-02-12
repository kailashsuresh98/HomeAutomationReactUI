import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { withRouter } from 'react-router-dom' 
//Mui
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


import { Typography } from '@material-ui/core'

const styles={
    card:{
        display: 'flex',
        margin: 5,
        width:'400px'
        // backgroundColor:'#6896de'
    },
    content:{
        padding: 30,
        
    }
}

class DeviceView extends Component {
    devid = this.props.devid;
    // deleteDevice = (event)=>{
    //     console.log(this.devid)
    //     axios.delete(`http://127.0.0.1:9000/device/deletedevice/${this.devid}`,{headers:{
    //         'X-Auth': localStorage.getItem("user_auth")
    //     }}).then((res)=>{
    //         console.log(res.data);
    //         this.props.history.push('/');
    //     });

    // }
    render() {
        const { classes, device: {
            name, description,owner_id, enabled, deleted, token
        }} = this.props;
        return (
            <Card variant="outlined" className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2">
                        {`description: ${description}`}
                    </Typography>
                    {/* <Typography variant="body2">
                        {`owner: ${owner_id}`}
                    </Typography>
                    <Typography variant="body2">
                        {`token: ${token}`}
                    </Typography>
                    <Typography variant="body2">
                        {`enabled: ${enabled}`}
                    </Typography>
                    <Typography variant="body2">
                        {`deleted: ${deleted}`}
                    </Typography> */}
                </CardContent>
                <CardActions>
                <Button variant="contained" color="inherit" className={classes.button}><Link to={{ pathname: '/devicedetail', state: { device: this.props.device} }}>view</Link></Button>
                
      </CardActions>
            </Card>
            
        )
    }
}

export default withRouter(withStyles(styles)(DeviceView))

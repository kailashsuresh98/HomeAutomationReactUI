import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import axios from 'axios';

import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const styles = {
    card:{
        display: 'flex',
        margin: 5,
        width:'400px'
        // backgroundColor:'#6896de'
    },
    content:{
        padding: 30,
        
    }

 
  };

class devicedetails extends Component {
    device = this.props.location.state.device
    constructor(props){
        super(props);

        this.state={
            device: this.device,
            data:{}
        }
    }
    intervalID;


    componentDidMount() {
        /*
          need to make the initial call to getData() to populate
         data right away
        */
        this.getData(this.device._id,this.device.token);

        /*
          Now we need to make it run at a specified interval,
          bind the getData() call to `this`, and keep a reference
          to the invterval so we can clear it later.
        */
        this.intervalID = setInterval(this.getData.bind(this), 5000);
      }

      componentWillUnmount() {
        /*
          stop getData() from continuing to run even
          after unmounting this component
        */
        clearInterval(this.intervalID);
      }

      getData = (deviceId, deviceToken) => {
        console.log(this.device);
        axios.get(`http://127.0.0.1:9000/devicedata/getstate/${this.device._id}`,{headers:{
            'X-Auth': this.device.token
        }}).then((res)=>{
            console.log(res.data.data)

            this.setState({
                data: res.data.data
            });
        });

        // do something to fetch data from a remote API.
      }



    render() {
        const {classes} = this.props;

        return (
            <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.content}>
                <Typography variant="h5">
                    {this.device.name}
                </Typography>
                <Typography variant="body2">
                    {`description: ${this.device.description}`}
                </Typography>
                <Typography variant="body2">
                    {`data: ${JSON.stringify(this.state.data.data)}`}
                </Typography>
                <Typography variant="body2">
                    {`owner: ${this.device.owner_id}`}
                </Typography>
                <Typography variant="body2">
                    {`token: ${this.device.token}`}
                </Typography>
                <Typography variant="body2">
                    {`enabled: ${this.device.enabled}`}
                </Typography>
                <Typography variant="body2">
                    {`deleted: ${this.device.deleted}`}
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" color="inherit" className={classes.button}><Link to={{ pathname: '/' }}>Back</Link></Button>
            
  </CardActions>
        </Card>
        )
    }
}

export default withRouter(withStyles(styles)(devicedetails))

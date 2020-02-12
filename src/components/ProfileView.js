import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 

import withStyles from '@material-ui/core/styles/withStyles'

//Mui
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import axios from 'axios'

const styles={
    card:{
        maxWidth: 345,
        display: 'flex',
        //backgroundColor:'#6896de'
    },
    content:{
        padding: 30
    }
}

class ProfileView extends Component {
    logout = (event)=>{
        event.preventDefault();
        axios.delete('http://127.0.0.1:9000/user/logout',{headers:{
            'X-Auth': localStorage.getItem("user_auth")
        }}).then((res)=>{
            if(res.data.status === 200){
                console.log(res.data);
                localStorage.removeItem("user_auth");
                this.props.history.push('/login');
            }
        });
    }

    toAddDevice = (event)=>{
        event.preventDefault();
        this.props.history.push('/adddevice');
    }

  render() {
    const { classes, username, email, role} = this.props;
    return (
      <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h5">
                        {username}
                    </Typography>
                    <Typography variant="body2">
                        {`username: ${email}`}
                    </Typography>
                    <Typography variant="body2">
                        {`role: ${role}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.logout}>Logout</Button>
                </CardActions>
            </Card>
    )
  }
}

export default withRouter(withStyles(styles)(ProfileView))

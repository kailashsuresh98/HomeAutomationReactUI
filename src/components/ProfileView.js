import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles'

//Mui
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core'

const styles={
    card:{
        display: 'flex',
        margin: 5,
        // backgroundColor:'#6896de'
    },
    content:{
        padding: 30,
        
    }
}

class ProfileView extends Component {
  render() {
    const { classes, username, email, role} = this.props;
    return (
      <Card variant="outlined" className={classes.card}>
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
            </Card>
    )
  }
}

export default withStyles(styles)(ProfileView)

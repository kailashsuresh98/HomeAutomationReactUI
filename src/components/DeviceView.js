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

class DeviceView extends Component {
    render() {
        const { classes, device: {
            name, owner_id, enabled, deleted
        }} = this.props;
        return (
            <Card variant="outlined" className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="body2">
                        {`owner: ${owner_id}`}
                    </Typography>
                    <Typography variant="body2">
                        {`enabled: ${enabled}`}
                    </Typography>
                    <Typography variant="body2">
                        {`deleted: ${deleted}`}
                    </Typography>
                </CardContent>
            </Card>
            
        )
    }
}

export default withStyles(styles)(DeviceView)

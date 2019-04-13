import React, {Component} from 'react'
import propTypes from 'prop-types'
import {withStyles, Card, List, CardHeader, CardContent, Typography, ListItem, ListItemText} from '@material-ui/core'
import axios from 'axios'
import {config} from '../config'

const styles = theme => ({
    card: {

    },
    economic: {
        width: '40%',
        margin: 20,
        float: 'left'
    },
    nutrition: {
        width: '40%',
        margin: 20,
        overflow: 'auto',
        float: 'right'
    }
})

class Calculate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: null
        }
    }

    componentDidMount() {
        const {planId, planFoodId} = this.props
        const data = {
            planId: planId,
            planFoodId: planFoodId
        }
        console.log(data)
        axios({
            method: 'POST',
            url: `${config.host}:${config.port}/${config.paramOpt}`,
            responseType: 'json',
            data: data
        })
        .then(res => {
            console.log(res.data)
            this.setState({result: res.data})
        })
    }


    render() {
        const {step, classes, planId} = this.props
        const {result} = this.state

        return (
            <div>
                <h2>Result for optimize</h2>
                
                { result !== null && 
                    <div>
                    <h3>{result.text}</h3>
                    { result.status > 0 && 
                    <Card className={classes.card}>
                        <CardHeader
                            title={planId}
                            />
                        <CardContent>
                            <List className={classes.economic}>
                                <Typography component="p">
                                    Cost: {result.economic.cost}
                                </Typography>
                                {result.economic.weight.map((value, key) => (
                                    <ListItem key={key} role={undefined} dense button>
                                        <ListItemText primary={value[1]} />
                                        <ListItemText primary={value[2] * 100 + ' g'} />
                                    </ListItem>
                                ))}
                            </List>
                            <List className={classes.nutrition}>
                                <Typography component="p">
                                    Bang dinh duong
                                </Typography>
                                {Object.keys(result.nutrition).map((value, key) => 
                                (
                                    <ListItem key={key} role={undefined} dense button>
                                        <ListItemText primary={value} />
                                        <ListItemText primary={result.nutrition[value]} />
                                    </ListItem>
                                )
                                )}
                            </List>
                        </CardContent> 
                    </Card>
                    }
                    </div>
                }
                <button onClick={() => this.props.prevStep(step)}>Back</button>
            </div>
        )
    }
}

Calculate.propTypes = {
    classes: propTypes.object.isRequired
}

export default withStyles(styles)(Calculate)
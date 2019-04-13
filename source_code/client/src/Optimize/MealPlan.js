import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    withStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid
} from '@material-ui/core'
import logo from '../static/yummy.png'

const styles = theme => ({
    card: {
        maxWidth: 345,
        maringBottom: 30
    },
    action: {
        width: 345,
        height:  320,
    },
    media: {
        height: 160,
    },
});


class MealPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this._selectPlan = this._selectPlan.bind(this)
    }
    _selectPlan = (_idPlan) => {
        this.props.setPlanId(_idPlan)
        const {step} = this.props
        this.props.nextStep(step)
    }
        
    render() {
        const {mealPlans, classes} = this.props
        return (
            <div>
                <h2 style={{margin: 20}}>Choose a diet plan</h2>
                { mealPlans !== null &&
                <Grid
                container
                direction="row"
                spacing={24}
                >
                {mealPlans.map((element, key) => {
                    // console.log(element)
                    return (
                    <Grid
                        key={key}
                        item xs={4}
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <Card className={classes.card}>
                            <CardActionArea className={classes.action} onClick={() => this._selectPlan(element._id)}>
                                <CardMedia
                                    className={classes.media}
                                    image={logo}
                                    title="Meal"
                                    />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {element.name}
                                </Typography>
                                <Typography component="p">
                                    {element.description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small"  color="primary">
                                    Information
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    )
                })}
                </Grid>
                }
            </div>
        )
    }
}

MealPlan.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MealPlan)
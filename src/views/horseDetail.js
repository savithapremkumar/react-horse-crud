import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { horseAction } from '../redux/actions';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import EditHorse from '../components/Horse';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { LoadingMessage } from "../config/messages";


class HorseDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readOnly: true,
            validationError: false,
            validationErrMsg: '',
            name: '',
            food: '',
            height: '',
            weight: ''
        };
    }

    // handleChange = prop => event => {
    //     const { dispatch } = this.props;
    //     dispatch(horseAction.onChangeProps(prop, event));
    // };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params.id) {
            const { dispatch } = this.props;
            dispatch(horseAction.getHorseById(params.id));
        }

    }


    handleClick = (event) => {
        this.setState((prevState) => ({
            readOnly: !prevState.readOnly
        }));

    }

    buildPayload = () => {
        //optional profile params
        const profileExists = this.state.food !== '' || this.state.height !== '' || this.state.weight !== '';
        const profile = profileExists ? {} : null;
        if (this.state.food !== '') {
            profile.favouriteFood = this.state.food;
        }
        if (this.state.height !== '' && this.state.weight !== '') {
            profile.physical = {};
            profile.physical.height = parseInt(this.state.height);
            profile.physical.weight = parseInt(this.state.weight);

        }
        else {
            if (this.state.height !== '') {
                profile.physical = {}
                profile.physical.height = parseInt(this.state.height);
            }
            if (this.state.weight !== '') {
                profile.physical = {}
                profile.physical.weight = parseInt(this.state.weight);
            }
        }

        const payload = {
            "name": this.state.name
        };
        profile !== null && (payload.profile = profile);

        return payload;
    }

    handleSubmit = event => {
        const { match: { params } } = this.props;
        const { dispatch } = this.props;
        //Ensure name is not empty
        this.state.name === '' ? (this.setState({ validationError: true, validationErrMsg: 'Name is required' })) :
        dispatch(horseAction.editHorseInfo(params.id, this.buildPayload()));
    };
    static getDerivedStateFromProps(props, state) {
        if (props.name !== state.name && state.readOnly) {
            return {
                name: props.name,
                food: props.food,
                height: props.height,
                weight: props.weight
            };
        }
        // Return null to indicate no change to state.
        return null;
    }
    render() {

        return (
            this.state.loading ? (
                <Loader message={LoadingMessage} />
            ) : this.state.error ? (<Error errorMsg={this.state.errorMsg} />) :
                    (<div className="horse-detail">
                        <Button text='Edit Horse' disabled={!this.state.readOnly} onClick={this.handleClick}></Button>
                        <EditHorse readOnly={this.state.readOnly} name={this.state.name} food={this.state.food} height={this.state.height} weight={this.state.weight} display={true} handleSubmit={this.handleSubmit} handleChange={this.handleChange} onCancelClick={this.handleClick} error={this.validationError} errMsg={this.validationErrMsg}></EditHorse>
                    </div>)

        );
    }
}


HorseDetail.propTypes = {
    name: PropTypes.string,
    food: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number
};


const mapStateToProps = (state) => {
    return {
        name: state.horse.name,
        food: state.horse.favourite_food,
        height: state.horse.height,
        weight: state.horse.weight
    };
}


const connectedHorseDetailPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})((HorseDetail)));

export { connectedHorseDetailPage as HorseDetail };
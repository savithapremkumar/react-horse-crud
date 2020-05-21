import { connect } from 'react-redux';
import { horseAction } from '../redux/actions';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import AddHorse from '../components/Horse';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { LoadingMessage } from "../config/messages";


class HorseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddHorse: false,
            name: '',
            food: '',
            height: '',
            weight: '',
            validationError: false,
            validationErrMsg: ''
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(horseAction.getHorse());
    }
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleClick = event => {
        this.setState((prevState) => ({
            showAddHorse: !prevState.showAddHorse,
            name: '',
            food: '',
            height: '',
            weight: ''
        }));
    };

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
        const { dispatch } = this.props;
        this.state.name === '' ? (this.setState({ validationError: true, validationErrMsg: 'Name is required' })) :
            dispatch(horseAction.createHorse(this.buildPayload()));
    };


    render() {
        const { horse } = this.props.horse;

        return (
            this.state.loading ? (
                <Loader message={LoadingMessage} />
            ) : this.state.error ? (<Error errorMsg={this.state.errorMsg} />) :
                    (<div className="home">
                        <div className="horses">
                            <div className="header">Click on a horse to view its stats</div>
                            {horse.map(n => {
                                return (
                                    <div className='row' key={n.id}>
                                        <a href={`/horse-detail/${n.id}`}>
                                            {n.name}
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="buttonContainer">
                            <Button text='Add Horse' disabled={this.state.showAddHorse} onClick={this.handleClick}></Button>
                        </div>
                        <AddHorse readOnly={false} name={this.state.name} food={this.state.food} height={this.state.height} weight={this.state.weight} display={this.state.showAddHorse} handleSubmit={this.handleSubmit} handleChange={this.handleChange} onCancelClick={this.handleClick} error={this.validationError} errMsg={this.validationErrMsg}></AddHorse>
                    </div>)

        );
    }
}


HorseList.propTypes = {
    horse: PropTypes.object,
    id: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        horse: state.horse
    };
}

const connectedHorseListPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})((HorseList)));

export { connectedHorseListPage as HorseList };
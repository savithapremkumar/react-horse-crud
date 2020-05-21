import { horseService } from '../../services';
import { history } from '../../helpers';

export const horseAction = {
    getHorse,
    getHorseById,
    onChangeProps,
    editHorseInfo,
    createHorse
};

function getHorse() {
    return dispatch => {
        let apiEndpoint = 'horse';
        horseService.get(apiEndpoint)
            .then((response) => {
                console.log(response);
                dispatch(changeHorsesList(response.data));
            }).catch((err) => {
                dispatch(error(err.message));
                console.log("Error");
                console.log(err);
            })
    };
}

function createHorse(payload) {
    return dispatch => {
        let apiEndpoint = 'horse/';
        horseService.put(apiEndpoint, payload)
            .then((response) => {
                dispatch(createHorseInfo());
            }).catch((err) => {
                dispatch(error(err.message));
                console.log("Error", err.message);
            })
    }
}

function getHorseById(id) {

    return dispatch => {
        let apiEndpoint = 'horse/' + id;
        horseService.get(apiEndpoint)
            .then((response) => {
                console.log(response.data);
                dispatch(editHorsesDetails(response.data));
            }).catch((err) => {
                dispatch(error(err.message));
                console.log("Error");
                console.log(err);
            })
    };
}

function onChangeProps(props, event) {
    return dispatch => {
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editHorseInfo(id, payload) {
    return dispatch => {
        let apiEndpoint = 'horse/' + id;
        horseService.put(apiEndpoint, payload)
            .then((response) => {
                dispatch(updatedHorseInfo());
                history.push('/');
            }).catch((err) => {
                dispatch(error(err.message));
                console.log("Error");
                console.log(err);
            })
    }
}

export function changeHorsesList(horse) {
    return {
        type: "FETCHED_ALL_HORSE",
        horse: horse
    }
}

export function handleOnChangeProps(props, value) {
    return {
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editHorsesDetails(horse) {
    return {
        type: "HORSE_DETAIL",
        id: horse.id,
        name: horse.name,
        favourite_food: horse.profile.favouriteFood !== null ? horse.profile.favouriteFood : '',
        height: horse.profile.physical !==null && horse.profile.physical.height !== null ? horse.profile.physical.height : '',
        weight: horse.profile.physical !== null && horse.profile.physical.weight !== null ? horse.profile.physical.weight : ''
    }
}

export function updatedHorseInfo() {
    return {
        type: "HORSE_UPDATED"
    }
}

export function createHorseInfo() {
    return {
        type: "HORSE_CREATED_SUCCESSFULLY"
    }
}

export function error(err) {
    return {
        type: "ERROR",
        errMsg: err

    }
}


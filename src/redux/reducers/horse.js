const initialState = {
    horse: [],
    id: '',
    name: '',
    favourite_food: '',
    height: '',
    weight: '',
    error: false,
    errorMsg: '',
    loading: true
};


export function horse(state = initialState, action) {
    switch (action.type) {
        case 'FETCHED_ALL_HORSE':
            return {
                ...state,
                horse: action.horse,
                loading: false
            };
        case 'HORSE_DETAIL':
            return {
                ...state,
                id: action.id,
                name: action.name,
                favourite_food: action.favourite_food,
                height: action.height,
                weight: action.weight,
                loading: false
            };
        case "HORSE_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };
        case "ERROR":
            return {
                ...state,
                error: true,
                errorMsg: action.errorMsg,
                loading: false
            };
        default:
            return state
    }
}
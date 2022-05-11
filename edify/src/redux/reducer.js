import { combineReducers } from 'redux'

const tutorsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SELECT_TUTOR':
            return {
                ...state,
                id: action.payload.id
            };
        
        case 'SET_TUTORS':
            return {
                ...state,
                tutors: action.payload.tutors
            };

        default: return state
    }
}

const userReducer = (state={}, action) => {
    switch (action.type) {

        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                userType: action.payload.userType
            };

        default: return state            
    }
}

const rootReducer = combineReducers({
    tutors: tutorsReducer,
    user: userReducer
});

export default rootReducer;
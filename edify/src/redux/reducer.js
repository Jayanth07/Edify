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

const rootReducer = combineReducers({
    tutors: tutorsReducer
});

export default rootReducer;
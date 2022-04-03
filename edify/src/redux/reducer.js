import { combineReducers } from 'redux'

const tutorsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SELECT_TUTOR':
            return {
                ...state,
                id: action.payload.id
            };
        
        default: return state
    }
}

const rootReducer = combineReducers({
    tutors: tutorsReducer
});

export default rootReducer;
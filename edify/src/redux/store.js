import { createStore } from 'redux'
import rootReducer from './reducer'

function configureStore() {
    return createStore(
        rootReducer,
        {
            tutors: {
                id: undefined
            }
        }
    );
} 

export default configureStore;
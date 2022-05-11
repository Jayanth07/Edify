import { createStore } from 'redux'
import rootReducer from './reducer'
import { createBrowserHistory } from 'history';

function configureStore() {
    return createStore(
        rootReducer,
        {
            tutors: {
                id: undefined
            },
            user: {
                token: undefined,
                userType: undefined 
            }
        }
    );
} 

export default configureStore;
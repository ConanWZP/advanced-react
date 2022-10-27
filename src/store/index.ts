import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import authReducer from "./reducers/auth";
import EventReducer from "./reducers/event";


const rootReducers = combineReducers({
    auth: authReducer,
    events: EventReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))

/*export type RootState = ReturnType<typeof rootReducers>*/

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
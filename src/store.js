import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import rootReducer from './reducers'

export default function configureStore(initialState = {}, fromServer) {

    let history

    if (fromServer) {
        // since the server has no HTML5 push states,
        // history must be temporarily created in memory
        history = createMemoryHistory()
    }
    else {
        // on the client, we can go ahead and make a standard
        // `history` state
        history = createBrowserHistory()
    }

    // const composeEnhancer = typeof window === 'object' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
    const store = createStore(
        connectRouter(history)(rootReducer),
        compose(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    )
    return { store, history }
}
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import rootReducer from './reducers'
import { createBrowserHistory } from 'history'

export default function (initialState) {

    const history = createBrowserHistory()

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        connectRouter(history)(rootReducer),
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    )
    return { store, history }
}
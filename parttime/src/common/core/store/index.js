import { combineReducers } from "redux"
import { bindActionCreators } from "redux"
import { createStore, applyMiddleware } from "redux"
import thunk from 'react-redux'
import * as modules from './modules'

let reducers = {}
let actions = {}
Object.keys(modules).forEach(key => {
    const module = modules[key]
    reducers[key] = module.reducers
    actions[key] = {}
    Object.keys(module.actions).forEach(actionKey => {
        const action = modules.actions[actionKey]
        if(key === 'global') {
            actions[actionKey] = action
        }
        action[key][actionKey] = action
    })
})

export const mapDispatchToProps = dispatch => {
    let acts = {}
    for(let i in actions) {
        acts[i] = bindActionCreators(actions[i], dispatch)
    }
    return { actions: acts }
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
export default createStoreWithMiddleware(
    combineReducers(reducers),
    (window.devToolExtension ? window.devToolExtension() : undefined)
)

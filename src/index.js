import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

let cState = {};

const render = ({attempt, result}) => {

    return (
        <div className="App">
            <div>
                <p>Result: {result}</p>
                <input type="text" onChange={(event) => cState.number = event.target.value}/>
                <button label="Try" onClick={() => attempt(cState.number)}>Click</button>
            </div>
        </div>
    );
};

const ATTEMPT = 'ATTEMPT';

let reduceState = (state = { result: 'INVALID' }, action) => {
    switch (action.type) {
        case ATTEMPT:
            console.log('reduceState');
            return Object.assign({}, state, { result: action.value === "42" ? 'CORRECT' : 'INVALID' });
        default:
            return state;
    }
};

let store = createStore(reduceState);

const mapStateToProps = (state, ownProps) => {
    return {
        result: state.result
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        attempt: (number) => {
            dispatch({ type: ATTEMPT, value: number });

            console.log("op:", ownProps);

            console.log("component:" + ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <AppContainer/>
                    </Provider>));
        }
    }
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(render);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
  document.getElementById('root')
);

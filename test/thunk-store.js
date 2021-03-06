import chai, { expect } from 'chai';
import chaiRedux from '../src';
import thunk from 'redux-thunk';

chai.use(chaiRedux);

let delayedAction = (value) => dispatch => {
    setTimeout(() => {
        dispatch({ type: 'ASYNC_ACTION', value });
    }, 20);
};

let reducer = (state = { updated: false, value: null }, action) => {
    if (action.type === 'ASYNC_ACTION') {
        return { updated: true, value: action.value };
    }
    return state;
};

describe('async update', () => {

    it('should wait for state', (done) => {
        const store = chai.createReduxStore({ reducer, middleware: thunk });
        store.dispatch(delayedAction(12));
        expect(store).to.eventually.have.state({ updated: true, value: 12 }).notify(done);
    });

    it('should wait for state like', (done) => {
        const store = chai.createReduxStore({ reducer, middleware: thunk });
        store.dispatch(delayedAction(12));
        expect(store).to.eventually.have.state.like({ value: 12 }).notify(done);
    });

    it('should eventually have dispatched action ASYNC_ACTION', (done) => {
        const store = chai.createReduxStore({ reducer, middleware: thunk });
        store.dispatch(delayedAction(13));
        expect(store).to.eventually.have.dispatched('ASYNC_ACTION').notify(done);
    });

});





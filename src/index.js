import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import firebase from "./firebase";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import 'semantic-ui-css/semantic.min.css'

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

import rootReducer from "./reducers/index";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/');
            }
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
    }
}


const RootwithRouter = withRouter(Root);
const ConnectWithRedux = connect(RootwithRouter);

ReactDOM.render(<Provider store={store}>
    <Router>
        <RootwithRouter />
    </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();

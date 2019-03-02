import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import firebase from "./firebase";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import 'semantic-ui-css/semantic.min.css'

import App from './components/App';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./spinner";

import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

// Get root reducer
import rootReducer from "./reducers/index";

// Get Action
import { setUser } from "./actions/index";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {

    componentDidMount() {

        const { history, setUser } = this.props;

        firebase.auth().onAuthStateChanged(user => {

            console.log(user);
            setUser(user);

            if (user) {
                history.push('/');
            } else {
                history.push('/login');
            }
        });
    }

    render() {

        const { isLoading } = this.props;

        return isLoading ? (<Spinner />) : (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading,
});

const RootwithRouter = withRouter(connect(mapStateToProps, { setUser })(Root));

ReactDOM.render(<Provider store={store}>
    <Router>
        <RootwithRouter />
    </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();

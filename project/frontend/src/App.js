import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import routes from './routes';

import GlobalRedirect from './components/GlobalRedirect';
import GlobalAlert from './components/GlobalAlert';

class App extends React.Component {
    render() {
        return (
            <Router>
                <GlobalRedirect /> 
                <Switch>
                    {routes.map((route, idx) => {
                        return (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                component={(props) => (
                                    <route.layout {...props}>
                                        <route.component {...props}/>
                                    </route.layout>
                                )}
                            />
                        );
                    })}
                </Switch>
                <GlobalAlert />
            </Router>
        );
    }
}

export default App;

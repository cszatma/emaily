import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/App.scss';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import * as actions from '../actions';
import { DispatchProps } from '../actions';

export class App extends Component<DispatchProps> {
    public componentDidMount() {
        this.props.fetchUser();
    }

    public render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);

// @flow

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/App.scss';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import * as actions from '../actions';
import type { ThunkAction } from 'actions';

type Props = {
    fetchUser: () => ThunkAction,
};

const SurveyNew = () => <h2>SurveyNew</h2>;

export class App extends Component<Props, {}> {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);

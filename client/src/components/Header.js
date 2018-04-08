// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import type { AuthState, ReduxState } from 'redux-extensions';

type Props = {
    auth: AuthState,
};

class Header extends Component<Props, {}> {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google">Login With Google</a>
                    </li>
                );
            default:
                return (
                    <li>
                        <a href="/api/logout">Logout</a>
                    </li>
                );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Emaily
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }: ReduxState) {
    return { auth };
}

export default connect(mapStateToProps)(Header);

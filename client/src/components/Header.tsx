import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthState, ReduxState } from '../reducers';

import Payments from './Payments';

interface Props {
    auth: AuthState;
}

export class Header extends Component<Props, {}> {
    public renderContent() {
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
                // Check required for flow
                if (!this.props.auth) {
                    return;
                }

                return [
                    <li key="1">
                        <Payments />
                    </li>,
                    <li key="2" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="3">
                        <a href="/api/logout">Logout</a>
                    </li>,
                ];
        }
    }

    public render() {
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

function mapStateToProps({ auth }: ReduxState): Props {
    return { auth };
}

export default connect(mapStateToProps)(Header);

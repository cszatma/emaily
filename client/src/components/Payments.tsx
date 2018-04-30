import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { StripeToken } from '../types/models';
import { DispatchProps } from '../actions';

export class Payments extends Component<DispatchProps> {
    public handleToken = (token: StripeToken) => this.props.handleToken(token);

    public render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500} // $5 USD
                token={this.handleToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY as string}
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);

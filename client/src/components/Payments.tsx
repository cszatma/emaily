import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import { handleToken } from '@/actions';
import { StripeToken } from 'models';
import { FetchUserAction, ThunkAction } from '@actions/actionTypes';

interface Props {
    handleToken: (token: StripeToken) => ThunkAction<FetchUserAction>;
}

export class Payments extends Component<Props> {
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

export default connect(null, { handleToken })(Payments);

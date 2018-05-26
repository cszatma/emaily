import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '@/actions';
import { ReduxState, SurveyState } from '@/reducers';
import { FetchSurveysAction, ThunkAction } from '@actions/actionTypes';

interface StateProps {
    surveys: SurveyState;
}

interface Props extends StateProps {
    fetchSurveys: () => ThunkAction<FetchSurveysAction>;
}

export class SurveyList extends Component<Props> {
    public componentDidMount() {
        this.props.fetchSurveys();
    }

    public renderSurveys() {
        return this.props.surveys.reverse().map(survey => (
            <div className="card darken-1" key={survey._id}>
                <div className="card-content">
                    <span className="card-title">{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className="right">
                        Sent On:{' '}
                        {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                </div>
                <div className="card-action">
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
                </div>
            </div>
        ));
    }

    public render() {
        return <div>{this.renderSurveys()}</div>;
    }
}

function mapStateToProps({ surveys }: ReduxState): StateProps {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';

import formFields from './formFields';
import { FormValues } from './formFields';
import {
    submitSurvey as submitSurveyAction,
    ThunkAction,
    FetchUserAction,
} from '@/actions';
import { ReduxState } from '@/reducers';

interface StateProps {
    formValues: FormValues;
}

interface Props extends RouteComponentProps<any>, StateProps {
    onCancel: () => void;
    history: History;
    submitSurvey: (
        values: FormValues,
        history: History,
    ) => ThunkAction<FetchUserAction>;
}

const SurveyFormReview = ({
    onCancel,
    formValues,
    submitSurvey,
    history,
}: Props) => {
    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    const handleButtonClick = () => submitSurvey(formValues, history);

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow white-text darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button
                onClick={handleButtonClick}
                className="green white-text btn-flat right"
            >
                Send Survey<i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state: ReduxState): StateProps {
    const values = state.form.surveyForm.values;

    if (!values) {
        throw Error('Form values are undefined.');
    }

    const formValues: FormValues = {
        title: values.title,
        subject: values.subject,
        body: values.body,
        recipients: values.recipients,
    };

    return { formValues };
}

export default connect(mapStateToProps, { submitSurvey: submitSurveyAction })(
    withRouter(SurveyFormReview),
);

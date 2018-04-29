// @flow

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { RouterHistory } from 'react-router-dom';

import formFields from './formFields';
import type { FormValues } from './formFields';
import * as actions from '../../actions';
import type { ThunkAction } from 'actions';

type Props = {
    onCancel: () => void,
    formValues: FormValues,
    submitSurvey: (FormValues, RouterHistory) => ThunkAction,
    history: RouterHistory,
};

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
                onClick={() => submitSurvey(formValues, history)}
                className="green white-text btn-flat right"
            >
                Send Survey<i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

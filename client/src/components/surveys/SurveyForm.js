// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import type { FormValues } from './formFields';

type Props = {
    handleSubmit: ((FormValues) => void) => void,
    onSurveySubmit: () => void,
};

class SurveyForm extends Component<Props> {
    renderFields() {
        return formFields.map(({ label, name }) => (
            <Field
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
            />
        ));
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit,
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values: FormValues) {
    const errors = {};
    errors.recipients = validateEmails(values.recipients || '');

    formFields.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

import SurveyField from './SurveyField';
import validateEmails from '@utils/validateEmails';
import formFields from './formFields';
import { FormValues } from './formFields';

interface Props {
    onSurveySubmit: () => void;
}

class SurveyForm extends Component<
    Props & InjectedFormProps<FormValues, Props>
> {
    public renderFields() {
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

    public render() {
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
    const errors: { recipients?: string } = {};
    errors.recipients = validateEmails(values.recipients || '');

    formFields.forEach(({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm<FormValues, Props>({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);

import React, { Component } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { FormValues } from './formFields';

interface State {
    showFormReview: boolean;
}

class SurveyNew extends Component<InjectedFormProps<FormValues>, State> {
    public state = {
        showFormReview: false,
    };

    public handleCancel = () => this.setState({ showFormReview: false });
    public handleSurveySubmit = () => this.setState({ showFormReview: true });

    public renderContent() {
        return this.state.showFormReview ? (
            <SurveyFormReview onCancel={this.handleCancel} />
        ) : (
            <SurveyForm onSurveySubmit={this.handleSurveySubmit} />
        );
    }

    public render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm<FormValues>({
    form: 'surveyForm',
})(SurveyNew);

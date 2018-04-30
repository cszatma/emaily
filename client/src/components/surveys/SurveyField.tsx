import React, { InputHTMLAttributes, StatelessComponent } from 'react';
import { WrappedFieldProps } from 'redux-form';

interface Props {
    label: string;
}
const SurveyField: StatelessComponent<
    Props & WrappedFieldProps & InputHTMLAttributes<HTMLInputElement>
> = ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};

export default SurveyField;

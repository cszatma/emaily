// @flow

import React from 'react';

type Props = {
    input: {
        name: string,
        value: string | boolean,
        valid: boolean,
        invalid: boolean,
        dirty: boolean,
        pristine: boolean,
        active: boolean,
        touched: boolean,
        visited: boolean,
        autofilled: boolean,
        error?: string,
        onChange: (
            eventOrValue: SyntheticEvent<any> | string | boolean,
        ) => mixed,
        onUpdate: (
            eventOrValue: SyntheticEvent<any> | string | boolean,
        ) => mixed,
        onBlur: (eventOrValue: SyntheticEvent<any> | string | boolean) => mixed,
        onDragStart: Function,
        onDrop: Function,
        onFocus: Function,
    },
    meta: {
        active: boolean,
        autofilled: boolean,
        asyncValidating: boolean,
        dirty: boolean,
        dispatch: Function,
        error?: string,
        invalid: boolean,
        pristine: boolean,
        submitting: boolean,
        touched: boolean,
        valid: boolean,
        visited: boolean,
    },
    label: string,
};

const SurveyField = ({ input, label, meta: { error, touched } }: Props) => {
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

// @flow

import type { SurveyModel } from 'emaily-types';

import keys from '../../config/keys';

export default (survey: SurveyModel): string => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${
                            keys.redirectDomain
                        }/api/surveys/thanks">Yes</a>
                        <a href="${
                            keys.redirectDomain
                        }/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};

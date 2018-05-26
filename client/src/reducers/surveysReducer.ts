import { FETCH_SURVEYS, AnyAction } from '../actions/actionTypes';

import { Survey } from '../types/models';

export type SurveyState = Survey[];

export default function(
    state: SurveyState = [],
    action: AnyAction,
): SurveyState {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}

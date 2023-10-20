import { createSelector } from 'reselect';
import { RootState } from '../../rootReducer';

const state = ({ mortgage }: RootState) => mortgage;

export const formMortgageSelector = createSelector(state, ({ form }) => form);
export const isSubmittingSelector = createSelector(state, ({ isSubmitting }) => isSubmitting);

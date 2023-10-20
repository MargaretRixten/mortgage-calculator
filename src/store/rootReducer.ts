import { combineReducers } from '@reduxjs/toolkit';
import mortgageReducer from './slices/mortgage/mortgageSlice';

const rootReducer = combineReducers({
	mortgage: mortgageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

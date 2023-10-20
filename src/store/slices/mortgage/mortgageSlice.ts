import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMortgageFormValues, IMortgageState } from '../../../interfaces/mortgage';

const initialState: IMortgageState = {
	form: null,
	isSubmitting: false,
};

export const postMortgageForm = createAsyncThunk(
	'mortgage/postMortgageForm',
	async (form: IMortgageFormValues, { dispatch }) => {
		const response = await fetch('/api/mortgage', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(form),
		});
		try {
			dispatch(setForm(null)); //Подняла выше, чтобы форма очистилась, хоть и запрос упал
			localStorage.setItem('bankimonlineValues', JSON.stringify(form));
			const { data } = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const mortgageSlice = createSlice({
	name: 'mortgage',
	initialState,
	reducers: {
		setForm(state, action: PayloadAction<IMortgageFormValues | null>) {
			state.form = action.payload;
		},
		setIsSubmitting(state) {
			state.isSubmitting = !state.isSubmitting;
		},
	},
	// extraReducers: (builder) => {
	// 	builder.addCase(postMortgageForm.pending, () => {
	// 		console.log('Выполняется');
	// 	});
	// 	builder.addCase(postMortgageForm.fulfilled, () => {
	// 		console.log('Успешно');
	// 	});
	// 	builder.addCase(postMortgageForm.rejected, () => {
	// 		console.log('Отказано');
	// 	});
	// },
});

export const { setForm, setIsSubmitting } = mortgageSlice.actions;

export default mortgageSlice.reducer;

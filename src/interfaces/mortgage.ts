import { IOption } from './index';

export interface IMortgageState {
	form: IMortgageFormValues | null;
	isSubmitting: boolean;
}

export interface IMortgageFormValues {
	price: number;
	city: IOption | null;
	period: IOption | null;
	contribution: number;
	type_realty: IOption | null;
	own_realty: IOption | null;
	term: number | null;
	payment: number | null;
}

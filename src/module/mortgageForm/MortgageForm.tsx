import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { TextField } from '../../components/inputs/input/TextField';
import { EIcons } from '../../enums/icons.enum';
import { SelectField } from '../../components/inputs/select/SelectField';
import { PeriodOptionsMock } from '../../data/periodOptions';
import { OwnRealtyOptionsMock } from '../../data/ownRealtyOptions';
import { TypeRealtyOptionsMock } from '../../data/typeRealtyOptions';
import { RangeField } from '../../components/inputs/range/RangeField';
import { cityOptionsMock } from '../../data/cityOptions';
import { ContributionField } from '../../components/inputs/contribution/ContributionField';
import * as Yup from 'yup';
import { getValueDivisionByPercent } from '../../utils/getValueDivisionByPercent';
import { IMortgageFormValues } from '../../interfaces/mortgage';
import { useAppDispatch } from '../../store/hooks';
import { setForm } from '../../store/slices/mortgage/mortgageSlice';

export const MortgageCalc = () => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik<IMortgageFormValues>({
		initialValues: {
			price: 1000000,
			city: null,
			period: null,
			contribution: 25,
			type_realty: null,
			own_realty: null,
			term: 4,
			payment: null,
		},
		validateOnBlur: true,
		validationSchema: Yup.object().shape({
			price: Yup.number()
				.min(1000000, 'Стоимость недвижимости не может быть меньше 1,000,000')
				.max(10000000, 'Стоимость недвижимости не может превышать 10,000,000')
				.required('Это поле является обязательным для заполнения'),
			city: Yup.object()
				.shape({
					id: Yup.number(),
					option: Yup.string(),
				})
				.required('Выберите ответ'),
			period: Yup.object()
				.shape({
					id: Yup.number(),
					option: Yup.string(),
				})
				.required('Выберите ответ'),
			contribution: Yup.number()
				.min(25, 'Сумма первоначального взноса не может быть меньше 25% от стоимости недвижимости')
				.when('price', (price, schema) =>
					schema.test({
						//@ts-ignore
						test: (contribution) => getValueDivisionByPercent(price, contribution) <= price,
						message: 'Сумма первоначального взноса не может превышать стоимость недвижимости',
					}),
				)
				.required('Это поле является обязательным для заполнения'),
			type_realty: Yup.object()
				.shape({
					id: Yup.number(),
					option: Yup.string(),
				})
				.required('Выберите ответ'),
			own_realty: Yup.object()
				.shape({
					id: Yup.number(),
					option: Yup.string(),
				})
				.required('Выберите ответ'),
			term: Yup.number()
				.min(4, 'Cрок ипотеки не может быть меньше 4 лет')
				.max(30, 'Cрок ипотеки не может превышать 30 лет')
				.required('Это поле является обязательным для заполнения'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			setIsLoading(true);
			localStorage.setItem('bankimonlineValues', JSON.stringify(values));
			setTimeout(() => {
				setIsLoading(false);
				resetForm();
			}, 1000 * 2);
		},
	});

	useEffect(() => {
		dispatch(setForm(formik.values));
	}, [formik.isValid]);

	const maxContribution = useMemo(() => {
		let newMax = 25;
		if (!formik.values.own_realty?.id) return;
		switch (formik.values.own_realty.id) {
			case 1:
				newMax = 75;
				break;
			case 2:
				newMax = 70;
				break;
			default:
				newMax = 50;
				break;
		}
		formik.setFieldValue('contribution', newMax);
		return newMax;
	}, [formik.values.own_realty?.id]);

	return (
		<form className="" onSubmit={formik.handleSubmit}>
			{/*<Formik*/}
			{/*	initialValues={{*/}
			{/*		price: 1000000,*/}
			{/*		city: null,*/}
			{/*		period: null,*/}
			{/*		contribution: null,*/}
			{/*		type_realty: null,*/}
			{/*		own_realty: null,*/}
			{/*		term: null,*/}
			{/*		payment: null,*/}
			{/*	}}*/}
			{/*	// validate={}*/}
			{/*	onSubmit={(values, { resetForm }) => {*/}
			{/*		console.log(values);*/}
			{/*		setLoading(true);*/}
			{/*		setTimeout(() => {*/}
			{/*			setLoading(false);*/}
			{/*			resetForm();*/}
			{/*		}, 1000 * 2);*/}
			{/*	}}*/}
			{/*/>*/}
			<div className="form-control">
				<TextField
					label="Стоимость недвижимости?"
					iconName={EIcons.Shekel}
					error={formik.errors.price}
					onChangeTextField={(event) =>
						formik.setFieldValue('price', +event.target.value.split(',').join(''))
					}
					inputProps={{
						type: 'text',
						name: 'price',
						placeholder: 'Укажите стоимость',
						value: formik.values.price,
						// onChange: formik.handleChange,
					}}
				/>
				<SelectField
					label="Город покупки недвижимости?"
					search={true}
					options={cityOptionsMock}
					error={formik.errors.city}
					onChange={(value) => formik.setFieldValue('city', value)}
					inputProps={{
						readOnly: true,
						placeholder: 'Выберите город',
						value: formik.values.city?.option || '',
					}}
				/>
				<SelectField
					label="Когда вы планируете оформить ипотеку?"
					options={PeriodOptionsMock}
					error={formik.errors.period}
					onChange={(value) => formik.setFieldValue('period', value)}
					inputProps={{
						readOnly: true,
						placeholder: 'Выберите период',
						value: formik.values.period?.option || '',
					}}
				/>
			</div>
			<div className="form-control">
				<ContributionField
					price={formik.values.price!}
					label="Первоначальный взнос"
					iconName={EIcons.Shekel}
					error={formik.errors.contribution}
					onChangeTermValue={(value) => formik.setFieldValue('contribution', value)}
					inputProps={{
						type: 'range',
						placeholder: 'Укажите сумму',
						name: 'contribution',
						value: formik.values.contribution,
						onChange: formik.handleChange,
						min: 10,
						max: maxContribution || 50,
						step: 5,
					}}
				/>
				<SelectField
					label="Тип недвижимости?"
					options={TypeRealtyOptionsMock}
					error={formik.errors.type_realty}
					onChange={(value) => formik.setFieldValue('type_realty', value)}
					inputProps={{
						readOnly: true,
						placeholder: 'Выберите тип недвижимости',
						value: formik.values.type_realty?.option || '',
					}}
				/>
				<SelectField
					label="Вы уже владеете недвижимостью?"
					options={OwnRealtyOptionsMock}
					error={formik.errors.own_realty}
					onChange={(value) => formik.setFieldValue('own_realty', value)}
					inputProps={{
						readOnly: true,
						placeholder: 'Выберите ответ',
						value: formik.values.own_realty?.option || '',
					}}
				/>
			</div>
			<hr className="my-11 xl:mt-8 border-baseStroke"></hr>
			<div className="form-control !justify-start gap-x-[60px]">
				<RangeField
					label="Cрок"
					onChangeTermValue={(value) => formik.setFieldValue('term', value)}
					rangeArray={['год', 'года', 'лет']}
					error={formik.errors.term}
					inputProps={{
						type: 'range',
						placeholder: 'Укажите сумму',
						name: 'term',
						value: formik.values.term!,
						onChange: formik.handleChange,
						min: 4,
						max: 30,
						step: 1,
					}}
				/>
				<RangeField
					label="Ежемесячный платеж"
					warning="Увеличьте ежемесячный платеж и переплачивайте меньше"
					onChangeTermValue={(value) => formik.setFieldValue('payment', value)}
					iconName={EIcons.Shekel}
					rangeArray={[]}
					inputProps={{
						type: 'range',
						placeholder: 'Укажите сумму',
						name: 'payment',
						value: formik.values.payment || 0,
						onChange: formik.handleChange,
						min: 0,
						max: 100000,
						step: 1,
					}}
				/>
			</div>
		</form>
	);
};

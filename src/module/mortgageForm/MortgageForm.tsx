import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { postMortgageForm, setForm, setIsSubmitting } from '../../store/slices/mortgage/mortgageSlice';
import { isSubmittingSelector } from '../../store/slices/mortgage/mortgageSelectors';
import { TextField } from '../../components/inputs/input/TextField';
import { SelectField } from '../../components/inputs/select/SelectField';
import { RangeField } from '../../components/inputs/range/RangeField';
import { ContributionField } from '../../components/inputs/contribution/ContributionField';
import { EIcons } from '../../enums/icons.enum';
import { IMortgageFormValues } from '../../interfaces/mortgage';
import { PeriodOptionsMock } from '../../data/periodOptions';
import { OwnRealtyOptionsMock } from '../../data/ownRealtyOptions';
import { TypeRealtyOptionsMock } from '../../data/typeRealtyOptions';
import { cityOptionsMock } from '../../data/cityOptions';
import { getValueDivisionByPercent } from '../../utils/getValueDivisionByPercent';
import { isEmptyFieldObj } from '../../utils/isEmptyFieldObj';
import { getPayment } from '../../utils/getPayment';
import { divisionByRank } from '../../utils/divisionByRank';

export const MortgageForm = () => {
	const dispatch = useAppDispatch();

	const isSubmitting = useAppSelector(isSubmittingSelector);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const formik = useFormik<IMortgageFormValues>({
		initialValues: {
			price: 1000000,
			city: null,
			period: null,
			contribution: 50,
			type_realty: null,
			own_realty: null,
			term: 30,
			payment: getPayment(getValueDivisionByPercent(1000000, 50), 30),
		},
		validateOnBlur: true,
		validationSchema: Yup.object().shape({
			price: Yup.number()
				.nullable('Это поле является обязательным для заполнения')
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
				.nullable('Это поле является обязательным для заполнения')
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
				.nullable('Это поле является обязательным для заполнения')
				.required('Это поле является обязательным для заполнения'),
			payment: Yup.number()
				.nullable('Это поле является обязательным для заполнения')
				.test('min-max', 'Недопустимое значение', function (value) {
					const { price, contribution } = this.parent;

					const minLimit = getPayment(getValueDivisionByPercent(+price, +contribution), 30);

					const maxLimit = getPayment(getValueDivisionByPercent(+price, +contribution), 4);

					if (value! < minLimit) {
						return this.createError({
							message: `Размер ежемесячного платежа не может быть меньше ${divisionByRank(
								minLimit,
							)} иначе срок будет больше 30 лет`,
						});
					}

					if (value! > maxLimit) {
						return this.createError({
							message: `Размер ежемесячного платежа не может быть больше ${divisionByRank(
								maxLimit,
							)} иначе срок будет меньше 4 лет`,
						});
					}
					return true;
				})
				.required('Это поле является обязательным для заполнения'),
		}),
		onSubmit: async (values, { resetForm }) => {
			if (!isSubmitting) return;
			console.log(values);
			dispatch(postMortgageForm(values));
			setTimeout(() => {
				resetForm();
			}, 1000 * 2);
			dispatch(setIsSubmitting());
		},
	});

	/* Здесь мы помещаем в store нашу форму, чтобы кнопка в footer сменила цвет и можно было отправлять форму
	 Если formik.values имеет пустые поля, то есть проверка провалена по факту, поэтому отправляется
	 только полностью заполненнаня форма*/
	useEffect(() => {
		if (!isEmptyFieldObj<IMortgageFormValues>(formik.values)) return;
		dispatch(setForm(formik.values));
	}, [formik.values]);

	/*
Исходя из макета видно, что кнопка для отправки форму лежит в другом компоненте, это можно увидеть по линии,
что расположена во всю страницу, отсюда были сложности, как прокинуть событие, поэтому были решено создать
isSubmitting и inputRef, в компоненте с кнопкой мы задает isSubmitting=true, а уже тут мы отслеживаем
это и имитируем клик по невидимой кнопке
*/
	useEffect(() => {
		if (!isSubmitting || !inputRef?.current) return;
		inputRef.current.click();
	}, [isSubmitting]);

	const maxContribution = (value: number) => {
		switch (value) {
			case 1:
				return 75;
			case 2:
				return 70;
			default:
				return 50;
		}
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="form-control">
				<TextField
					label="Стоимость недвижимости?"
					iconName={EIcons.Shekel}
					error={formik.errors.price}
					onChangeTextField={async (event) => {
						await formik.setFieldValue('price', +event.target.value.split(',').join('') || null);
						await formik.setFieldValue('contribution', 25);
					}}
					inputProps={{
						type: 'text',
						name: 'price',
						placeholder: 'Укажите стоимость',
						value: formik.values.price || '',
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
					onChangeTermValue={async (value) => {
						await formik.setFieldValue('contribution', value);
						await formik.setFieldValue(
							'payment',
							getPayment(getValueDivisionByPercent(formik.values.price, value), formik.values.term || 0),
						);
					}}
					inputProps={{
						type: 'range',
						placeholder: 'Укажите сумму',
						name: 'contribution',
						value: formik.values.contribution,
						onChange: formik.handleChange,
						min: 10,
						max: formik.values.own_realty?.id ? maxContribution(formik.values.own_realty.id) : 50,
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
					onChange={async (value) => {
						await formik.setFieldValue('own_realty', value);
						await formik.setFieldValue('contribution', 25);
					}}
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
					onChangeTermValue={async (value) => {
						await formik.setFieldValue('term', value);
						await formik.setFieldValue(
							'payment',
							getPayment(
								getValueDivisionByPercent(formik.values.price, formik.values.contribution),
								value || 0,
							),
						);
					}}
					rangeArray={['год', 'года', 'лет']}
					error={formik.errors.term}
					inputProps={{
						type: 'range',
						placeholder: 'Укажите сумму',
						name: 'term',
						value: formik.values.term || 0,
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
					error={formik.errors.payment}
					rangeArray={[]}
					inputProps={{
						type: 'range',
						placeholder: 'Укажите сумму',
						name: 'payment',
						value:
							formik.values.payment ||
							getPayment(
								getValueDivisionByPercent(formik.values.price, formik.values.contribution),
								formik.values.term || 0,
							),
						onChange: formik.handleChange,
						max: getPayment(getValueDivisionByPercent(formik.values.price, formik.values.contribution), 4),
						min: getPayment(getValueDivisionByPercent(formik.values.price, formik.values.contribution), 30),
						step: 1,
					}}
				/>
			</div>
			<input ref={inputRef} className="hidden" type="submit" />
		</form>
	);
};

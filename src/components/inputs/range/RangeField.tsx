import { ChangeEvent, InputHTMLAttributes, PropsWithRef, useEffect, useId, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../icon/Icon';
import { Warning } from '../../warning/Warning';
import { Error } from '../../error/Error';
import { EIcons } from '../../../enums/icons.enum';
import { getRangeProgressBar } from '../../../utils/getRangeProgressBar';
import { getDeclination } from '../../../utils/getDeclination';
import { divisionByRank } from '../../../utils/divisionByRank';

export interface IInputProps extends PropsWithRef<InputHTMLAttributes<HTMLInputElement>> {
	type: string;
	placeholder: string;
	name: string;
	value: number;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	min: number;
	max: number;
	step: number;
}

export type TRangeFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	warning?: string;
	onChangeTermValue: (option: number | null) => void;
	iconName?: EIcons;
	inputProps: IInputProps;
	rangeArray?: string[];
};

export const RangeField = ({
	className,
	label,
	error,
	inputProps,
	warning,
	iconName,
	onChangeTermValue,
	rangeArray,
}: TRangeFieldParams) => {
	const id = useId();

	const [termValue, setTermValue] = useState<string | number>('');

	/* Не успевает попасть в значение termValue */
	useEffect(() => {
		setTermValue(inputProps.value);
	}, [inputProps.value]);

	/* Значение для нахождения value для обработки состояния прогресса */
	const inputRange = useMemo(() => {
		switch (true) {
			case inputProps.value > inputProps.max: {
				return inputProps.max;
			}
			case !inputProps.value: {
				return inputProps.min;
			}
			default:
				return inputProps.value;
		}
	}, [inputProps.value]);

	const progressWidth = getRangeProgressBar(inputRange, inputProps.min, inputProps.max);

	/* Функция для изменения поля с числом */
	const handleTermValue = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.split(',').join('');
		if (!newValue) {
			onChangeTermValue(null);
		} else {
			onChangeTermValue(+newValue);
		}
		setTermValue(newValue);
	};

	/* Функция для подстановки либо слов, либо картинки, либо ничего*/
	const handleRangeTitle = (count: number) => {
		switch (true) {
			case !!rangeArray?.length: {
				return getDeclination(count, rangeArray!);
			}
			case !!iconName: {
				return <Icon size={10} name={iconName!} className="text-white" />;
			}
			default:
				return null;
		}
	};

	return (
		<div className={clsx(className, 'text-field')}>
			{label && (
				<label htmlFor={id} className="block text-label">
					{label}
				</label>
			)}
			<div className="relative">
				<input
					className={clsx('input-field', { '!border-baseError': error })}
					value={divisionByRank(termValue) || ''}
					type="text"
					onChange={handleTermValue}
				/>
				{iconName && (
					<Icon
						size={20}
						name={iconName}
						className="text-white top-2/4 md:right-[24px] right-[48px] absolute -translate-y-2/4"
					/>
				)}
			</div>
			<div className="range-slider">
				<input
					id={id}
					{...inputProps}
					value={inputProps.value}
					onChange={(event) => {
						inputProps.onChange(event);
						setTermValue(event.target.value);
						onChangeTermValue(+event.target.value);
					}}
					className={clsx(inputProps?.className, 'range')}
				/>
				<div className="progress" style={{ width: `${progressWidth}%` }} />
			</div>
			<div className="range-interval">
				<span className="flex items-center gap-3">
					{divisionByRank(inputProps?.min)} {handleRangeTitle(inputProps?.min)}
				</span>
				<span className="flex items-center gap-3">
					{divisionByRank(inputProps?.max)} {handleRangeTitle(inputProps?.max)}
				</span>
			</div>
			{warning && <Warning warning={warning} />}
			{error && <Error error={error} />}
		</div>
	);
};

import { ChangeEvent, InputHTMLAttributes, PropsWithRef, useEffect, useId, useState } from 'react';
import { EIcons } from '../../enums/icons.enum.ts';
import clsx from 'clsx';
import { Icon } from '../icon/Icon.tsx';

export interface IInputProps extends PropsWithRef<InputHTMLAttributes<HTMLInputElement>> {
	type: string;
	placeholder: string;
	name: string;
	value: number;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type TSearchFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	info?: string;
	onChangeTermValue?: (option: number) => void;
	iconName?: EIcons;
	// inputProps: IInputProps;
};

export const SearchField = ({ label, iconName, className }: TSearchFieldParams) => {
	const id = useId();

	const [searchValue, setSearchValue] = useState<string | null>(null);

	useEffect(() => {
		if (searchValue === null) return;

		const timer = setTimeout(() => {}, 800);

		return () => {
			clearInterval(timer);
		};
	}, [searchValue]);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSearchValue(newValue);
	};

	return (
		<div className={clsx(className, 'text-field')}>
			{label && (
				<label htmlFor={id} className="block text-label">
					{label}
				</label>
			)}
			<div className="relative">
				<input id={id} className={clsx('input-field')} value={searchValue || ''} onChange={handleSearch} />
				{iconName && <Icon size={20} name={iconName} className="search-icon" />}
			</div>
		</div>
	);
};

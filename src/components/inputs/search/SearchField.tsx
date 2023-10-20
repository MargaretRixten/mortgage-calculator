import { ChangeEvent, useEffect, useId, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../icon/Icon';
import { EIcons } from '../../../enums/icons.enum';
import './SearchField.scss';

export type TSearchFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	info?: string;
	onSearch: (value: string | null) => void;
	iconName?: EIcons;
};

export const SearchField = ({ label, iconName, className, onSearch }: TSearchFieldParams) => {
	const id = useId();

	const [searchValue, setSearchValue] = useState<string | null>(null);

	/* Имитация debounce */
	useEffect(() => {
		if (searchValue === null) return;

		const timer = setTimeout(() => {
			onSearch(searchValue);
		}, 800);

		return () => {
			clearInterval(timer);
		};
	}, [searchValue]);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSearchValue(newValue);
	};

	return (
		<div className={clsx(className, 'text-field bg-baseSecondary')}>
			{label && (
				<label htmlFor={id} className="block text-label">
					{label}
				</label>
			)}
			<div className="relative">
				<input id={id} className={clsx('input-search')} value={searchValue || ''} onChange={handleSearch} />
				{iconName && <Icon size={20} name={iconName} className="icon-search" />}
			</div>
		</div>
	);
};

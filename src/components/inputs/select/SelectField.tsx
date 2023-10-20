import { InputHTMLAttributes, PropsWithRef, useId, useState } from 'react';
import clsx from 'clsx';
import { EIcons } from '../../../enums/icons.enum';
import { Icon } from '../../icon/Icon';
import { IOption } from '../../../interfaces';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { SearchField } from '../search/SearchField';
import { Error } from '../../error/Error';

export type TSelectFieldParams = {
	className?: string;
	label?: string;
	error?: string;
	search?: boolean;
	options: IOption[];
	onChange: (option: IOption) => void;
	inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export const SelectField = ({ className, label, error, inputProps, options, onChange, search }: TSelectFieldParams) => {
	const id = useId();
	const [isShown, setIsShown] = useState<boolean>(false);
	const [data, setData] = useState<IOption[]>(options);

	const handleShow = () => {
		setIsShown((isShown) => !isShown);
	};
	const handleClose = () => {
		setIsShown(false);
		handleSearchData(null);
		setData(options);
	};

	/* клик вне компонента */
	const wrapperRef = useOutsideClick(() => {
		handleClose();
	});

	const optionHandler = (option: IOption) => {
		onChange(option);
		handleClose();
	};

	const handleSearchData = (value: string | null) => {
		if (!value) {
			setData(options);
			return;
		}
		setData(options.filter((item) => item.option.toLowerCase().includes(value.toLowerCase())));
	};

	return (
		<div ref={wrapperRef} className={clsx(className, 'dropdown')}>
			{label && (
				<label htmlFor={id} className="block text-label">
					{label}
				</label>
			)}
			<div className="relative">
				<div className="relative">
					<input
						{...inputProps}
						className={clsx('input-field cursor-pointer', {
							'active-dropdown': isShown,
							'!border-baseError': error,
						})}
						onClick={handleShow}
					/>
					<Icon
						className={clsx('text-white top-2/4 right-[24px] absolute -translate-y-2/4 transition-all', {
							'rotate-180': isShown,
						})}
						size={24}
						name={EIcons.Arrow}
					/>
				</div>

				{isShown && (
					<ul className="dropdown-menu">
						{search && (
							<li key="search" className="search w-full px-2.5 sticky top-[-1px] z-10 bg-baseSecondary">
								<SearchField iconName={EIcons.Search} onSearch={handleSearchData} />
							</li>
						)}
						{(() => {
							switch (true) {
								case !data.length: {
									return (
										<li className="dropdown-item">
											<span className="text-option">Не найдено</span>
										</li>
									);
								}
								case !!data: {
									return (
										<>
											{data.map(({ id, option }) => (
												<li
													key={id}
													className="dropdown-item"
													onClick={() => optionHandler({ id, option })}
												>
													<span className="text-option">{option}</span>

													<div>
														<Icon
															size={20}
															name={EIcons.Checked}
															className={clsx('text-white', {
																hidden: option !== inputProps?.value,
															})}
														/>
													</div>
												</li>
											))}
										</>
									);
								}
								default:
									return null;
							}
						})()}
					</ul>
				)}
			</div>
			{error && <Error error={error} />}
		</div>
	);
};

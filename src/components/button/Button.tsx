import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Button.scss';

type TButtonVariant = 'primary' | 'outlined';

export type TButtonProps = {
	variant: TButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, variant, ...props }: TButtonProps) => {
	return (
		<button
			{...props}
			className={clsx(
				className,
				'custom-button text-button',
				{
					primary: '!bg-accentPrimary !text-baseBg',
					outlined: '!bg-baseOutlined !text-textDisabled',
				}[variant],
			)}
		/>
	);
};

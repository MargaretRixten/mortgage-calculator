import { ReactNode } from 'react';

interface IMainLayoutParams {
	children: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
}

export const MainLayout = ({ children, header, footer }: IMainLayoutParams) => {
	return (
		<>
			{header && <header>{header}</header>}
			<main>{children}</main>
			{footer && <footer>{footer}</footer>}
		</>
	);
};

import { MainLayout } from '../../layouts/main-layout/MainLayout';
import { FooterMortgageForm } from '../../module/mortgageForm/footerForm/FooterMortgageForm';
import { MortgageForm } from '../../module/mortgageForm/MortgageForm';
import './MortgagePage.scss';

export const MortgagePage = () => {
	return (
		<MainLayout footer={<FooterMortgageForm />}>
			<div className="mortgage-page">
				<div className="container">
					<h1>Рассчитайте ипотеку быстро и просто</h1>
					<MortgageForm />
				</div>
			</div>
		</MainLayout>
	);
};

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { formMortgageSelector } from '../../../store/slices/mortgage/mortgageSelectors';
import { setIsSubmitting } from '../../../store/slices/mortgage/mortgageSlice';
import { Button } from '../../../components/button/Button';

export const FooterMortgageForm = () => {
	const dispatch = useAppDispatch();
	const formMortgage = useAppSelector(formMortgageSelector);

	const handleSubmit = () => {
		dispatch(setIsSubmitting());
	};

	return (
		<>
			<hr className="w-screen mt-10 lg:hidden border-baseStroke" />
			<div className="container">
				<div className="flex items-center justify-end mt-10 py-8">
					<Button type="submit" variant={!formMortgage ? 'outlined' : 'primary'} onClick={handleSubmit}>
						Продолжить
					</Button>
				</div>
			</div>
		</>
	);
};

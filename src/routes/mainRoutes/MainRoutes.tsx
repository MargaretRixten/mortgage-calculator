import { Route, Routes } from 'react-router-dom';
import { MortgagePage } from '../../pages/mortgage/MortgagePage';
import { ERoutes } from '../../enums/routes.enum';

export const MainRoutes = () => (
	<Routes>
		<Route path={ERoutes.Main} element={<MortgagePage />} />
	</Routes>
);

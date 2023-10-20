import {CreditCalc} from "../module/CreditCalc";
import {MainLayout} from "../layouts/main-layout/MainLayout";

export const MortgageCalcPage = () => {
    return (
        <MainLayout>
            <div className="container">
                <h1 className="text-5xl text-white">
                    Рассчитайте ипотеку быстро и просто
                </h1>
                <CreditCalc />
            </div>
        </MainLayout>
    );
};

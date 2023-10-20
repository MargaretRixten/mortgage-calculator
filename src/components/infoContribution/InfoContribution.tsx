import { useState } from 'react';
import { Icon } from '../icon/Icon';
import { EIcons } from '../../enums/icons.enum';
import './InfoContribution.scss';

export const InfoContribution = () => {
	const [isShowInfo, setIsShowInfo] = useState(false);

	const handleShowInfo = () => {
		setIsShowInfo((isShow) => !isShow);
	};

	const closeInfo = () => {
		setIsShowInfo(false);
	};

	return (
		<div className="info">
			<button className="block" onMouseEnter={handleShowInfo} onMouseLeave={closeInfo}>
				<Icon size={20} name={EIcons.Info} />
			</button>

			{isShowInfo && (
				<div className="info-content text-option font-medium">
					<p>
						Основная квартира: у заемщика нет квартиры ставка финансирования <br />
						Максимум до 75%
					</p>
					<p>
						Альтернативная квартира: Для заемщика квартира, которую он обязуется продать в течение двух лет
						ставка финансирования <br />
						Максимум до 70%
					</p>
					<p>
						Вторая квартира или выше: у заемщика уже есть ставка финансирования квартиры <br />
						Максимум до 50%
					</p>
				</div>
			)}
		</div>
	);
};

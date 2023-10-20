/** @type {import('tailwindcss').Config} */

const colors = {
	baseInput: '#2A2B31',
	baseSecondary: '#242529',
	baseStroke: '#333535',
	baseBg: '#161616',
	accentPrimary: '#FBE54D',
	textDisabled: '#848484',
	textSecondary: '#D0D0D0',
	baseScroll: '#3F444D',
	baseInfo: '#41434E',
	baseError: '#E76143',
	baseOutlined: '#2D2D2D',
};

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xxl: { max: '1399.5px' },
			xl: { max: '1139.5px' },
			lg: { max: '889.5px' },
			md: { max: '767.5px' },
			sm: { max: '575.5px' },
			xs: { max: '474.5px' },
		},
		extend: {
			colors,
		},
	},
	plugins: [],
};

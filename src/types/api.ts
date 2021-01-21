export interface CryptoObject {
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	circulating_supply: number;
	current_price: number;
	fully_diluted_valuation: number;
	high_24h: number;
	id: string;
	image: string;
	last_updated: string;
	low_24h: number;
	market_cap: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	market_cap_rank: number;
	max_supply: number;
	name: string;
	price_change_24h: number;
	price_change_percentage_24h: number;
	roi: {
		currency: string;
		percentage: number;
		times: number;
	};
	symbol: string;
	total_supply: number;
	total_volume: number;
}

export const CryptoObjectDefault: CryptoObject = {
	ath: 0,
	ath_change_percentage: 0,
	ath_date: '',
	atl: 0,
	atl_change_percentage: 0,
	atl_date: '',
	circulating_supply: 0,
	current_price: 0,
	fully_diluted_valuation: 0,
	high_24h: 0,
	id: '',
	image: '',
	last_updated: '',
	low_24h: 0,
	market_cap: 0,
	market_cap_change_24h: 0,
	market_cap_change_percentage_24h: 0,
	market_cap_rank: 0,
	max_supply: 0,
	name: '',
	price_change_24h: 0,
	price_change_percentage_24h: 0,
	roi: {
		currency: '',
		percentage: 0,
		times: 0,
	},
	symbol: '',
	total_supply: 0,
	total_volume: 0,
};

export interface UserHoldingsType {
	name: string;
	amount: number | undefined;
}

export const InitialUserHoldings: UserHoldingsType[] = [
	{
		name: 'bitcoin',
		amount: 0,
	},
	{
		name: 'binancecoin',
		amount: 0,
	},
	{
		name: 'pancakeswap-token',
		amount: 0,
	},
];

export const InitialListDefault: string[] = [
	'bitcoin',
	'binancecoin',
	'pancakeswap-token',
];

export const Theme: string[] = [
	'0, 158, 115',
	'0, 126, 158',
	'94, 96, 199',
	'158, 0, 156',
	'211, 116, 24',
];

export interface CryptoOptions {
	id: string;
	name: string;
	symbol: string;
}

export const CryptoOptionsDefault: CryptoOptions = {
	id: '',
	name: '',
	symbol: '',
};

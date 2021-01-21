import React from 'react';
// import styled from 'styled-components';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	// CartesianGrid,
	// BarChart,
	// Bar,
	// Tooltip,
	ResponsiveContainer,
} from 'recharts';
// import Moment from 'moment';
// import FormateNumber from '../functions/formatNumber';

import { StoreState } from '../redux/reducers/index';
import { useSelector } from 'react-redux';

interface IProps {
	priceData: object[];
}

const PricingChart = (props: IProps) => {
	const { priceData } = props;

	const theme = useSelector(
		(state: StoreState) => state.theme.color && state.theme.color
	);
	return (
		<>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={priceData}
					margin={{
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="transparent" stopOpacity={0} />
							<stop offset="95%" stopColor="transparent" stopOpacity={0} />
							{/* <stop offset="5%" stopColor={`rgba(${theme}, 0)`} stopOpacity={0.8} />
							<stop offset="95%" stopColor={`rgba(${theme}, 0)`} stopOpacity={0.1} /> */}
						</linearGradient>
					</defs>
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					{/* <XAxis dataKey="name" /> */}
					<YAxis hide={true} domain={['auto', 'auto']} />
					<XAxis hide={true} dataKey="time" />
					{/* <Tooltip formatter={(value) => `$${FormateNumber(value)}`} /> */}
					<Area
						type="monotone"
						dataKey="price"
						strokeWidth={2}
						stroke={`rgba(${theme}, 1)`}
						fill={`url(#colorUv)`}
					/>
				</AreaChart>
			</ResponsiveContainer>
			{/* <BarChart width={150} height={40} data={priceData}>
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart> */}
		</>
	);
};

export default PricingChart;

import React from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Moment from "moment";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const testData = [{ uv: 40 }, { uv: 60 }, { uv: 10 }, { uv: 100 }];

interface IProps {
  priceData?: object[];
}

const PricingChart = (props: IProps) => {
  const { priceData } = props;
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
              <stop
                offset="5%"
                stopColor="rgba(0, 158, 115, 1)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(0, 158, 115, 1)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="name" /> */}
          <YAxis hide={true} domain={["auto", "auto"]} />
          <XAxis hide={true} interval="preserveEnd" dataKey="time" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            strokeWidth={2}
            stroke="rgba(0, 158, 115, 1)"
            fill="url(#colorUv)"
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

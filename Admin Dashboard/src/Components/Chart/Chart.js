import React from "react";
import "./Chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Total: 3200 },
  { name: "Febuary", Total: 9000 },
  { name: "March", Total: 1200 },
  { name: "April", Total: 1400 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1000 },
  { name: "July", Total: 4300 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="Chart">
      <div className="chart-title"> {title}</div>
      <ResponsiveContainer width="90%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="lime" stopOpacity={0.8} />
              <stop offset="95%" stopColor="lime" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="lime"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

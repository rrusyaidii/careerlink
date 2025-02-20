import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2cb1bc" stopOpacity={1} />
            <stop offset="95%" stopColor="#2cb1bc" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="5 5"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={0.5}
          vertical={false}
        />

        <XAxis
          dataKey="date"
          tick={{ fill: "#555" }}
          tickLine={false}
          axisLine={{ stroke: "#ccc" }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "#555" }}
          tickLine={false}
          axisLine={{ stroke: "#ccc" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
          cursor={{ fill: "rgba(44, 177, 188, 0.1)" }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#2cb1bc"
          strokeWidth={2.5}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;

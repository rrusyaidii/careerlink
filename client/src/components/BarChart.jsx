import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>
          {payload[0].payload.date}
        </p>
        <p style={{ margin: 0, color: "#2cb1bc" }}>
          Count: {payload[0].value || 0}
        </p>
      </div>
    );
  }
  return null;
};

const BarChartComponent = ({ data }) => {
  const cleanedData = data.map((item) => ({
    ...item,
    count: item.count ?? 0, // Ensure count is not undefined
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={cleanedData}
        margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2cb1bc" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#2cb1bc" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3 "
          stroke="#eee"
          strokeWidth={0.2}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fill: "#555" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "#555" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="count"
          fill="url(#barColor)"
          barSize={50}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

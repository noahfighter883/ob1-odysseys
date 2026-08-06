"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TrendPoint = {
  year: number;
  megaFires: number;
  avgSize: number;
};

export function WildfireTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="avgSizeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            interval={1}
          />
          <YAxis
            yAxisId="acres"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
            width={44}
          />
          <YAxis
            yAxisId="count"
            orientation="right"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(value, name) => {
              const numeric = typeof value === "number" ? value : Number(value);
              if (name === "avgSize")
                return [`${numeric.toLocaleString()} acres`, "Avg. mega-fire size"];
              if (name === "megaFires") return [numeric, "Mega-fires that year"];
              return [numeric, String(name)];
            }}
            labelFormatter={(label) => `${label}`}
          />
          <Area
            yAxisId="acres"
            type="monotone"
            dataKey="avgSize"
            stroke="var(--chart-2)"
            strokeWidth={2}
            fill="url(#avgSizeFill)"
          />
          <Line
            yAxisId="count"
            type="monotone"
            dataKey="megaFires"
            stroke="var(--chart-1)"
            strokeWidth={2}
            strokeDasharray="4 3"
            dot={{ r: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--chart-2)]" />
          Avg. mega-fire size (acres, left axis)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--chart-1)]" />
          Mega-fires per year (right axis)
        </span>
      </div>
    </div>
  );
}

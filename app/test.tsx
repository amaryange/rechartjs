"use client"

import Image from "next/image";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid, Cell, LabelList,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useEffect, useState} from "react";

export default function Home() {

    const initialData = [
        { date: "2023-04-01", cashIn: -1926, cashOut: 1450 },
        { date: "2023-04-02", cashIn: 2994, cashOut: 2235 },
        { date: "2023-04-03", cashIn: -500, cashOut: 3668 },
        { date: "2023-04-04", cashIn: 8000, cashOut: 4959 },
        { date: "2023-04-05", cashIn: 12000, cashOut: 6277 },
        { date: "2023-04-06", cashIn: 11000, cashOut: 6876 },
        { date: "2023-04-07", cashIn: -4000, cashOut: 7410 },
        { date: "2023-04-08", cashIn: 7000, cashOut: 8624 },
        { date: "2023-04-09", cashIn: 12000, cashOut: 9890 },
        { date: "2023-04-10", cashIn: 16000, cashOut: 10955 },
        { date: "2023-04-11", cashIn: 17000, cashOut: 11712 },
        { date: "2023-04-12", cashIn: 18000, cashOut: 12811 },
    ];

    const totalCashIn = initialData.reduce((acc, entry) => acc + entry.cashIn, 0);

    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const newData = prevData.map((entry) => ({
                    ...entry,
                    cashIn: Math.floor(Math.random() * 20000) - 5000,
                    cashOut: Math.floor(Math.random() * 15000),
                }));
                return newData;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="flex items-center bg-slate-950 h-screen flex-col justify-center gap-4">
                <div className="w-full max-w-lg h-56 border border-slate-700 p-2 m-2 rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                        >

                            <CartesianGrid
                                strokeDasharray="4 4"
                                stroke="#1e293b"
                                vertical={false}
                            />

                            <Area
                                dataKey="cashIn"
                                type="monotone"
                                stroke="#06b6d4"
                                fill={`url(#cyan-gradient)`}
                            />

                            <XAxis
                                dataKey="date"
                                fontSize={10}
                                stroke={"#334155"}
                                tickLine={false}
                                axisLine={false}
                                interval={3}
                                tickFormatter={(value) => {
                                    return value.split('-').reverse().slice(0, 2).join("/");
                                }}
                            />

                            <YAxis
                                dataKey={"cashIn"}
                                fontSize={10}
                                stroke={"#334155"}
                                tickLine={false}
                                axisLine={false}
                                interval={1}
                                tickFormatter={(value) => {
                                    return `$${Intl.NumberFormat("en-US").format(value)}`;
                                }}
                            />

                            <Tooltip
                                cursor={{
                                    radius: 4,
                                    stroke: "#334155"
                                }}
                                content={({active, payload}) => {
                                    if(!active || !payload || payload.length === 0) return null;

                                    return (
                                        <div className="rounded-lg border bg-slate-800 border-slate-700 p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                              <span className="text-xs uppercase text-slate-500">
                                Date
                              </span>
                                                    <span className="text-sm font-bold text-slate-300">
                                {payload[0].payload.date}
                              </span>
                                                </div>
                                                <div className="flex flex-col">
                              <span className="text-xs uppercase text-slate-500">
                                Cash In
                              </span>
                                                    <span className="text-sm font-bold text-slate-300">
                                $
                                                        {Intl.NumberFormat("en-US").format(
                                                            payload[0].payload.cashIn
                                                        )}
                              </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />

                            <defs>
                                <linearGradient id="cyan-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                    <stop offset="75%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full max-w-lg h-72 border border-slate-700 p-2 m-2 rounded-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20 }}
                        >
                            <ReferenceLine y={0} stroke="#083344" label={{ value: '0', position: 'left', fill: '#334155', fontSize: 10, }} />
                            <Bar
                                dataKey="cashIn"
                                type="monotone"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.cashIn < 0 ? "#dc2626" : "#0891b2"}
                                        stroke={entry.cashIn < 0 ? "#fca5a5" : "#67e8f9"} />
                                ))}
                                <LabelList
                                    dataKey="cashIn"
                                    position="top"
                                    formatter={(value) => `${((value / totalCashIn) * 100).toFixed(2)}%`}
                                    fontSize={10}
                                />
                            </Bar>

                            <XAxis
                                dataKey="date"
                                fontSize={10}
                                stroke={"#334155"}
                                tickLine={false}
                                axisLine={false}
                                interval={3}
                                tickFormatter={(value) => {
                                    return value.split('-').reverse().slice(0, 2).join("/");
                                }}
                            />

                            <YAxis
                                dataKey={"cashIn"}
                                fontSize={10}
                                stroke={"#334155"}
                                tickLine={false}
                                axisLine={false}
                                interval={1}
                                tickFormatter={(value) => {
                                    const formattedValue = Intl.NumberFormat("en-US").format(Math.abs(value));
                                    return value < 0 ? `-$${formattedValue}` : `$${formattedValue}`;
                                }}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "rgba(0, 0, 0, 0.15)", // Transparent cursor with slight shading
                                }}
                                content={({active, payload}) => {
                                    if(!active || !payload || payload.length === 0) return null;

                                    return (
                                        <div className="rounded-lg border bg-slate-800 border-slate-700 p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                              <span className="text-xs uppercase text-slate-500">
                                Date
                              </span>
                                                    <span className="text-sm font-bold text-slate-300">
                                {payload[0].payload.date}
                              </span>
                                                </div>
                                                <div className="flex flex-col">
                              <span className="text-xs uppercase text-slate-500">
                                Cash In
                              </span>
                                                    <span className="text-sm font-bold text-slate-300">
                                {payload[0].payload.cashIn < 0
                                    ? `-$${Intl.NumberFormat("en-US").format(Math.abs(payload[0].payload.cashIn))}`
                                    : `$${Intl.NumberFormat("en-US").format(payload[0].payload.cashIn)}`
                                }
                              </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}

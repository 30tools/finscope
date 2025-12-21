"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from "recharts";

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(65);
    const [currentSavings, setCurrentSavings] = useState(50000);
    const [monthlySavings, setMonthlySavings] = useState(1000);
    const [expectedReturn, setExpectedReturn] = useState(7);

    const [results, setResults] = useState({
        finalBalance: 0,
        yearsToGrow: 0,
        milestones: [] as any[],
    });

    useEffect(() => {
        const years = Math.max(0, retirementAge - currentAge);
        const r = expectedReturn / 100;
        const data = [];

        let balance = currentSavings;

        // Initial point
        data.push({ age: currentAge, balance: Math.round(balance) });

        for (let i = 1; i <= years; i++) {
            // Compound monthly for accuracy
            for (let m = 0; m < 12; m++) {
                balance += monthlySavings;
                balance *= (1 + r / 12);
            }
            data.push({
                age: currentAge + i,
                balance: Math.round(balance),
            });
        }

        setResults({
            finalBalance: Math.round(balance),
            yearsToGrow: years,
            milestones: data,
        });

    }, [currentAge, retirementAge, currentSavings, monthlySavings, expectedReturn]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 md:p-8 grid md:grid-cols-12 gap-8">
                {/* INPUTS */}
                <div className="md:col-span-5 space-y-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">🏖️</span>
                        Your Plan
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Current Age</label>
                            <input
                                type="number"
                                value={currentAge}
                                onChange={(e) => setCurrentAge(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Retire Age</label>
                            <input
                                type="number"
                                value={retirementAge}
                                onChange={(e) => setRetirementAge(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Current Savings ($)</label>
                            <input
                                type="number"
                                value={currentSavings}
                                onChange={(e) => setCurrentSavings(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Monthly Savings ($)</label>
                            <input
                                type="number"
                                value={monthlySavings}
                                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Annual Return (%)</label>
                            <input
                                type="number"
                                step="0.5"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                            />
                            <p className="text-xs text-zinc-400">Conservative: 5-6%, Aggressive: 8-10%</p>
                        </div>
                    </div>
                </div>

                {/* RESULTS */}
                <div className="md:col-span-7 flex flex-col">
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800 mb-8 text-center">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Projected Nest Egg at Age {retirementAge}</span>
                        <div className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-indigo-400 mt-2">
                            ${results.finalBalance.toLocaleString()}
                        </div>
                        <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Growth Period: <strong>{results.yearsToGrow} Years</strong>
                        </div>
                    </div>

                    <div className="grow min-h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={results.milestones} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" opacity={0.2} />
                                <XAxis
                                    dataKey="age"
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    label={{ value: 'Age', position: 'insideBottom', offset: -5, fill: '#71717a' }}
                                />
                                <YAxis
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value >= 1000000 ? (value / 1000000).toFixed(1) + 'M' : (value / 1000).toFixed(0) + 'k'}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Balance"]}
                                    labelFormatter={(label) => `Age ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    dot={false}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

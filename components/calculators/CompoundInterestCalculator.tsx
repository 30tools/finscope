"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CompoundInterestCalculator() {
    const [initialDeposit, setInitialDeposit] = useState(5000);
    const [monthlyContribution, setMonthlyContribution] = useState(200);
    const [years, setYears] = useState(10);
    const [interestRate, setInterestRate] = useState(7);

    const [results, setResults] = useState({
        finalBalance: 0,
        totalContributions: 0,
        totalInterest: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Formula: A = P(1 + r/n)^(nt) + PMT * ... complex series for contributions
        // We'll iterate year by year for chart data, which is easier

        let balance = initialDeposit;
        let totalContributed = initialDeposit;
        const r = interestRate / 100;
        const newData = [];

        // Year 0
        newData.push({
            year: 0,
            Balance: initialDeposit,
            Principal: initialDeposit,
            Interest: 0,
        });

        for (let i = 1; i <= years; i++) {
            // Compound monthly
            for (let m = 0; m < 12; m++) {
                balance += monthlyContribution;
                totalContributed += monthlyContribution;
                balance *= (1 + r / 12);
            }

            newData.push({
                year: i,
                Balance: Math.round(balance),
                Principal: Math.round(totalContributed),
                Interest: Math.round(balance - totalContributed),
            });
        }

        setResults({
            finalBalance: Math.round(balance),
            totalContributions: Math.round(totalContributed),
            totalInterest: Math.round(balance - totalContributed),
        });
        setChartData(newData);

    }, [initialDeposit, monthlyContribution, years, interestRate]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 md:p-8 grid md:grid-cols-12 gap-8">
                {/* INPUTS */}
                <div className="md:col-span-5 space-y-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2 rounded-lg">📈</span>
                        Growth Inputs
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Initial Deposit ($)</label>
                            <input
                                type="number"
                                value={initialDeposit}
                                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Monthly Contribution ($)</label>
                            <input
                                type="number"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Growth Period (Years)</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Interest Rate (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden"
                                />
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500">
                            *Assumes monthly compounding at an annual rate of {interestRate}%.
                        </p>
                    </div>
                </div>

                {/* RESULTS */}
                <div className="md:col-span-7 flex flex-col">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800 mb-8 text-center">
                        <span className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">Future Balance in {years} Years</span>
                        <div className="text-4xl md:text-5xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-2">
                            ${results.finalBalance.toLocaleString()}
                        </div>
                        <div className="flex justify-center gap-6 mt-4 text-sm">
                            <div>
                                <span className="block text-zinc-500 dark:text-zinc-400">Your Deposits</span>
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">${results.totalContributions.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="block text-zinc-500 dark:text-zinc-400">Total Interest</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">+${results.totalInterest.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grow min-h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" opacity={0.2} />
                                <XAxis dataKey="year" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
                                />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="Principal" stackId="a" fill="#3f3f46" name="Principal" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="Interest" stackId="a" fill="#10b981" name="Interest" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

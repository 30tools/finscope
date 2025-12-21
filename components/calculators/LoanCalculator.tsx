"use client";

import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import clsx from "clsx";

export default function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState(25000);
    const [interestRate, setInterestRate] = useState(7.5);
    const [loanTerm, setLoanTerm] = useState(60); // Months

    const [results, setResults] = useState({
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
    });

    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const monthlyRate = interestRate / 100 / 12;
        let payment = 0;

        // Formula: P * (r * (1+r)^n) / ((1+r)^n - 1)
        if (interestRate > 0) {
            payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
                (Math.pow(1 + monthlyRate, loanTerm) - 1);
        } else {
            payment = loanAmount / loanTerm;
        }

        const totalCost = payment * loanTerm;
        const totalInterest = totalCost - loanAmount;

        setResults({
            monthlyPayment: Math.round(payment),
            totalInterest: Math.round(totalInterest),
            totalCost: Math.round(totalCost),
        });

        // Generate Chart Data (Amortization Curve)
        const newChartData = [];
        let balance = loanAmount;
        // Sample points (every year or every 10% of term to keep chart clean)
        const step = Math.max(1, Math.round(loanTerm / 12));

        for (let i = 0; i <= loanTerm; i += step) {
            newChartData.push({
                month: i,
                balance: Math.round(balance < 0 ? 0 : balance),
            });
            // Rough calc for balance for next step
            // B_k = B_0 * (1+r)^k - P * ((1+r)^k - 1)/r
            if (interestRate > 0) {
                const factor = Math.pow(1 + monthlyRate, i + step);
                const term2 = (payment * (Math.pow(1 + monthlyRate, i + step) - 1)) / monthlyRate;
                balance = (loanAmount * factor) - term2;
            } else {
                balance -= (payment * step);
            }
        }
        // ensure last point is 0
        newChartData.push({ month: loanTerm, balance: 0 });

        // De-dupe and sort just in case
        const uniqueData = newChartData.filter((v, i, a) => a.findIndex(t => (t.month === v.month)) === i).sort((a, b) => a.month - b.month);

        setChartData(uniqueData);

    }, [loanAmount, interestRate, loanTerm]);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 md:p-8 grid md:grid-cols-12 gap-8">
                {/* INPUTS */}
                <div className="md:col-span-5 space-y-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-lg">💸</span>
                        Loan Details
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loan Amount ($)</label>
                            <input
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-hidden"
                            />
                            <div className="flex justify-between text-xs text-zinc-400 px-1">
                                <button onClick={() => setLoanAmount(10000)} className="hover:text-purple-500 transition-colors">$10k</button>
                                <button onClick={() => setLoanAmount(25000)} className="hover:text-purple-500 transition-colors">$25k</button>
                                <button onClick={() => setLoanAmount(50000)} className="hover:text-purple-500 transition-colors">$50k</button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Interest Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-hidden"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loan Term (Months)</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[36, 48, 60, 72, 84].map(term => (
                                    <button
                                        key={term}
                                        onClick={() => setLoanTerm(term)}
                                        className={clsx(
                                            "py-2 px-3 text-sm rounded-lg border transition-all",
                                            loanTerm === term
                                                ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-500/20"
                                                : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                                        )}
                                    >
                                        {term} mo
                                    </button>
                                ))}
                                <input
                                    type="number"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                    className="py-2 px-3 text-sm rounded-lg border bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-center focus:ring-2 focus:ring-purple-500 outline-hidden"
                                    placeholder="Custom"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESULTS */}
                <div className="md:col-span-7 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-xl border border-purple-100 dark:border-purple-800">
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1">Monthly Payment</div>
                            <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                                ${results.monthlyPayment.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-xl border border-zinc-100 dark:border-zinc-700">
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1">Total Interest</div>
                            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                                ${results.totalInterest.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="h-64 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
                        <div className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide px-2">Loan Balance Over Time</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Balance"]}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                />
                                <XAxis dataKey="month" hide />
                                <YAxis hide />
                                <Area type="monotone" dataKey="balance" stroke="#9333ea" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

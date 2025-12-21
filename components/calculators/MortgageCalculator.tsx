"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import clsx from "clsx";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

export default function MortgageCalculator() {
    const [homePrice, setHomePrice] = useState(400000);
    const [downPayment, setDownPayment] = useState(80000);
    const [loanTerm, setLoanTerm] = useState(30);
    const [interestRate, setInterestRate] = useState(6.5);
    const [propertyTax, setPropertyTax] = useState(1.2); // Annual %
    const [homeInsurance, setHomeInsurance] = useState(1500); // Annual $
    const [hoaFees, setHoaFees] = useState(0); // Monthly $

    const [results, setResults] = useState({
        monthlyPrincipalInterest: 0,
        monthlyTax: 0,
        monthlyInsurance: 0,
        totalMonthlyPayment: 0,
    });

    useEffect(() => {
        const principal = homePrice - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        // Mortgage Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
        let monthlyPI = 0;
        if (interestRate > 0) {
            monthlyPI =
                (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        } else {
            monthlyPI = principal / numberOfPayments;
        }

        const monthlyTaxCalc = (homePrice * (propertyTax / 100)) / 12;
        const monthlyInsCalc = homeInsurance / 12;

        setResults({
            monthlyPrincipalInterest: Math.round(monthlyPI),
            monthlyTax: Math.round(monthlyTaxCalc),
            monthlyInsurance: Math.round(monthlyInsCalc),
            totalMonthlyPayment: Math.round(monthlyPI + monthlyTaxCalc + monthlyInsCalc + hoaFees),
        });
    }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, hoaFees]);

    const data = [
        { name: "Principal & Interest", value: results.monthlyPrincipalInterest },
        { name: "Property Tax", value: results.monthlyTax },
        { name: "Home Insurance", value: results.monthlyInsurance },
        { name: "HOA Fees", value: results.totalMonthlyPayment - (results.monthlyPrincipalInterest + results.monthlyTax + results.monthlyInsurance) },
    ].filter(item => item.value > 0);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 md:p-8 grid md:grid-cols-12 gap-8">
                {/* INPUTS SECTION */}
                <div className="md:col-span-7 space-y-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">⚙️</span>
                        Loan Details
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Home Price ($)</label>
                            <input
                                type="number"
                                value={homePrice}
                                onChange={(e) => setHomePrice(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Down Payment ($)</label>
                            <input
                                type="number"
                                value={downPayment}
                                onChange={(e) => setDownPayment(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Interest Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loan Term (Years)</label>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-hidden cursor-pointer"
                            >
                                <option value={10}>10 Years</option>
                                <option value={15}>15 Years</option>
                                <option value={20}>20 Years</option>
                                <option value={30}>30 Years</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Additional Costs (Optional)</h4>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Property Tax (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={propertyTax}
                                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                                    className="w-full p-2 text-sm bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:border-blue-500 outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Home Insurance ($/yr)</label>
                                <input
                                    type="number"
                                    value={homeInsurance}
                                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                                    className="w-full p-2 text-sm bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:border-blue-500 outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase font-bold tracking-wider">HOA Fees ($/mo)</label>
                                <input
                                    type="number"
                                    value={hoaFees}
                                    onChange={(e) => setHoaFees(Number(e.target.value))}
                                    className="w-full p-2 text-sm bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:border-blue-500 outline-hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RESULTS SECTION */}
                <div className="md:col-span-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-zinc-100 dark:border-zinc-700/50 relative">
                    <div className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
                        Estimated Payment
                    </div>

                    <div className="mb-6">
                        <span className="text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                            ${results.totalMonthlyPayment.toLocaleString()}
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-sm block mt-1">/ month</span>
                    </div>

                    <div className="w-full h-48 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-full space-y-3">
                        {[
                            { label: "Principal & Interest", value: results.monthlyPrincipalInterest, color: COLORS[0] },
                            { label: "Property Tax", value: results.monthlyTax, color: COLORS[1] },
                            { label: "Home Insurance", value: results.monthlyInsurance, color: COLORS[2] },
                            ...(hoaFees > 0 ? [{ label: "HOA Fees", value: hoaFees, color: COLORS[3] }] : [])
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-zinc-600 dark:text-zinc-300">{item.label}</span>
                                </div>
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

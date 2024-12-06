import React, { useState } from "react";

const CreateTradeForm = () => {
    const [energyAmount, setEnergyAmount] = useState("");
    const [pricePerKwh, setPricePerKwh] = useState("");
    const [status, setStatus] = useState("Pending");
    const [trades, setTrades] = useState([]); // Store trades in local state

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new trade
        const newTrade = {
            energyAmount,
            pricePerKwh,
            status,
            date: new Date().toLocaleDateString(),
        };

        // Add the new trade to the trades array
        setTrades([...trades, newTrade]);

        // Clear form fields
        setEnergyAmount("");
        setPricePerKwh("");
        setStatus("Pending");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Create New Trade</h2>

                    {/* Create Trade Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="energyAmount" className="text-sm font-semibold text-gray-600 mb-2">
                                Energy Amount (kWh)
                            </label>
                            <input
                                id="energyAmount"
                                type="number"
                                value={energyAmount}
                                onChange={(e) => setEnergyAmount(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter energy amount"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="pricePerKwh" className="text-sm font-semibold text-gray-600 mb-2">
                                Price per kWh ($)
                            </label>
                            <input
                                id="pricePerKwh"
                                type="number"
                                value={pricePerKwh}
                                onChange={(e) => setPricePerKwh(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg"
                                placeholder="Enter price per kWh"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-sm font-semibold text-gray-600 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="p-3 border border-gray-300 rounded-lg"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-green-600 text-white p-3 px-6 rounded-full font-semibold hover:bg-green-700"
                            >
                                Create Trade
                            </button>
                        </div>
                    </form>

                    {/* Display Created Trades */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4">Created Trades</h3>
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Trade ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Energy Amount (kWh)</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price per kWh ($)</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trades.length > 0 ? (
                                    trades.map((trade, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{trade.energyAmount}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">${trade.pricePerKwh}</td>
                                            <td className={`px-6 py-4 text-sm ${trade.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                                                {trade.status}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{trade.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            No trades created yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTradeForm;

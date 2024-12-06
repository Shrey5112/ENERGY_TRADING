import React, { useState, useEffect } from "react";

const initialTrades = [
    { id: 1, energyAmount: 500, pricePerKwh: 0.15, status: "Completed", date: "2024-12-01" },
    { id: 2, energyAmount: 300, pricePerKwh: 0.14, status: "Pending", date: "2024-12-02" },
    { id: 3, energyAmount: 450, pricePerKwh: 0.16, status: "Completed", date: "2024-12-03" },
    { id: 4, energyAmount: 700, pricePerKwh: 0.12, status: "Pending", date: "2024-12-04" },
];

const EXCHANGE_RATE = 82;

const TradeList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [trades, setTrades] = useState([]);
    const [energyAmount, setEnergyAmount] = useState("");
    const [pricePerKwh, setPricePerKwh] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        const savedTrades = JSON.parse(localStorage.getItem("trades"));
        if (savedTrades) {
            setTrades(savedTrades);
        } else {
            setTrades(initialTrades);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("trades", JSON.stringify(trades));
    }, [trades]);

    const filteredTrades = trades.filter((trade) =>
        trade.id.toString().includes(searchTerm) || trade.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateTrade = (e) => {
        e.preventDefault();
        const newTrade = {
            id: trades.length + 1,
            energyAmount: parseFloat(energyAmount),
            pricePerKwh: parseFloat(pricePerKwh),
            status: status,
            date: new Date().toLocaleDateString(),
        };
        setTrades([...trades, newTrade]);
        setEnergyAmount("");
        setPricePerKwh("");
        setStatus("Pending");
    };

    const convertToINR = (priceInUSD) => {
        return (priceInUSD * EXCHANGE_RATE).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-green-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Voltkon Energy Trading</h1>
                    <nav className="flex space-x-4">
                        <a href="/profile" className="hover:underline">Profile</a>
                        <a href="/logout" className="hover:underline">Logout</a>
                    </nav>
                </div>
            </header>
            <main className="flex flex-1 overflow-hidden px-4 py-2">
                <aside className="bg-white shadow rounded-lg p-4 w-1/4 min-h-full">
                    <h2 className="text-lg font-bold mb-4">Navigation</h2>
                    <ul className="space-y-2">
                        <li><a href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-green-200">Dashboard</a></li>
                        <li><a href="/trades" className="block px-4 py-2 rounded-lg bg-green-100 hover:bg-gray-200">Trades</a></li>
                        
                    </ul>
                </aside>
                <div className="flex-1 overflow-hidden px-2">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-3">
                        <h2 className="text-2xl font-bold mb-6">Create New Trade</h2>
                        <form onSubmit={handleCreateTrade}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Energy Amount (kWh)</label>
                                <input type="number" className="w-full p-3 border border-gray-300 rounded-lg" value={energyAmount} onChange={(e) => setEnergyAmount(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price per kWh (INR)</label>
                                <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-lg" value={pricePerKwh} onChange={(e) => setPricePerKwh(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Add Trade</button>
                        </form>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Energy Trade List</h2>
                        <div className="mb-6">
                            <input type="text" placeholder="Search by Trade ID or Status" className="w-full p-3 border border-gray-300 rounded-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Trade ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Energy Amount (kWh)</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Price per kWh (INR)</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTrades.length > 0 ? (
                                    filteredTrades.map((trade) => (
                                        <tr key={trade.id} className="border-b">
                                            <td className="px-6 py-4 text-sm text-gray-800">{trade.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{trade.energyAmount}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{`₹${convertToINR(trade.pricePerKwh)}`}</td>
                                            <td className={`px-6 py-4 text-sm ${trade.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>{trade.status}</td>
                                            <td className="px-6 py-4 text-sm text-gray-800">{trade.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No trades found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TradeList;

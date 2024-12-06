import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const HomePage = () => {
  // Monthly data for consumption and generation
  const data = [
    { month: "2023-01", consumption: 1275.85, generation: 500.5 },
    { month: "2023-02", consumption: 1163.5, generation: 550.6 },
    { month: "2023-03", consumption: 1332.18, generation: 620.7 },
    { month: "2023-04", consumption: 1264.83, generation: 700.8 },
    { month: "2023-05", consumption: 1303.17, generation: 750.3 },
    { month: "2023-06", consumption: 1250.45, generation: 800.1 },
    { month: "2023-07", consumption: 1400.23, generation: 780.5 },
    { month: "2023-08", consumption: 1350.6, generation: 740.2 },
    { month: "2023-09", consumption: 1280.1, generation: 680.4 },
    { month: "2023-10", consumption: 1203.78, generation: 600.5 },
    { month: "2023-11", consumption: 1150.45, generation: 540.3 },
    { month: "2023-12", consumption: 1125.3, generation: 500.0 },
  ];

  const [selectedMonth, setSelectedMonth] = useState(data[0].month);
  const [currentConsumption, setCurrentConsumption] = useState(
    data[0].consumption
  );
  const [currentGeneration, setCurrentGeneration] = useState(
    data[0].generation
  );

  const handleMonthClick = (month) => {
    const monthData = data.find((d) => d.month === month);
    setSelectedMonth(month);
    setCurrentConsumption(monthData.consumption);
    setCurrentGeneration(monthData.generation);
  };

  const consumptionChartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Energy Consumption (kWh)",
        data: data.map((d) => d.consumption),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const generationChartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Solar Generation (kWh)",
        data: data.map((d) => d.generation),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Energy Data Overview (${selectedMonth})`,
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toFixed(2)} kWh`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Energy (kWh)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Voltkon Energy Trading</h1>
          <nav className="flex space-x-4">
            <a href="/profile" className="hover:underline">
              Profile
            </a>
            <a href="/logout" className="hover:underline">
              Logout
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <aside className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="block px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/trades"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-200"
                >
                  Trades
                </a>
              </li>
            </ul>
          </aside>

          <section className="md:col-span-3 bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4">Welcome to Voltkon</h2>

            <div className="flex  justify-center gap-4">
              <div className="bg-white shadow p-4 rounded-lg w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">
                  Energy Consumption
                </h3>
                <div style={{ height: "250px" }}>
                  <Line data={consumptionChartData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-white shadow p-4 rounded-lg w-full md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">Solar Generation</h3>
                <div style={{ height: "250px" }}>
                  <Line data={generationChartData} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Select a Month:</h3>
              <div className="flex flex-wrap gap-2">
                {data.map((d) => (
                  <button
                    key={d.month}
                    onClick={() => handleMonthClick(d.month)}
                    className={`px-3 py-2 rounded-lg ${
                      selectedMonth === d.month
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-blue-100"
                    }`}
                  >
                    {d.month}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 rounded-lg p-4">
                <h3 className="font-bold">Selected Month</h3>
                <p className="text-2xl font-semibold mt-2">{selectedMonth}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-4">
                <h3 className="font-bold">Consumption</h3>
                <p className="text-2xl font-semibold mt-2">
                  {currentConsumption.toFixed(2)} kWh
                </p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <h3 className="font-bold">Generation</h3>
                <p className="text-2xl font-semibold mt-2">
                  {currentGeneration.toFixed(2)} kWh
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

import Widget from "@/Components/Dashboard/Widget";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import {
    IconBox,
    IconCategory,
    IconMoneybag,
    IconUsers,
} from "@tabler/icons-react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({
    totalTransactions,
    totalCategories,
    totalProducts,
    totalCustomer,
    totalTransactionsPerMonth,
    totalProfitsPerMonth,
    cashierNames,
}) {
    const chartData = {
        labels: Object.keys(totalTransactionsPerMonth), 
        datasets: [
            {
                label: "Total Transaksi",
                data: Object.values(totalTransactionsPerMonth), 
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
        ],
    };

    const chartDataProfits = {
        labels: Object.keys(totalProfitsPerMonth),
        datasets: [
            {
                label: "Jumlah Transaksi Profit",
                data: Object.values(totalProfitsPerMonth),
                fill: false,
                borderColor: "rgba(153, 102, 255, 1)",
                tension: 0.1,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    const chartOptions2 = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return (
                            tooltipItem.dataset.label +
                            ": Rp. " +
                            tooltipItem.raw.toLocaleString()
                        );
                    },
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return value.toLocaleString();
                    },
                },
            },
        },
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Widget
                    title={"Kategori"}
                    subtitle={"Total Kategori"}
                    color={
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }
                    icon={<IconCategory size={"20"} strokeWidth={"1.5"} />}
                    total={totalCategories}
                />
                <Widget
                    title={"Produk"}
                    subtitle={"Total Produk"}
                    color={
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }
                    icon={<IconBox size={"20"} strokeWidth={"1.5"} />}
                    total={totalProducts}
                />
                <Widget
                    title={"Transaksi"}
                    subtitle={"Total Transaksi"}
                    color={
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }
                    icon={<IconMoneybag size={"20"} strokeWidth={"1.5"} />}
                    total={totalTransactions}
                />
                <Widget
                    title={"Pengguna"}
                    subtitle={"Total Pengguna"}
                    color={
                        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }
                    icon={<IconUsers size={"20"} strokeWidth={"1.5"} />}
                    total={totalCustomer}
                />
            </div>
            <div className="grid grid-cols-1 mt-4 border-t-2 border-neutral-400/30 pt-4 md:grid-cols-2 gap-4">
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-950 dark:border-gray-800 text-gray-700 dark:text-gray-200">
                    <h3 className="mb-3">Grafik Total Transaksi Per Bulan</h3>
                    <Line data={chartData} options={chartOptions} />
                </div>
                <div className="border p-4 rounded-lg bg-white dark:bg-gray-950 dark:border-gray-800 text-gray-700 dark:text-gray-200">
                    <h3 className="mb-3">Grafik Profit Per Bulan</h3>
                    <Line data={chartDataProfits} options={chartOptions2} />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <DashboardLayout children={page} />;

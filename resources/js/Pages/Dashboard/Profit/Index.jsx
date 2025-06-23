import Pagination from "@/Components/Dashboard/Pagination";
import Search from "@/Components/Dashboard/Search";
import Table from "@/Components/Dashboard/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { IconDatabaseOff } from "@tabler/icons-react";
import React from "react";

export default function Index({ profit }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const totalCash = profit.data.reduce(
        (sum, profits) => sum + profits.total,
        0
    );

    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const monthYearList = [
        ...months.map((month) => `${month} - ${currentYear}`),
        ...months.map((month) => `${month} - ${previousYear}`),
    ];

    return (
        <>
            <Head title="Produk" />
            <div className="mb-2">
                <div className="flex justify-between items-center gap-2">
                    <div className="px-4 py-2 text-xl flex items-center gap-2 rounded-lg font-semibold text-neutral-600">
                        <span>Total Profit: {formatCurrency(totalCash)}</span>
                    </div>
                    <div className="w-full md:w-4/12">
                        <Search
                            url={route("profit.index")}
                            placeholder="Cari data berdasarkan kode invoice..."
                        />

                    </div>
                </div>
            </div>
            <Table.Card title={"Data Transaksi"}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th>Invoice</Table.Th>
                            <Table.Th>Cash</Table.Th>
                            <Table.Th>Profit</Table.Th>
                            <Table.Th>Tanggal Transaksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {profit.data.length ? (
                            profit.data.map((profits, i) => (
                                <tr
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                    key={i}
                                >
                                    <Table.Td>
                                        {profits.transaction.invoice}
                                    </Table.Td>
                                    <Table.Td>
                                        {formatCurrency(
                                            profits.transaction.cash
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        {formatCurrency(profits.total)}
                                    </Table.Td>
                                    <Table.Td>
                                        {new Date(
                                            profits.transaction.created_at
                                        ).toLocaleDateString()}
                                    </Table.Td>
                                </tr>
                            ))
                        ) : (
                            <Table.Empty
                                colSpan={7}
                                message={
                                    <>
                                        <div className="flex justify-center items-center text-center mb-2">
                                            <IconDatabaseOff
                                                size={24}
                                                strokeWidth={1.5}
                                                className="text-gray-500 dark:text-white"
                                            />
                                        </div>
                                        <span className="text-gray-500">
                                            Data Produk
                                        </span>{" "}
                                        <span className="text-rose-500 underline underline-offset-2">
                                            tidak ditemukan.
                                        </span>
                                    </>
                                }
                            />
                        )}
                    </Table.Tbody>
                </Table>
            </Table.Card>
            {profit.last_page !== 1 && <Pagination links={profit.links} />}
        </>
    );
}
Index.layout = (page) => <DashboardLayout children={page} />;

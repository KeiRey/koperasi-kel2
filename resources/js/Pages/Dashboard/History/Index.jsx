import Pagination from "@/Components/Dashboard/Pagination";
import Search from "@/Components/Dashboard/Search";
import Table from "@/Components/Dashboard/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import {
    IconDatabaseOff,
} from "@tabler/icons-react";
import React from "react";


export default function Index({ history }) {

    const mapProductTitles = (details) => {
        return details.map((detail) => detail.product.title).join(', ');
    };

    const calculateTotalQty = (details) => {
        return details.reduce((total, detail) => total + detail.qty, 0);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 
        }).format(amount);
    };
    
    return (
        <>
            <Head title="Produk" />
            <div className="mb-2">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-full md:w-4/12">
                        <Search
                            url={route("history.index")}
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
                            <Table.Th>Nama Cashier</Table.Th>
                            <Table.Th>Nama Customer</Table.Th>
                            <Table.Th>Barang</Table.Th>
                            <Table.Th>Qty</Table.Th>
                            <Table.Th>Cash</Table.Th>
                            <Table.Th>Change</Table.Th>
                            <Table.Th>Discount</Table.Th>
                            <Table.Th>Total</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {history.data.length ? (
                            history.data.map((product, i) => (
                                <tr
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                    key={i}
                                >
                                    <Table.Td>
                                       {product.invoice}
                                    </Table.Td>
                                    <Table.Td>{ product?.cashier.name }</Table.Td>
                                    <Table.Td>{ product.customer.name }</Table.Td>
                                    <Table.Td>{mapProductTitles(product.details)}</Table.Td>
                                    <Table.Td>{calculateTotalQty(product.details)}</Table.Td>
                                    <Table.Td>{formatCurrency(product.cash)}</Table.Td>
                                    <Table.Td>{formatCurrency(product.change)}</Table.Td>
                                    <Table.Td>{formatCurrency(product.discount)}</Table.Td>
                                    <Table.Td>{formatCurrency(product.grand_total)}</Table.Td>
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
            {history.last_page !== 1 && (<Pagination links={history.links} />)}
        </>
    );
}
Index.layout = (page) => <DashboardLayout children={page} />;

import Pagination from "@/Components/Dashboard/Pagination";
import Search from "@/Components/Dashboard/Search";
import Table from "@/Components/Dashboard/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import {
    IconDatabaseOff,
} from "@tabler/icons-react";
import React from "react";


export default function Index({ incoming }) {

    // const mapProductTitles = (details) => {
    //     return details.map((detail) => detail.product.title).join(', ');
    // };

    // const calculateTotalQty = (details) => {
    //     return details.reduce((total, detail) => total + detail.qty, 0);
    // };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 
        }).format(amount);
    };

    const formatCreatedAt = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
          weekday: 'long', 
          day: '2-digit',  
          month: 'long',   
          year: 'numeric', 
        };
        return date.toLocaleDateString('id-ID', options);
      };
    
    return (
        <>
            <Head title="Produk" />
            <div className="mb-2">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-full md:w-4/12">
                        <Search
                            url={route("incoming.index")}
                            placeholder="Cari data berdasarkan nama..."
                        />
                    </div>
                </div>
            </div>
            <Table.Card title={"Data Transaksi"}>
                <Table>
                    <Table.Thead>
                        <tr>
                            <Table.Th>Nama Produk</Table.Th>
                            <Table.Th>Jumlah</Table.Th>
                            <Table.Th>Deskripsi</Table.Th>
                            <Table.Th>Categori</Table.Th>
                            <Table.Th>Harga Beli</Table.Th>
                            <Table.Th>Tanggal Masuk</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {incoming.data.length ? (
                            incoming.data.map((product, i) => (
                                <tr
                                    className="hover:bg-gray-100 dark:hover:bg-gray-900"
                                    key={i}
                                >
                                    <Table.Td>{ product.title }</Table.Td>
                                    <Table.Td>{ product.quantity }</Table.Td>
                                    <Table.Td>{ product.description }</Table.Td>
                                    <Table.Td>{ product.category.name }</Table.Td>
                                    <Table.Td>{ formatCurrency(product.buy_price) } / Item</Table.Td>
                                    <Table.Td>{ formatCreatedAt(product.created_at) }</Table.Td>
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
            {/* {incoming.last_page !== 1 && (<Pagination links={incoming.links} />)} */}
        </>
    );
}
Index.layout = (page) => <DashboardLayout children={page} />;

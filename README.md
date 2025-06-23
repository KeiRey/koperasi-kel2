# Aplikasi Kasir (Point of Sales) 
Aplikasi ini dapat digunakan untuk melakukan pencatatan transaksi jual beli pada sebuah warung atau toko. Secara template, Projek ini dibuat untuk memenuhi permintaan instansi pendidikan terkait untuk mengatur koperasi penjualan sekolah sekaligus menyelesaikan tugas Kerja Prakter semester 6 Universitas Pamulang

## Tech Stack

- Laravel 11.x
- Inertia
- React
- TailwindCSS
- MySQL
## Authors

- Keimal Reyyan
- Sahrul
- Sandi

## 📌 Fitur

| No  | Nama |  Status                                                     |
|-----|------------------------------------------------------------|------|
|  1  | Authentikasi Admin.                            |Done|
|  2  | Manajemen Pengguna.                 |Done|
|  3  | Manajemen Hak Akses Pengguna.                      | Done|
|  4  | Manajemen Role Pengguna                          |Done|
|  5  | Manajemen Kategori.               |Done|
|  6  | Manajemen Produk.                                    |Done|
|  7  | Manajemen Pelanggan.     |Done|
|  8  | Print Invoice. |Done|
|  9  | Laporan Penjualan. |Done|
|  10  | Laporan Keuntungan. |Done|
|  11  | Riwayat Order. |Done|
|  12  | Chart/Grafik Pendapatan. |Done|
|  13  | Reminder otomatis saat stok menipis. |Done|
|  14  | Pendataan masuk dan keluarnya barang |- Done|
|  15  | Penambahan role dan pemberian masing-masing akses |- Done|
|  16  | Varians plus dan minus tampilan. |- Todo|
|  17  | GUI user friendly agar dapat digunakan oleh pihak Koperasi sekolah. |- Todo|


------------
## 💻 Panduan Instalasi Project

1. **Clone Repository**
```bash
git clone https://gitlab.com/reyyankeimal1/kp-kelompok2.git 
```
2. **Buka terminal, lalu ketik**
```
cd kp-kelompok2
composer install
npm install
cp .env.example .env
php artisan key:generate
```

3. **Buka ```.env``` lalu ubah baris berikut sesuaikan dengan databasemu yang ingin dipakai**
```
DB_PORT=3306
DB_DATABASE=kp-kelompok
DB_USERNAME=root
DB_PASSWORD=
```

3. **Jalankan bash**
```bash
php artisan config:cache
php artisan storage:link
php artisan route:clear
```

4. **Jalankan migrations dan seeders**
```
php artisan migrate --seed
```
5. **Jalankan nodejs**
```
npm run dev
```

5. **Jalankan website**
```bash
php artisan serve
```


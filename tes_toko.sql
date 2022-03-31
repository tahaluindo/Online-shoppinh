-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2020 at 07:25 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tes_toko`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_barang`
--

CREATE TABLE `tb_barang` (
  `kode_barang` int(255) NOT NULL,
  `namaBarang` varchar(500) NOT NULL,
  `harga` int(255) NOT NULL,
  `stok` int(255) NOT NULL,
  `owner` varchar(500) NOT NULL,
  `id_kategori` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_barang`
--

INSERT INTO `tb_barang` (`kode_barang`, `namaBarang`, `harga`, `stok`, `owner`, `id_kategori`) VALUES
(1, 'Keyboard', 500000, 44, 'aldo@gmail.com', 1),
(2, 'Cake', 10000, 20, 'ghufron@gmail.com', 2),
(3, 'Sepatu', 450000, 15, 'bintang@gmail.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tb_kategori`
--

CREATE TABLE `tb_kategori` (
  `id_kategori` int(255) NOT NULL,
  `jenis` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_kategori`
--

INSERT INTO `tb_kategori` (`id_kategori`, `jenis`) VALUES
(1, 'Elektronik'),
(2, 'Makanan'),
(3, 'Aksesoris');

-- --------------------------------------------------------

--
-- Table structure for table `tb_keranjang`
--

CREATE TABLE `tb_keranjang` (
  `kode_barang` int(255) NOT NULL,
  `email_pembeli` int(255) NOT NULL,
  `total_harga` int(255) NOT NULL,
  `status` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_transaksi`
--

CREATE TABLE `tb_transaksi` (
  `id_transaksi` int(255) NOT NULL,
  `kode_barang` int(255) NOT NULL,
  `jumlah` int(255) NOT NULL,
  `harga_total` int(255) NOT NULL,
  `uang_bayar` int(255) NOT NULL,
  `uang_kembali` int(255) NOT NULL,
  `email_pembeli` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_transaksi`
--

INSERT INTO `tb_transaksi` (`id_transaksi`, `kode_barang`, `jumlah`, `harga_total`, `uang_bayar`, `uang_kembali`, `email_pembeli`) VALUES
(3, 1, 2, 1000000, 4000000, 3000000, 'bintang@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id_user` int(255) NOT NULL,
  `nama_panjang` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id_user`, `nama_panjang`, `email`, `password`) VALUES
(1, 'Bintang Averusya', 'bintang@gmail.com', '$2a$10$NsL6JiSg.texfiXJkKs9T.zVuGpw995dITUS0un5.kjW7AlZjsQHa'),
(2, 'Ghufron Andriansyah', 'ghufron@gmail.com', '$2a$10$y4g53qEpkVxXU0QTO5JcMuOkbJa789N6PVIy4lKKuVKQx2g7klWBy'),
(4, 'Aldo Bintang Bagaskara', 'aldo@gmail.com', '$2a$10$6.9lJ53wTICnQzJ5afaglOTV7aKzHHfNRKGfHITxthiv.ex1nHhBq'),
(5, 'Dimas Afif', 'dimas@gmail.com', '$2a$10$VIAJ00Y9OT3gDYtRO/h/xeqPGmmjc3BJ.KN36Lr.VhWB0y15u/Xhi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_barang`
--
ALTER TABLE `tb_barang`
  ADD PRIMARY KEY (`kode_barang`);

--
-- Indexes for table `tb_kategori`
--
ALTER TABLE `tb_kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `tb_transaksi`
--
ALTER TABLE `tb_transaksi`
  ADD PRIMARY KEY (`id_transaksi`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_barang`
--
ALTER TABLE `tb_barang`
  MODIFY `kode_barang` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_kategori`
--
ALTER TABLE `tb_kategori`
  MODIFY `id_kategori` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_transaksi`
--
ALTER TABLE `tb_transaksi`
  MODIFY `id_transaksi` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id_user` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

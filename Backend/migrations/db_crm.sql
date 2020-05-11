-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 11, 2020 at 06:41 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
CREATE TABLE IF NOT EXISTS `collections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `createdOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `name`, `createdOn`) VALUES
(1, 'Customer', '2020-05-10 17:22:29'),
(2, 'Products', '2020-05-10 17:31:39'),
(3, 'Orders', '2020-05-10 18:13:40'),
(10, 'Purchase orders', '2020-05-10 19:39:22'),
(11, 'Delivery Zones', '2020-05-10 19:39:45'),
(12, 'Leads', '2020-05-10 19:45:22'),
(13, 'Contacts', '2020-05-10 19:47:52');

-- --------------------------------------------------------

--
-- Table structure for table `fields`
--

DROP TABLE IF EXISTS `fields`;
CREATE TABLE IF NOT EXISTS `fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `table_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `table_id` (`table_id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fields`
--

INSERT INTO `fields` (`id`, `name`, `table_id`) VALUES
(1, 'Name', 1),
(2, 'Phone', 1),
(34, 'Source', 1),
(4, 'Email', 1),
(38, 'SKU', 2),
(6, 'Price', 2),
(7, 'Quantity', 2),
(8, 'Order id', 3),
(9, 'Amount', 3),
(10, 'Time', 3),
(11, 'Delivery method', 3),
(21, 'Location', 10),
(20, 'Order amount', 10),
(19, 'Customer name', 10),
(22, 'Area name', 11),
(23, 'Area code', 11),
(24, 'Country', 11),
(25, 'Hub name', 11),
(26, 'Name', 13),
(27, 'Email Id', 13),
(28, 'Phone number', 13),
(39, 'Unit', 2),
(41, 'Source', 12),
(42, 'Phone', 12),
(45, 'Budget', 13),
(48, 'Profession', 1),
(47, 'Location', 12);

-- --------------------------------------------------------

--
-- Table structure for table `user_field_value_map`
--

DROP TABLE IF EXISTS `user_field_value_map`;
CREATE TABLE IF NOT EXISTS `user_field_value_map` (
  `record_id` int(11) DEFAULT NULL,
  `field_id` int(11) NOT NULL,
  `table_id` int(11) NOT NULL,
  `field_value` varchar(50) DEFAULT NULL,
  KEY `field_id` (`field_id`),
  KEY `table_id` (`table_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

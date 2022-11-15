-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 14, 2022 at 09:07 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creazione`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(40) NOT NULL,
  `ifsc_code` varchar(40) NOT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-customer 2- associate 3-employee',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `account_no`, `ifsc_code`, `bank`, `user_id`, `user_type`, `status`) VALUES
(1, '181881818', 'UBIN0562319', 'UNION BANK OF INDIA ', 1, 2, 1),
(2, '1919191', 'IFSC19199191', 'SBI', 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `phone`, `email`, `image`, `pass`, `status`) VALUES
(2, 'hhaha', '88888', 'jajsjsaj', 'nadnadadh', 'ajjaajja', 1),
(3, 'uuuu', '999999999', 'uuuu00', 'nnn00', '666600', 2);

-- --------------------------------------------------------

--
-- Table structure for table `associate`
--

DROP TABLE IF EXISTS `associate`;
CREATE TABLE IF NOT EXISTS `associate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `commission_rate` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL COMMENT '0-admin anyid-employee id',
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `associate`
--

INSERT INTO `associate` (`id`, `name`, `gender`, `email`, `commission_rate`, `employee_id`, `phone`, `balance`, `pass`, `image`, `status`) VALUES
(1, 'Dummy iiiii', 1, 'dummy@gmail.com', 3, 3, '3939393939', 26000, 'ajahahhahah', 'ajjjjjjjjjjjjjjjjjjj', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `referred_by` varchar(20) DEFAULT NULL,
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `referred_by`, `pass`, `image`, `status`) VALUES
(1, 'Bilash', 1, 'emaiai@kaka.po', '919191991', 12000, 'Admin10101', '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', '7d56806e675a892e5055ed43ba21dbbb__1667970088022.jpg', 1),
(2, 'Bilash Halder', 1, 'ibilashhalder@gmail.com', '87654331331', 6000, 'ADMIN002', '$2b$10$c7WCOj6qq6VqU7OMxfpqmel/c0JldvfGy5uORTb0vYecB1iJIfIRu', '7d56806e675a892e5055ed43ba21dbbb__1667970228324.jpg', 1),
(3, 'Bilash Halder', 1, 'ibilashhalder@gmail.co', '8765433130', 6000, 'ADMIN002', '$2b$10$2qb88J1qM7C3biaZIrCPsu2CXGCcewpcZQZdv1nmL48RMDKS0eoSi', '7d56806e675a892e5055ed43ba21dbbb__1667970445854.jpg', 1),
(4, 'full_name', 1, 'nidobe3103@otodir.com', '1188181', 6000, 'ADMIN002', '$2b$10$8u7KKNoo6.jTHKI7RfOD4.OCQFrgOtQzX3UZsJfIRFU.j4E2TG3cG', '7d56806e675a892e5055ed43ba21dbbb__1667970492122.jpg', 1),
(5, 'dipanla', 1, 'akaka@akak.com', '191919191', 6000, 'ajaaj', '$2b$10$FqtIKMkb5vYQ2LyEvATQvekXn9ueqxfES.SBZD3C9zJ1Ul4x5IKhe', '6bbd72744e99ef81f3462ac1533aa986__1667970589711.jpg', 1),
(6, 'Bilash', 1, 'a@a.com', '2828288282', 6000, 'ajajjajajaja', '$2b$10$XwmeEyLHA0HUJBSCR3xmoOX76T.hBH0Oo/cqwk4Ogrw3sBSk3qI5e', 'c6824a15d21d77b6a44a99191aae4481__1667970688449.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
CREATE TABLE IF NOT EXISTS `designation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `title`) VALUES
(1, 'HR');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

DROP TABLE IF EXISTS `employee_info`;
CREATE TABLE IF NOT EXISTS `employee_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `salary_id` int(11) NOT NULL,
  `leave_id` int(11) DEFAULT NULL,
  `dob` date NOT NULL,
  `report_to` int(11) DEFAULT NULL,
  `joining_date` date NOT NULL,
  `acceptance_file` varchar(100) DEFAULT NULL,
  `id_card` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `investment`
--

DROP TABLE IF EXISTS `investment`;
CREATE TABLE IF NOT EXISTS `investment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_type` int(11) NOT NULL DEFAULT '1' COMMENT '1-customer 2-associate 3-Employee',
  `ammount` float NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roi` float NOT NULL DEFAULT '5',
  `nominee_id` int(11) NOT NULL,
  `account_no` varchar(40) NOT NULL,
  `payment_id` varchar(100) DEFAULT NULL,
  `agreement_file` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-pending 1-Active 2-withdraw 3-close',
  `withdrw_req_time` datetime DEFAULT NULL,
  `is_send` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-Not send 1-send',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `investment`
--

INSERT INTO `investment` (`id`, `user_id`, `user_type`, `ammount`, `date_time`, `roi`, `nominee_id`, `account_no`, `payment_id`, `agreement_file`, `status`, `withdrw_req_time`, `is_send`) VALUES
(1, 1, 1, 4000, '2022-11-11 10:54:35', 3, 12, '772727272772', '17', NULL, 1, NULL, 1),
(2, 1, 2, 4000, '2022-11-11 10:55:58', 3, 12, '772727272772', '18', NULL, 1, NULL, 1),
(3, 1, 2, 10000, '2022-11-11 10:56:21', 3, 12, '772727272772', '19', NULL, 1, NULL, 1),
(4, 1, 2, 8000, '2022-11-11 11:00:45', 3, 12, '772727272772', '20', NULL, 1, NULL, 1),
(5, 1, 2, 1000, '2022-11-11 11:01:43', 3, 12, '772727272772', '21', NULL, 1, NULL, 1),
(6, 1, 2, 1000, '2022-11-11 11:44:12', 3, 12, '772727272772', '22', NULL, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `investment_payments`
--

DROP TABLE IF EXISTS `investment_payments`;
CREATE TABLE IF NOT EXISTS `investment_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `account_no` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kyc`
--

DROP TABLE IF EXISTS `kyc`;
CREATE TABLE IF NOT EXISTS `kyc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adhar_no` varchar(20) NOT NULL,
  `pan_no` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `adhar_verified` tinyint(1) NOT NULL,
  `pan_verified` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kyc`
--

INSERT INTO `kyc` (`id`, `adhar_no`, `pan_no`, `address`, `adhar_verified`, `pan_verified`, `user_id`, `user_type`) VALUES
(1, '818818188181', 'ajajjajajja', 'Kolakkakaka', 1, 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `nominee`
--

DROP TABLE IF EXISTS `nominee`;
CREATE TABLE IF NOT EXISTS `nominee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-customer 2-associate',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_mode` varchar(50) NOT NULL COMMENT '1-offline 2-online 3-others',
  `transaction_id` varchar(40) NOT NULL,
  `ammount` double NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT ' 0-failed 1-success 2-pending',
  `to_account` varchar(40) DEFAULT NULL,
  `from_account` varchar(40) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `transaction_time`, `payment_mode`, `transaction_id`, `ammount`, `status`, `to_account`, `from_account`, `remarks`) VALUES
(1, '2022-11-11 10:34:30', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(2, '2022-11-11 10:35:57', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(3, '2022-11-11 10:36:24', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(4, '2022-11-11 10:36:41', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(5, '2022-11-11 10:39:23', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(6, '2022-11-11 10:40:11', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(7, '2022-11-11 10:40:27', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(8, '2022-11-11 10:40:55', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(9, '2022-11-11 10:41:16', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(10, '2022-11-11 10:41:30', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(11, '2022-11-11 10:41:40', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(12, '2022-11-11 10:43:01', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(13, '2022-11-11 10:44:03', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(14, '2022-11-11 10:45:50', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(15, '2022-11-11 10:46:33', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(16, '2022-11-11 10:51:21', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(17, '2022-11-11 10:54:35', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(18, '2022-11-11 10:55:58', '3', 'invesment', 4000, 1, 'creazione', '2_1', 'invesment'),
(19, '2022-11-11 10:56:21', '3', 'invesment', 10000, 1, 'creazione', '2_1', 'invesment'),
(20, '2022-11-11 11:00:45', '3', 'invesment', 8000, 1, 'creazione', '2_1', 'invesment'),
(21, '2022-11-11 11:01:43', '3', 'invesment', 1000, 1, 'creazione', '2_1', 'invesment'),
(22, '2022-11-11 11:44:12', '3', 'invesment', 1000, 1, 'creazione', '2_1', 'invesment');

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
CREATE TABLE IF NOT EXISTS `qualification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree_name` varchar(100) NOT NULL,
  `year_of_pass` int(11) NOT NULL,
  `degree_from` varchar(100) NOT NULL,
  `marks` float NOT NULL,
  `document_url` varchar(100) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basic` float NOT NULL DEFAULT '0',
  `hra` float NOT NULL DEFAULT '0',
  `conveyance` float NOT NULL DEFAULT '0',
  `medical` float NOT NULL DEFAULT '0',
  `special` float NOT NULL DEFAULT '0',
  `pf` float NOT NULL DEFAULT '0',
  `insurance` float NOT NULL DEFAULT '0',
  `tax` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `basic`, `hra`, `conveyance`, `medical`, `special`, `pf`, `insurance`, `tax`) VALUES
(6, 2900, 2000, 1000, 200, 500, 340, 23, 0),
(7, 2900, 2000, 1000, 200, 500, 3535, 23, 0),
(8, 3000, 2000, 2000, 5000, 200, 300, 3400, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

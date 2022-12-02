-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 02, 2022 at 09:20 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `account_no`, `ifsc_code`, `bank`, `user_id`, `user_type`, `status`) VALUES
(1, '181881818', 'UBIN0562319', 'UNION BANK OF INDIA ', 1, 2, 1),
(2, '1919191', 'IFSC19199191', 'SBI', 1, 2, 1),
(3, '989291101010', 'IDIB000J039', 'Indian Bank', 1, 2, 1),
(4, '902029101171', 'BDBL0002002', 'Bandhan Bank', 1, 2, 1),
(5, '234523452345', 'INDB0000587', 'Indusind Bank', 1, 1, 1),
(6, '5454787890', 'SBIN0001612', 'State Bank of India', 1, 1, 1),
(7, '1245543210', 'SBIN0001612', 'State Bank of India', 1, 1, 1),
(8, '87290109118', 'SBIN0030409', 'State Bank of India', 2, 1, 1),
(9, '77277272772727', 'INDB0000587', 'Indusind Bank', 1, 1, 1),
(10, '8373773992', 'SBIN0001612', 'State Bank of India', 1, 1, 1),
(11, '11111111111111', 'SBIN0003029', 'State Bank of India', 1, 3, 1),
(12, '6161661616161', 'SBIN0003029', 'State Bank of India', 12, 1, 1);

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
(2, 'Super Admin', '88888', 'admin@crzn.com', 'nadnadadh', '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', 1),
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
  `referral_key` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `associate`
--

INSERT INTO `associate` (`id`, `name`, `gender`, `email`, `commission_rate`, `employee_id`, `phone`, `balance`, `pass`, `image`, `status`, `referral_key`) VALUES
(1, 'Dummy iiiii', 1, 'dummy@gmail.com', 3, 3, '3939393939', 26000, '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', 'ajjjjjjjjjjjjjjjjjjj', 1, '123456');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

DROP TABLE IF EXISTS `contact_us`;
CREATE TABLE IF NOT EXISTS `contact_us` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `remarks` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `phone_no`, `subject`, `message`, `status`, `remarks`) VALUES
(1, 'bil', '1818181818', 'Test', 'This is msg', 1, 'this is remarks');

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
  `referral_key` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `referred_by`, `pass`, `image`, `status`, `referral_key`) VALUES
(1, 'Bilash', 1, 'emaiai@kaka.po', '919191991', 13500, 'Admin10101', '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', '8c8c0129d7bf873e5c0ce570eadc80e1__1669442982395.jpg', 1, '929292'),
(2, 'Bilash Halder', 1, 'ibilashhalder@gmail.com', '87654331331', 73000, '123456', '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', '7d56806e675a892e5055ed43ba21dbbb__1667970228324.jpg', 1, NULL),
(3, 'Bilash Halder', 1, 'ibilashhalder@gmail.co', '8765433130', 6000, '123456', '$2b$10$2qb88J1qM7C3biaZIrCPsu2CXGCcewpcZQZdv1nmL48RMDKS0eoSi', '7d56806e675a892e5055ed43ba21dbbb__1667970445854.jpg', 1, NULL),
(4, 'full_name', 1, 'nidobe3103@otodir.com', '1188181', 6000, '123456', '$2b$10$8u7KKNoo6.jTHKI7RfOD4.OCQFrgOtQzX3UZsJfIRFU.j4E2TG3cG', '7d56806e675a892e5055ed43ba21dbbb__1667970492122.jpg', 1, NULL),
(5, 'dipanla', 1, 'akaka@akak.com', '191919191', 6000, '123456', '$2b$10$FqtIKMkb5vYQ2LyEvATQvekXn9ueqxfES.SBZD3C9zJ1Ul4x5IKhe', '6bbd72744e99ef81f3462ac1533aa986__1667970589711.jpg', 1, NULL),
(6, 'Bilash', 1, 'a@a.com', '2828288282', 6000, 'ajajjajajaja', '$2b$10$XwmeEyLHA0HUJBSCR3xmoOX76T.hBH0Oo/cqwk4Ogrw3sBSk3qI5e', 'c6824a15d21d77b6a44a99191aae4481__1667970688449.png', 1, NULL),
(7, 'Bilash Halder', 1, 'ibilash@gmail.com', '9609327424', 0, 'ADMIN', '$2b$10$x53CGtwHcR0awJmA0nCnausv6r.E/LaxPsvyPMx/nDGngw1/aqJ3y', '45defb6d0e24986465c85346b63b2143__1668444248943.png', 1, NULL),
(8, 'Bilash Halder', 1, 'ibilash@gmail.co', '9609327428', 0, 'ADMIN', '$2b$10$soUNQkfjQ9ywWiIyrEbr4u3nl009m5pNMCc90yvhNaz02xIKFt5Wm', '45defb6d0e24986465c85346b63b2143__1668444457341.png', 1, NULL),
(9, 'Dipankar Khan', 1, 'dip@khan.com', '9876543210', 0, 'CRZNCUS10', '$2b$10$6Gmgset34lZHNmhcu8o8zeCBsQhhhRJ1BBsAeuhixc4M8psPCiXeC', '0f04ba650595a3cab8f3dad2321caf46__1668444570065.png', 1, NULL),
(10, 'Customer Roa', 1, 'aoaoa@hah.com', '9988443322', 0, 'ADMIN', '$2b$10$kHd8QmBZ4t6mK3dakTXOqO4ltZZIyLIVDIKna0CQ9eEz6ZK.Uzl32', '75b800ac736311c3f2b3360cdb24aa20__1668749025092.jpg', 1, NULL),
(11, 'Sachin deshmukh', 3, 'sachin@gmail.com', '3459870982', 0, '123456', '$2b$10$/XvD53zr9QTXTjOAMzDUpumlfvNcoRXNrSfBnpu2qumTprZIUMs0K', 'dac21df98bc34f015ef84b80f863b234__1669274183374.png', 1, NULL),
(12, 'Ankit Kumar singh', 1, 'ankit@gmail.com', '8584084870', 1000, '123456', '$2b$10$/lKuTM9YOaWoKnkPnJ.FSOQ/lqQdiPwTBuXhTwjehl1KBgOxCcsoq', '4b40af12db5eaf5ef29d9c414bde7fc0__1669792623700.png', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

DROP TABLE IF EXISTS `deposit`;
CREATE TABLE IF NOT EXISTS `deposit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mode` int(11) NOT NULL COMMENT '1-offline 2-upi 3-others',
  `doc` varchar(100) NOT NULL,
  `reference` varchar(50) NOT NULL,
  `remarks` varchar(400) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0-pending 1-success 2-reject',
  `amount` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`id`, `date_time`, `mode`, `doc`, `reference`, `remarks`, `status`, `amount`, `user_id`, `user_type`) VALUES
(1, '2022-11-26 11:43:47', 1, '8c8c0129d7bf873e5c0ce570eadc80e1__1669443227623.jpg', '17717818818', NULL, 1, 4500, 1, 1),
(2, '2022-11-26 11:44:25', 1, '8c8c0129d7bf873e5c0ce570eadc80e1__1669443265212.jpg', '177178188', 'This is remarks ok', 2, 4500, 1, 1),
(3, '2022-11-26 11:49:58', 1, '', '17717800', 'aj jaj jaja', 2, 4500, 1, 1),
(4, '2022-11-26 11:50:23', 2, '', 'pauuauau', NULL, 0, 4500, 1, 1),
(5, '2022-11-26 14:57:51', 2, '', '1222', NULL, 0, 122, 1, 1),
(6, '2022-11-26 15:18:27', 2, '', '1919199119191', NULL, 0, 2000, 2, 1),
(7, '2022-11-26 15:20:25', 1, 'bc9e42c5e84f5d5b7cf947af2183a8a5__1669456225032.png', '1669456224', NULL, 0, 1000, 2, 1),
(8, '2022-11-26 15:23:05', 2, '', '919199191', NULL, 0, 4500, 2, 1),
(9, '2022-11-26 15:24:22', 2, '', '828282882', NULL, 0, 5000, 2, 1),
(10, '2022-11-26 15:25:56', 2, '', '727727272', NULL, 1, 67000, 2, 1),
(11, '2022-11-26 15:26:26', 1, '89b446eaaed5d2cf8010737706d4ae90__1669456586182.png', '1669456586', NULL, 1, 8999, 2, 1),
(12, '2022-11-26 15:27:53', 1, '89b446eaaed5d2cf8010737706d4ae90__1669456673261.png', '1669456673', NULL, 2, 77, 2, 1),
(13, '2022-11-26 15:47:51', 2, '', '98282882', NULL, 0, 45000, 1, 2),
(14, '2022-11-28 00:42:51', 2, '', '2828288282', NULL, 0, 4900, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
CREATE TABLE IF NOT EXISTS `designation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `title`) VALUES
(1, 'System Designer'),
(2, 'Web Developer'),
(3, 'Web Developer'),
(4, 'Software Designe'),
(5, 'New Desgination'),
(6, 'TEST DESIGN'),
(7, 'Customer Executive');

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `pass`, `image`, `status`) VALUES
(1, 'Bilash Halder', 1, 'ibilash@gmail.op', '9876987699', 0, '$2b$10$n4WS0hPTqZsuyy16MPbfAee9NQtING9YbRGo6kGjAF6P7w9ayYwQm', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(2, 'Bilash Halder', 2, 'ibilash@gmail.opo', '9876987690', 0, '$2b$10$Kf4BEcrZSqrVUrTgnms/z.aFeJGyqoVq98tVvWuV8clH0N7VdRiG6', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(3, 'Test Employee', 2, 'test@test.com', '9872190909', 0, '$2b$10$ni.OSLKXKir09eEc2nOEr.6DUUlMOJH3odtbbpE51bMjAkYRYekMq', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(4, 'user nnaa', 2, 'user@emp.in', '9898238490', 0, '$2b$10$YJeVey6prQF94KWOp6jSHOMKxGeW8M.0n2pOmfU56WlpgwnBLb4Ue', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(5, 'akakk akak', 2, 'kkka@kak.com', '9988776655', 0, '$2b$10$YeUEjpIspF7J0lxsT598b.6OuOeCsx2L1oK2rfOpgWA7pmh1MLx8e', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(6, 'Amir Khan', 2, 'amir@gmail.com', '9823908070', 0, '$2b$10$0n/hTDeU.Jegrp7QgHFIVeH7POGruRVESWRJb3KRSh/MkC30TyvTG', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(7, 'Test Test', 2, 'test@gmail.oo', '2345987645', 0, '$2b$10$2mVp.4TqZ0ASERf2silQE.0ydlGGtG.cM7LDztEjDn8ubJLJ0vStq', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(8, 'Test Emp', 3, 'epm@amam.op', '8766785544', 0, '$2b$10$7Xa0PppE7H0zXWwyuf5gxu/.mmlcYyNvBoKFtMlXBgn7l.arKRqJO', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(9, 'Lorem user', 2, 'lorem@lorem.com', '9872340909', 0, '$2b$10$v6dji3H4dAMGgfwUB/z0hu8ZHuVefuwDYgEqY4NIEMoBWMF/JUfs.', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(10, 'Lorem ', 2, 'lorem@123.com', '7766554433', 0, '$2b$10$jJdenGo0o7V08LBUk/CHe.TWcVBVtgDiYbJWlG6w9EztC128N12Uq', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(11, 'lorem ttt', 2, 'lorem@ttt.com', '9876312345', 0, '$2b$10$AYkveEVgOKzRYkFNhjLgQe39dD456Xp/DZ7ILmdBZzAWrVMCKvISu', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(12, 'Lorem ', 3, 'lorem@12322.com', '2233889922', 0, '$2b$10$6kFcufdvG3d5y8.ZtlSaiO1ozIfUWQXiwDQdm.ditVk9zF6O4KWkW', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(13, 'Lorem ', 3, 'lorem@ttwt.com', '1122009922', 0, '$2b$10$MuBpeAIIFAf8ucUbfbc/YOhprtuhmaVSCmd.aSr8mFL.Kxb79Oj8q', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(14, 'lorem ttt', 2, 'lorm@ttt.com', '2211334455', 0, '$2b$10$xd2mKpcChcPhh/zw1MMLM.rn2lgt3.38kR2JxdRFDsYeR1o/Whlpy', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(15, 'Bilas', 2, 'bia@haa.com', '2233449098', 0, '$2b$10$ZPpNJOxlcz5oc6fz8KApAOa1EMY1sS8qWuOUokrD89YnUGj1Ht3ru', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(16, 'lorem ttt', 2, 'lorem@lorem.co', '3909218900', 0, '$2b$10$Y0/br5BpQkxNuNvDu2ls.eSwuiJb5x9xHAmBQ7WIx2AZT5pB1HwKW', '2c67f965c6047b1a760b2433859a8869__1668493715219.png', 1),
(17, 'Sachin deshmukh', 1, 'sachin@gmail.com', '8899228800', 0, '$2b$10$psf9i0KXT2ze8RWK9Zm5xe5AfcfIHOI2qSrXSqcs2OJ8qL59ulfFu', 'b2515365e0fcc1fd7cc6f23a774913e2__1668748927989.jpg', 1),
(18, 'ahahah ahhaha', 3, 'hahahah@ahahah.com', '7766225522', 0, '$2b$10$g9vBv.tpkSpWCmXQWXxeheIyeFZ2IsKN2E5pIUDsmx66t3eT27bPy', '42d41e6133b1ff5a44c537ea957a7ab9__1669872494619.jpg', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_info`
--

INSERT INTO `employee_info` (`id`, `employee_id`, `designation_id`, `salary_id`, `leave_id`, `dob`, `report_to`, `joining_date`, `acceptance_file`, `id_card`) VALUES
(1, 1, 1, 1, 1, '2012-11-05', 3, '2022-11-02', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
CREATE TABLE IF NOT EXISTS `holidays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `h_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `title`, `h_date`) VALUES
(1, 'Festival Uppp', '2022-12-28'),
(2, 'Test Festival Uuu', '2023-01-26');

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
  `referral_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `investment`
--

INSERT INTO `investment` (`id`, `user_id`, `user_type`, `ammount`, `date_time`, `roi`, `nominee_id`, `account_no`, `payment_id`, `agreement_file`, `status`, `withdrw_req_time`, `is_send`, `referral_id`) VALUES
(1, 1, 1, 4000, '2022-11-11 10:54:35', 3, 1, '772727272772', '17', 'aaa.pdf', 2, '2022-11-07 12:47:29', 1, NULL),
(2, 1, 2, 4000, '2022-11-11 10:55:58', 5, 5, '989291101010', '18', '252bdf79f005e28bdb0f354a9dc2884a__1669797108117.pdf', 1, NULL, 0, NULL),
(3, 1, 2, 10000, '2022-11-11 10:56:21', 3, 5, '989291101010', '19', '252bdf79f005e28bdb0f354a9dc2884a__1669797571577.pdf', 2, NULL, 0, NULL),
(4, 1, 2, 8000, '2022-11-11 11:00:45', 3, 1, '772727272772', '20', NULL, 3, NULL, 0, NULL),
(5, 1, 2, 1000, '2022-11-11 11:01:43', 3, 1, '772727272772', '21', NULL, 1, NULL, 1, NULL),
(6, 1, 2, 1000, '2022-11-11 11:44:12', 3, 1, '772727272772', '22', NULL, 1, NULL, 1, NULL),
(7, 1, 1, 1000, '2022-11-15 10:30:40', 3, 2, '181881818', '23', NULL, 1, NULL, 1, NULL),
(8, 1, 1, 1000, '2022-11-15 10:33:17', 3, 2, '181881818', '24', NULL, 3, NULL, 1, NULL),
(9, 1, 1, 9000, '2022-11-25 12:04:12', 3, 7, '234523452345', '25', 'e168795db05ae628500515b4c3275797__1669878504285.pdf', 1, NULL, 0, NULL),
(10, 1, 1, 9000, '2022-11-25 12:16:05', 3, 7, '1245543210', '26', NULL, 1, NULL, 1, NULL),
(11, 1, 1, 80000, '2022-11-25 12:16:30', 3, 3, '5454787890', '27', NULL, 1, NULL, 0, NULL),
(12, 1, 1, 10000, '2022-11-25 12:17:13', 3, 7, '1245543210', '28', NULL, 1, NULL, 1, NULL),
(13, 1, 1, 5000, '2022-11-25 12:20:48', 3, 7, '234523452345', '29', NULL, 1, NULL, 1, NULL),
(14, 1, 1, 4899, '2022-11-25 12:26:04', 3, 7, '5454787890', '30', NULL, 1, NULL, 1, NULL),
(15, 1, 1, 8000, '2022-11-28 01:23:43', 3, 7, '5454787890', '31', NULL, 1, NULL, 1, NULL),
(16, 1, 1, 1000, '2022-11-28 01:24:15', 3, 7, '1245543210', '32', NULL, 1, NULL, 1, NULL),
(17, 1, 1, 1000, '2022-11-28 14:50:15', 3, 9, '5454787890', '33', NULL, 1, NULL, 0, NULL),
(18, 1, 1, 1000, '2022-11-30 12:40:11', 3, 7, '5454787890', '34', NULL, 1, NULL, 1, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kyc`
--

INSERT INTO `kyc` (`id`, `adhar_no`, `pan_no`, `address`, `adhar_verified`, `pan_verified`, `user_id`, `user_type`) VALUES
(1, '818818188181', 'AIFPH1212323E', 'DN 36, Collegemore, 36, Street Number 13, DN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091', 1, 1, 9, 1),
(2, '4373 2682 6937', 'AIFPH1669F', 'kolkata', 1, 1, 2, 2),
(3, '4373 2682 6937', 'AIFPH1669F', 'Kolkata', 1, 1, 1, 2),
(4, '4373 2682 6937', 'AIFPH1669F', 'Kolkata', 1, 1, 6, 1),
(5, '367598346013', 'AIFPH1669F', 'Kolkata New Address Kolkata Nio Pla', 1, 1, 10, 1),
(7, '347698761230', 'AIFPH1669F', 'Arshdeep Singh to Latham, 3 runs, low full toss on the pads', 1, 1, 1, 1),
(8, '454587980987', 'AIFPH1669F', 'View Photo EXIF Metadata on iPhone, Android, Mac, and Windows', 1, 1, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `leave_application`
--

DROP TABLE IF EXISTS `leave_application`;
CREATE TABLE IF NOT EXISTS `leave_application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `total_days` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0-pending 1-accepted 2-rejected',
  `application_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_application`
--

INSERT INTO `leave_application` (`id`, `employee_id`, `category`, `from_date`, `to_date`, `total_days`, `status`, `application_time`) VALUES
(1, 2, 'sick', '2022-12-07', '2022-12-09', 3, 0, '2022-12-02 11:00:38');

-- --------------------------------------------------------

--
-- Table structure for table `leave_category`
--

DROP TABLE IF EXISTS `leave_category`;
CREATE TABLE IF NOT EXISTS `leave_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `annual` int(11) DEFAULT NULL,
  `casual` int(11) DEFAULT NULL,
  `sick` int(11) DEFAULT NULL,
  `maternity` int(11) DEFAULT NULL,
  `bereavement` int(11) DEFAULT NULL,
  `others` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_category`
--

INSERT INTO `leave_category` (`id`, `annual`, `casual`, `sick`, `maternity`, `bereavement`, `others`) VALUES
(1, 1, 1, 3, 1, 1, 1),
(2, 2, 2, 2, 2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `leave_remain`
--

DROP TABLE IF EXISTS `leave_remain`;
CREATE TABLE IF NOT EXISTS `leave_remain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `annual` int(11) NOT NULL,
  `casual` int(11) NOT NULL,
  `sick` int(11) NOT NULL,
  `maternity` int(11) NOT NULL,
  `bereavement` int(11) NOT NULL,
  `others` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_remain`
--

INSERT INTO `leave_remain` (`id`, `employee_id`, `annual`, `casual`, `sick`, `maternity`, `bereavement`, `others`) VALUES
(1, 1, 2, 1, 1, 1, 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nominee`
--

INSERT INTO `nominee` (`id`, `name`, `dob`, `user_id`, `user_type`, `status`) VALUES
(1, 'Dibakar Sarkar', '1993-11-12', 4, 1, 1),
(2, 'Susan Day', '2016-06-22', 4, 1, 1),
(3, 'Pallab Rao', '2010-06-17', 1, 1, 1),
(4, 'Bilash New', '2022-11-08', 1, 2, 1),
(5, 'Test Nominee', '1993-11-09', 1, 2, 1),
(6, 'Test User', '2000-12-22', 1, 2, 1),
(7, 'New Nominee', '2016-02-02', 1, 1, 1),
(8, 'Puspa Raj', '2022-11-10', 4, 1, 1),
(9, 'Rahul Dev', '1994-11-29', 1, 1, 1),
(10, 'Test Nominee', '2022-05-19', 2, 1, 1),
(11, 'Test Nominee', '1997-11-22', 1, 1, 1),
(12, 'Puspa Raj', '2020-01-13', 12, 1, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

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
(12, '2022-11-11 10:43:01', '3', 'invesment', 4000, 1, '1_3', 'creazione', 'salary'),
(13, '2022-11-11 10:44:03', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(14, '2022-11-11 10:45:50', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(15, '2022-11-11 10:46:33', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(16, '2022-11-11 10:51:21', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(17, '2022-11-11 10:54:35', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(18, '2022-11-11 10:55:58', '3', 'invesment', 4000, 1, 'creazione', '2_1', 'invesment'),
(19, '2022-11-11 10:56:21', '3', 'invesment', 10000, 1, 'creazione', '2_1', 'invesment'),
(20, '2022-11-11 11:00:45', '3', 'invesment', 8000, 1, 'creazione', '2_1', 'invesment'),
(21, '2022-11-11 11:01:43', '3', 'invesment', 1000, 1, 'creazione', '2_1', 'invesment'),
(22, '2022-11-11 11:44:12', '3', 'invesment', 1000, 1, 'creazione', '2_1', 'invesment'),
(23, '2022-11-15 10:30:40', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment'),
(24, '2022-11-15 10:33:17', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment'),
(25, '2022-11-25 12:04:12', '3', 'invesment', 9000, 1, 'creazione', '1_1', 'invesment'),
(26, '2022-11-25 12:16:05', '3', 'invesment', 9000, 1, 'creazione', '1_1', 'invesment'),
(27, '2022-11-25 12:16:30', '3', 'invesment', 80000, 1, 'creazione', '1_1', 'invesment'),
(28, '2022-11-25 12:17:13', '3', 'invesment', 10000, 1, 'creazione', '1_1', 'invesment'),
(29, '2022-11-25 12:20:48', '3', 'invesment', 5000, 1, 'creazione', '1_1', 'invesment'),
(30, '2022-11-25 12:26:04', '3', 'invesment', 4899, 1, 'creazione', '1_1', 'invesment'),
(31, '2022-11-28 01:23:43', '3', 'invesment', 8000, 1, 'creazione', '1_1', 'invesment'),
(32, '2022-11-28 01:24:15', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment'),
(33, '2022-11-28 14:50:15', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment'),
(34, '2022-11-30 12:40:11', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment');

-- --------------------------------------------------------

--
-- Table structure for table `payout`
--

DROP TABLE IF EXISTS `payout`;
CREATE TABLE IF NOT EXISTS `payout` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invesment_id` int(11) NOT NULL,
  `account_no` varchar(30) NOT NULL,
  `ifsc_code` varchar(30) NOT NULL,
  `amount` float NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `transaction_id` varchar(30) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-sucess 0-failed 2-pending 1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payout`
--

INSERT INTO `payout` (`id`, `invesment_id`, `account_no`, `ifsc_code`, `amount`, `date_time`, `user_id`, `user_type`, `transaction_id`, `status`) VALUES
(1, 1, '292999292', 'ppwpwppwpw', 3000, '2022-11-28 14:37:49', 1, 1, '788888yy888uu8', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `qualification`
--

INSERT INTO `qualification` (`id`, `degree_name`, `year_of_pass`, `degree_from`, `marks`, `document_url`, `employee_id`) VALUES
(1, 'B.Sc. in Food Science & Technology', 2012, 'Maulana Abul Kalam Azad University of Technology', 99, '53d702ec9e94bc8f32f903857f18c1bd__1668576482127.pdf', 1),
(2, 'Computer Applications and IT', 2018, 'Jadavpur University', 99, '4b470f9bd8e920eaca3da28f78e2bb71__1668576597660.pdf', 1),
(3, 'M Tech In CSE', 2002, 'University of Kalyani', 72, '53d702ec9e94bc8f32f903857f18c1bd__1668577560199.pdf', 2),
(4, 'Computer Applications and IT', 2012, 'Jadavpur University kolkata', 90, '9eefc1d6833ca344cc0cd11bfea87f64__1668579002468.pdf', 1),
(5, 'Computer Applications and IT', 2019, 'University of Kalyani', 22, '53d702ec9e94bc8f32f903857f18c1bd__1668577720184.pdf', 1),
(6, 'Test Degree', 2010, 'WBUT Jadavpur University', 39, 'e168795db05ae628500515b4c3275797__1669655752070.pdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `subject` varchar(1000) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `remarks` varchar(600) DEFAULT NULL,
  `request_type` int(11) DEFAULT NULL COMMENT '1-contact us 2-BA 3-CSP',
  `status` int(11) DEFAULT '0' COMMENT '0-pending 1-complete',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `name`, `subject`, `message`, `email`, `phone`, `remarks`, `request_type`, `status`) VALUES
(1, 'Neque porro', 'quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,', 'test@test.com', '1234567890', 'aaaaaaaaa', 1, 1),
(2, 'RRR MMAMA', 'Why do we use it?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty', 'test@test.com', '3939393939', 'kkkkkkkkkkkk', 2, 1),
(3, 'RRR MMAMA', 'Why do we use it?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a ty', 'test@test.com', '3939393939', 'This is Solved', 3, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `basic`, `hra`, `conveyance`, `medical`, `special`, `pf`, `insurance`, `tax`) VALUES
(28, 1000, 1000, 1000, 1000, 1000, 1000, 100, 100);

-- --------------------------------------------------------

--
-- Table structure for table `work_report`
--

DROP TABLE IF EXISTS `work_report`;
CREATE TABLE IF NOT EXISTS `work_report` (
  `report_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `report_date` varchar(50) DEFAULT NULL,
  `start_time` varchar(50) DEFAULT NULL,
  `report_to` int(11) DEFAULT NULL,
  `submit_time` time DEFAULT NULL,
  `report` varchar(1000) DEFAULT NULL,
  `document_url` varchar(100) DEFAULT NULL,
  `login_location` varchar(200) DEFAULT NULL,
  `logout_location` varchar(200) DEFAULT NULL,
  `reject_for` varchar(200) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '2' COMMENT '1-accept 0-reject 2-pending 3-submitted',
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `work_report`
--

INSERT INTO `work_report` (`report_id`, `employee_id`, `report_date`, `start_time`, `report_to`, `submit_time`, `report`, `document_url`, `login_location`, `logout_location`, `reject_for`, `status`) VALUES
(1, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(2, 1, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 2),
(3, 1, '2022-12-01', '14:39:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 01, 2017 at 07:03 AM
-- Server version: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student`
--

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `access_token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`access_token`) VALUES
('peOYaCI80kefzvZWRar6cURWyShyvDF1'),
('cNCIyXyvBJzSCGaVcslpMijqsZBoOZiS'),
('A21bv4G5H2NnekJaeBYxRDEn2ZshhMP5'),
('XhcHcwUHE5kTp4aixFQjVqTj0pXDCDi5'),
('artwLOkbmTeI48fBtGqiacWHbXTy2XP5'),
('r9jNk6gO0MtQoLkF1OJ14EVZCGYEcmfn'),
('3STxMwfDnFTKjvxDNCbnhlzsE8w5hlYd'),
('e9HAj3A5pdCgqcdGqakhnTGwHkRikUhJ'),
('pjytjOV3IDtV55KQJi6iqGwppTaNMy4B'),
('pJgw8et0y08iLzsGsF2JqmMiMZAzI2qm'),
('PILpSWUm047Ydr5wlYSJZljlvnmWrgFE'),
('AkxIg5gCypjHO0iWeklOkyxdkuvnQjp7'),
('f13tXRCRSwsqordTWmLlpYofMbIJsnP9');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `DOB` date NOT NULL,
  `Age` int(11) NOT NULL,
  `school` varchar(200) NOT NULL,
  `class` varchar(5) NOT NULL,
  `DIVISION` varchar(5) NOT NULL,
  `studentStatus` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `Name`, `DOB`, `Age`, `school`, `class`, `DIVISION`, `studentStatus`) VALUES
(4, 'Pravin Mishra', '1990-08-04', 27, 'Podar School', '1', 'A', 'active'),
(5, 'Arvind Adak', '1991-08-08', 26, 'Podar School', '1', 'A', 'active'),
(6, 'Kamlesh Khopkar', '1991-08-12', 26, 'Podar School', '1', 'A', 'active'),
(7, 'Kamlesh Dinkar', '2010-08-12', 7, 'Podar School', '2', 'B', 'active'),
(15, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(16, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(17, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(18, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(19, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(20, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(21, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(22, 'Kamlesh Khopkar', '2013-08-12', 4, 'Podar School', '1', 'A', 'active'),
(23, 'Pravin Taneja', '1989-08-04', 28, 'Sarasvati School', '6', 'C', 'active'),
(24, 'Pravin Taneja', '1989-08-04', 28, 'Sarasvati School', '6', 'C', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `userPassword` varchar(100) NOT NULL,
  `passwordSalt` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phoneNumber`, `userPassword`, `passwordSalt`) VALUES
(1, NULL, '9867542317', '$2a$10$bPxUh7XNdSMQm55XWA9eM.RkfBMNE.bH82vMUueaDpZSBu4BYRCly', '$2a$10$bPxUh7XNdSMQm55XWA9eM.'),
(2, 'pravin@yahoo.com', NULL, '$2a$10$Lrk11MGDnaALQ/rPvAAaOeLiNtKGC6SXGxcxEOjcqIrSVCbJZjc6C', '$2a$10$Lrk11MGDnaALQ/rPvAAaOe'),
(3, NULL, '9167047237', '$2a$10$fWAyBxiouEAiKs.Scl.ane65uFyxzSBYidARnh8QGy8BDojSQydF.', '$2a$10$fWAyBxiouEAiKs.Scl.ane'),
(4, NULL, '8767412775', '$2a$10$CpOoo4/hlYxI2eTinuzVGuC2cMzEBNC/66iecjbApwmsk5MwyQJna', '$2a$10$CpOoo4/hlYxI2eTinuzVGu'),
(5, NULL, '9819222976', '$2a$10$06d9OWxjOFSYM8gomCkkwu3TIig17305ywaSl4fS.4sjzK/AfrxIy', '$2a$10$06d9OWxjOFSYM8gomCkkwu'),
(6, 'pravin@gmail.com', NULL, '$2a$10$8mai3Lnq4.NcB1fGwYzv7uaKYimiHT6OUkAg/b183d6kEMsdAFa7e', '$2a$10$8mai3Lnq4.NcB1fGwYzv7u');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

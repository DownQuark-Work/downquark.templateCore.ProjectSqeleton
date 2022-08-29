-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for osx10.17 (arm64)
--
-- Host: localhost    Database: dq.relational
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Sequence structure for `sqnc`
--

DROP SEQUENCE IF EXISTS `sqnc`;
CREATE SEQUENCE `sqnc` start with 100 minvalue 1 maxvalue 9223372036854775806 increment by 13 cache 1000 nocycle ENGINE=InnoDB;
SELECT SETVAL(`sqnc`, 13100, 0);

--
-- Table structure for table `dq.system`
--

-- TODO: Apply the versioning (and associated view) to the comments table instead
DROP TABLE IF EXISTS `dq.system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dq.system` (
  `x` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 WITH SYSTEM VERSIONING
 PARTITION BY SYSTEM_TIME INTERVAL 1 MONTH STARTS TIMESTAMP'2022-08-25 04:00:00'
PARTITIONS 12;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dq.system`
--

LOCK TABLES `dq.system` WRITE;
/*!40000 ALTER TABLE `dq.system` DISABLE KEYS */;
INSERT INTO `dq.system` VALUES
(1),
(13),
(13),
(13),
(13),
(13);
/*!40000 ALTER TABLE `dq.system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loqation`
--

DROP TABLE IF EXISTS `loqation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loqation` (
  `id` uuid NOT NULL DEFAULT sys_guid(),
  `name` varchar(100) NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loqation`
--

LOCK TABLES `loqation` WRITE;
/*!40000 ALTER TABLE `loqation` DISABLE KEYS */;
/*!40000 ALTER TABLE `loqation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` uuid NOT NULL DEFAULT sys_guid(),
  `username` varchar(12) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES
('ed62d20a-249c-11ed-9cf0-c29d42d3cfc8','downquark','2022-08-25 17:39:53'),
('3af6e4f0-24a4-11ed-9cf0-c29d42d3cfc8','downquarq','2022-08-25 18:32:09');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER memberadded
AFTER INSERT
ON `member` FOR EACH ROW
  INSERT INTO qollection (`key.id.member`)
    VALUES (NEW.id) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `qollection`
--

DROP TABLE IF EXISTS `qollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qollection` (
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `title` varchar(85) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `views` tinyint(4) DEFAULT NULL,
  `key.id.member` uuid DEFAULT NULL COMMENT 'For Foreign Keys, the Engine _must_ be InnoDB',
  KEY `fk.qollection.member` (`key.id.member`),
  CONSTRAINT `fk.qollection.member` FOREIGN KEY (`key.id.member`) REFERENCES `member` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qollection`
--

LOCK TABLES `qollection` WRITE;
/*!40000 ALTER TABLE `qollection` DISABLE KEYS */;
INSERT INTO `qollection` VALUES
('2022-08-25 17:48:14',NULL,NULL,NULL,'ed62d20a-249c-11ed-9cf0-c29d42d3cfc8'),
('2022-08-25 18:32:09',NULL,NULL,NULL,'3af6e4f0-24a4-11ed-9cf0-c29d42d3cfc8');
/*!40000 ALTER TABLE `qollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qomment`
--

DROP TABLE IF EXISTS `qomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qomment` (
  `id` uuid NOT NULL DEFAULT sys_guid(),
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `content` varchar(255) DEFAULT NULL,
  `id.applyto` uuid NOT NULL COMMENT 'sys_guid allows us to reference qrx as well as other comments.',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qomment`
--

LOCK TABLES `qomment` WRITE;
/*!40000 ALTER TABLE `qomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `qomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qrx`
--

DROP TABLE IF EXISTS `qrx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qrx` (
  `id` uuid NOT NULL DEFAULT sys_guid(),
  `title` varchar(85) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL,
  `private` tinyint(1) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `views` tinyint(4) NOT NULL DEFAULT 0,
  `quark` varchar(255) NOT NULL DEFAULT './',
  `id.qollection` uuid NOT NULL,
  `id.loqation` uuid NOT NULL,
  `id.member` uuid NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qrx`
--

LOCK TABLES `qrx` WRITE;
/*!40000 ALTER TABLE `qrx` DISABLE KEYS */;
/*!40000 ALTER TABLE `qrx` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` uuid NOT NULL DEFAULT sys_guid(),
  `title` varchar(85) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag.qrx`
--

DROP TABLE IF EXISTS `tag.qrx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag.qrx` (
  `id.qrx` uuid NOT NULL,
  `id.tag` uuid NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 PAGE_CHECKSUM=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag.qrx`
--

LOCK TABLES `tag.qrx` WRITE;
/*!40000 ALTER TABLE `tag.qrx` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag.qrx` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `view.system.queries`
--

DROP TABLE IF EXISTS `view.system.queries`;
/*!50001 DROP VIEW IF EXISTS `view.system.queries`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `view.system.queries` (
  `x` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'dq.relational'
--

--
-- Dumping routines for database 'dq.relational'
--

--
-- Final view structure for view `view.system.queries`
--

/*!50001 DROP TABLE IF EXISTS `view.system.queries`*/;
/*!50001 DROP VIEW IF EXISTS `view.system.queries`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view.system.queries` AS select `dq.system`.`x` AS `x` from `dq.system` FOR SYSTEM_TIME BETWEEN TIMESTAMP current_timestamp() - interval 1 hour AND TIMESTAMP current_timestamp(6) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-28  0:25:25

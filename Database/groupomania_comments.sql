-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  `PostId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'super','2022-09-21 21:27:36','2022-09-21 21:27:36',2,9),(7,'coucou','2022-09-26 11:07:37','2022-09-26 11:07:37',2,5),(15,'marrant','2022-09-26 17:28:33','2022-09-26 17:28:33',7,11),(16,'marrant','2022-09-26 17:28:41','2022-09-26 17:28:41',7,10),(19,'comptez sur moi','2022-09-26 18:13:41','2022-09-26 18:13:41',1,3),(20,'je viens aussi !','2022-09-27 11:58:23','2022-09-27 11:58:23',2,3),(33,'merci','2022-10-01 17:37:55','2022-10-01 17:37:55',2,13),(35,'génial, mais il pleut','2022-10-02 16:14:23','2022-10-02 16:14:23',2,3),(36,'ah ah ah','2022-10-02 16:15:37','2022-10-02 16:15:37',2,8),(37,'ok','2022-10-02 16:16:26','2022-10-02 16:16:26',2,8),(38,'youpi','2022-10-02 16:18:00','2022-10-02 16:18:00',2,8),(67,'ok super','2022-10-10 17:23:03','2022-10-10 17:23:03',2,16),(69,'youpi','2022-10-10 17:23:56','2022-10-10 17:23:56',2,16),(70,'super','2022-10-10 17:38:28','2022-10-10 17:38:28',2,16),(71,'top','2022-10-10 17:40:11','2022-10-10 17:40:11',2,16),(72,'coucou','2022-10-10 21:47:45','2022-10-10 21:47:45',2,54),(74,'youpi','2022-10-11 07:56:18','2022-10-11 07:56:18',2,58),(75,'ok','2022-10-11 07:56:55','2022-10-11 07:56:55',2,58),(76,'super','2022-10-11 07:57:28','2022-10-11 07:57:28',2,58),(77,'bien','2022-10-11 07:57:47','2022-10-11 07:57:47',2,58),(82,'ok','2022-10-11 18:46:03','2022-10-11 18:46:03',2,58),(83,'ok\n','2022-10-11 18:47:37','2022-10-11 18:47:37',2,58),(84,'super','2022-10-11 18:47:49','2022-10-11 18:47:49',2,58),(85,'super','2022-10-12 17:07:51','2022-10-12 17:07:51',2,58),(86,'ok','2022-10-12 17:07:54','2022-10-12 17:07:54',2,58);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-12 17:31:46

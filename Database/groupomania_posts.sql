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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (3,'grande fête','coucou\r\nn\'oubliez pas la grande fête de rentrée sur la place du village...','logo1663835849053.jpg','2022-08-31 10:38:39','2022-09-22 10:37:29',2),(5,'mon premier post','Je suis Marie et j\'aime la poésie','poesie1662885608030.jpg','2022-09-11 10:40:08','2022-09-11 10:40:08',3),(8,'dernier délais','attention, n\'oubliez pas la grande fête de ce soir. Les gâteaux sont prêts.','fin1663507925117.jpg','2022-09-18 15:32:05','2022-10-01 18:50:20',2),(9,'grand test','on voit comment le rerender fonctionne','logo1665073372451.jpg','2022-09-21 11:38:02','2022-10-06 18:22:52',2),(10,'un nouveau message','avec un gif comme image','schtroumpf3_(27)1664010600300.gif','2022-09-24 11:10:00','2022-09-24 11:10:00',2),(11,'nouvelle tentative','pour continuer d\'essayer','schtroumpf_(12)1664200914514.gif','2022-09-26 16:01:54','2022-10-06 18:35:40',2),(13,'message pour rire','essai pour être supprimé','anniversaire1664206178592.jpg','2022-09-26 17:29:38','2022-09-26 17:29:38',7),(16,'grande nouvelle','la fête est maintenue !!! On sera très nombreux...',NULL,'2022-09-27 18:00:14','2022-10-10 18:09:26',2),(52,'coucou','c\'est moi',NULL,'2022-10-10 18:14:50','2022-10-10 18:14:50',2),(54,'titre','message',NULL,'2022-10-10 21:47:39','2022-10-10 21:47:39',2),(58,'coucou','c\'est moi !!!!',NULL,'2022-10-10 22:43:17','2022-10-12 16:50:02',2),(72,'encore une fois','on continue',NULL,'2022-10-12 17:25:58','2022-10-12 17:25:58',2);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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

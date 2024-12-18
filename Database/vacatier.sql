CREATE DATABASE  IF NOT EXISTS `vacatier` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacatier`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacatier
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `userId` varchar(36) NOT NULL,
  `vacationId` varchar(36) NOT NULL,
  `likeDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_vacation` (`userId`,`vacationId`),
  KEY `likes_ibfk_2` (`vacationId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES ('0474f796-9919-4c4b-946c-234406d392ae','1f92104f-aa05-42fb-8106-6e4c4810d29a','2e4aed82-b8bc-11ef-9dcf-d481d75be5a6','2024-12-16 00:07:40'),('16b40303-957c-49bd-9873-5c004e38e238','1f92104f-aa05-42fb-8106-6e4c4810d29a','2b4cb0f4-a41c-4c6a-a15a-08989246e079','2024-12-15 12:19:53'),('227fe306-13a3-4ea4-a69d-905019fa3711','52b2f459-0fd6-4565-9978-7429041d30fa','2e4ad5f2-b8bc-11ef-9dcf-d481d75be5a6','2024-12-15 12:20:33'),('30d7a11c-5ef6-4fd8-9a26-0d02c4679876','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','2e4ad5f2-b8bc-11ef-9dcf-d481d75be5a6','2024-12-15 22:06:55'),('36afad4b-b57e-434d-804c-3fe4c4312bfc','52b2f459-0fd6-4565-9978-7429041d30fa','2e4ad13d-b8bc-11ef-9dcf-d481d75be5a6','2024-12-14 01:04:56'),('378ea7f8-09e4-457e-b7f4-2ce2757b300c','e6053beb-e60c-480b-8f92-9d1f1229f3da','2e4ad13d-b8bc-11ef-9dcf-d481d75be5a6','2024-12-15 09:54:47'),('39c01f00-5b88-4581-b621-8b92add3824e','e6053beb-e60c-480b-8f92-9d1f1229f3da','0ea34a61-eca4-4098-ace6-f20a69524395','2024-12-15 12:16:41'),('42ce4e2b-e032-44e5-a34f-020087484124','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','2e4ade8a-b8bc-11ef-9dcf-d481d75be5a6','2024-12-14 01:05:49'),('68268f4a-41ea-485a-b461-7502bdf9075e','1f92104f-aa05-42fb-8106-6e4c4810d29a','02a2dfb5-48c9-4fec-9978-719818314253','2024-12-15 23:39:36'),('8626f5f2-173f-423e-8284-fc20560ed896','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','94568761-a2f7-45e4-834a-ade54afdfabf','2024-12-15 22:06:50'),('90841d49-6983-417c-9a0e-a1794342758d','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','0ea34a61-eca4-4098-ace6-f20a69524395','2024-12-15 22:06:52'),('92e9686a-9071-40e9-8563-5c71bf72c7c0','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','2b4cb0f4-a41c-4c6a-a15a-08989246e079','2024-12-15 22:06:50'),('b3173f8e-c471-4a36-8f2b-1ad86eac1337','1f92104f-aa05-42fb-8106-6e4c4810d29a','6040a420-f74f-4424-8f73-621b7031e892','2024-12-15 12:15:45'),('d3b07c0a-29ba-4340-90ca-5a3de68b8852','52b2f459-0fd6-4565-9978-7429041d30fa','94568761-a2f7-45e4-834a-ade54afdfabf','2024-12-15 12:20:34'),('dbbc44f8-e81d-4d11-9a97-6977c7f32b6c','e6053beb-e60c-480b-8f92-9d1f1229f3da','2b4cb0f4-a41c-4c6a-a15a-08989246e079','2024-12-15 22:07:30'),('de0fd512-1ad3-4a05-bff9-35ab3a5d4adc','e6053beb-e60c-480b-8f92-9d1f1229f3da','db2d00d5-80e6-4ece-b732-1275812d21f3','2024-12-15 09:54:53'),('e39b8500-61f7-4abd-a9f1-7cc23a38e4ba','52b2f459-0fd6-4565-9978-7429041d30fa','2e4ad418-b8bc-11ef-9dcf-d481d75be5a6','2024-12-15 12:20:40'),('e9501c43-fb12-4865-8ec3-5b06de53d9b6','e6053beb-e60c-480b-8f92-9d1f1229f3da','6040a420-f74f-4424-8f73-621b7031e892','2024-12-15 22:07:34'),('ebfddf6b-4190-49f1-b223-751c09be3081','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','ccff2374-4411-47e2-aed2-c1e1e87cb843','2024-12-15 22:06:59'),('ef2fb578-d7ef-4993-86a6-b28da3658d4b','e6053beb-e60c-480b-8f92-9d1f1229f3da','94568761-a2f7-45e4-834a-ade54afdfabf','2024-12-15 12:16:47'),('f304c24a-8cf2-4b72-a705-843aa17b94ab','2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','2e4ad13d-b8bc-11ef-9dcf-d481d75be5a6','2024-12-15 12:21:10'),('f73c5d01-1a83-49df-8c1d-dec8bace89ae','52b2f459-0fd6-4565-9978-7429041d30fa','db2d00d5-80e6-4ece-b732-1275812d21f3','2024-12-14 01:04:59'),('fcfd62b4-0597-4ba6-9854-c2635cd09ee7','1f92104f-aa05-42fb-8106-6e4c4810d29a','94568761-a2f7-45e4-834a-ade54afdfabf','2024-12-16 00:03:06');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `roleId_idx` (`roleId`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1f92104f-aa05-42fb-8106-6e4c4810d29a','Shahar','Maoz','shahar@maoz.com','de263117e819b59ca59abc8a50afd05598035acdd49f5041c5c99a03f93d8656757c35829567c3c2c1bf01c5ee888a203c282b49415ae88508baa5f1f71586f8',1),('2b8f2bfd-c50f-42ab-9c0e-ff6801f6348c','Admin','Admin','admin@gmail.com','82bac9225d3b22994c5b7eec04e388e105f5d7e417d430ee77f70b1abe8ad0cf01b0a3882e1247957cc49cce5732db6c4fbc4ae6a29aa59f068fb8784eb60395',1),('52b2f459-0fd6-4565-9978-7429041d30fa','User','User','user@user.com','263fc6c89e4271750906e04e0f79fc5897eb901e5feeb7f1c2bed3b2830e48063dce21331d8835292a6abf11d823055db2be667211475ce724d23d1041523594',2),('e6053beb-e60c-480b-8f92-9d1f1229f3da','Test','Test','test@gmail.com','6c4a25ba5258bfe95b0e0d14cf5619edf641e644d44a338e385aa33d1650b453d66788bab5f0c0ef3f79ca7ed39835ed56c22396465e38cd6ac8ce05d4dadd87',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationId` varchar(36) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vacationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES ('02a2dfb5-48c9-4fec-9978-719818314253','Nepal','Do you like hiking?','2024-12-15','2024-12-24',2799.00,'dd8f944e-40ea-44ed-bfcb-860ff0b6b599.png'),('0ea34a61-eca4-4098-ace6-f20a69524395','New Zealand','Extreme sports and awsome views','2025-02-02','2025-02-10',4999.00,'8686b907-3b9c-4756-9be5-8babd0f29a49.webp'),('2b4cb0f4-a41c-4c6a-a15a-08989246e079','USA, New York','Hotdog and the big city','2025-01-05','2025-01-19',2499.00,'2a0b9596-b41c-407f-8695-f4cf68249027.png'),('2e4ad13d-b8bc-11ef-9dcf-d481d75be5a6','Israel','Jerusalem and the Jewish people','2025-04-24','2025-06-06',5545.00,'d14fe6e4-7ee1-4996-b7ee-fcb9852b8252.png'),('2e4ad418-b8bc-11ef-9dcf-d481d75be5a6','Greece','A journey to the myth and the legends of Athena and her friends','2025-04-24','2025-05-05',4545.00,'949531e3-e47b-4be2-8884-d01ecc9d788c.png'),('2e4ad5f2-b8bc-11ef-9dcf-d481d75be5a6','Japan','Classic Asia, Kyoto and the area.','2025-04-24','2025-05-05',5781.00,'41083951-1bb4-40ae-84bc-aaf62fa530c3.png'),('2e4ad835-b8bc-11ef-9dcf-d481d75be5a6','USA, New York','Hotdog and the big city','2025-04-24','2025-05-05',4560.00,'dff5679c-1aa9-42ef-b980-797918ebb8c3.png'),('2e4ade8a-b8bc-11ef-9dcf-d481d75be5a6','Japan','Mount Fuji Tracks','2025-04-24','2025-05-05',4560.00,'c179ee85-2818-4930-bd8c-ef2224aeb992.png'),('2e4aed82-b8bc-11ef-9dcf-d481d75be5a6','Japan','Classic Asia, Kyoto and Mount Fuji','2025-04-29','2025-05-05',2548.00,'b51ce44a-bf62-49f4-a997-8dc01255af0a.png'),('6040a420-f74f-4424-8f73-621b7031e892','Israel','The night life of Tel Aviv, go clubbing and sunbath on the beach.','2025-05-25','2025-06-22',3999.00,'62b991f1-f599-4860-b62c-abdeac01984c.png'),('94568761-a2f7-45e4-834a-ade54afdfabf','Germany','Classic Europe, Berlin and Munich','2024-12-22','2024-12-29',3569.00,'c9655a99-230a-4e10-86a7-a80988a7dcb9.png'),('a5f2a4e7-fced-4dac-99f3-80b27a6ac199','Germany','***SALE*** Classic Europe, Berlin and Munich.','2025-02-28','2025-03-05',4299.00,'bf2759f2-4723-43c5-8ae8-b360447b7ecd.png'),('b1fa606d-cac7-4fb4-9999-b7fdda64eee4','Japan','Sushi and Fuji','2024-12-12','2024-12-19',10000.00,'f01c5c7c-b18d-4d89-8eff-b3404ef59f5f.png'),('ccff2374-4411-47e2-aed2-c1e1e87cb843','Israel','Jerusalem - from the bible to life','2025-04-29','2025-05-15',3799.00,'77371dce-cf71-400e-891d-cd2c7bb0e1a6.png'),('db2d00d5-80e6-4ece-b732-1275812d21f3',' USA, New York','Hotdog and the city','2025-04-29','2025-05-05',2899.00,'23b2ad52-787a-4f85-99c3-6f97f95fbff3.png');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-16  3:26:57

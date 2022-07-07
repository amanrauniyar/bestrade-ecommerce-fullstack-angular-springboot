-- -----------------------------------------------------
-- Schema full-stack-bestrade
-- -----------------------------------------------------
USE `full-stack-bestrade` ;

SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;
-- -----------------------------------------------------
-- Table `full-stack-bestrade`.`user`
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Table structure for table `user`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` smallint unsigned NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
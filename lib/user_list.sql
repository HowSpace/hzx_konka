/*
Navicat MySQL Data Transfer

Source Server         : konka
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : konka

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2019-06-04 19:54:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user_list`
-- ----------------------------
DROP TABLE IF EXISTS `user_list`;
CREATE TABLE `user_list` (
  `sid` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(18) NOT NULL,
  `password` varchar(18) NOT NULL,
  `email` varchar(850) NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_list
-- ----------------------------
INSERT INTO `user_list` VALUES ('1', 'zhangsan', '12345', '12345@163.com');
INSERT INTO `user_list` VALUES ('2', 'lisi', '1234', '1234@163.com');
INSERT INTO `user_list` VALUES ('3', 'ovo', 'ovoovo', 'ovo@qq.com');

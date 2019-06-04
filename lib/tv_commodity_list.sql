/*
Navicat MySQL Data Transfer

Source Server         : konka
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : konka

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2019-06-04 19:54:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tv_commodity_list`
-- ----------------------------
DROP TABLE IF EXISTS `tv_commodity_list`;
CREATE TABLE `tv_commodity_list` (
  `sid` tinyint(3) NOT NULL AUTO_INCREMENT,
  `span_title` varchar(8) DEFAULT NULL,
  `list_img` varchar(99) NOT NULL,
  `description` varchar(60) NOT NULL,
  `information` varchar(50) NOT NULL,
  `new_price` float(12,2) NOT NULL,
  `del_price` float(12,2) DEFAULT NULL,
  `b_or_n` varchar(20) NOT NULL,
  `evaluate` varchar(30) DEFAULT NULL,
  `start_level` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tv_commodity_list
-- ----------------------------
INSERT INTO `tv_commodity_list` VALUES ('1', '', 'https://www.konka.com/public/images/1b/d9/36/6f9221590941a7d8907ac210dc24e4ee9c48cebe.png?97134_OW8', '58英寸4K智能语音电视', '人工智能/全民K歌 /36核+8G大内存', '2249.00', '2499.00', 'none', null, null);
INSERT INTO `tv_commodity_list` VALUES ('2', '', 'https://www.konka.com/public/images/3e/a5/fc/4cd4d773e83f1dcfc5ace9e999ab6eceb22dea10.png?97156_OW8', '43英寸无边全面屏电视', '人工智能2.0/高频内存/全民K歌', '1999.00', '2199.00', 'block', '非常好的一款智能电视，从外观到内在都特别喜欢，从康佳的模拟电', 'background-position: -90px;');
INSERT INTO `tv_commodity_list` VALUES ('3', '', 'https://www.konka.com/public/images/02/89/a4/7cbbef25eaef4207e1db5d1c59b30b5a0a0c84da.png?97175_OW8', '65英寸超薄全面屏电视', '64位39核/高配内存/人工智能', '3799.00', '2849.00', 'block', '挺不错的电视，你值得拥有', 'background-position: -57px;');
INSERT INTO `tv_commodity_list` VALUES ('4', '', 'https://www.konka.com/public/images/8b/ac/39/cf136b7ba5b56a3b7cba7e2dabc61a12b5894eaa.png?97289_OW8', '55英寸金属超薄曲面电视', '三星曲面屏/全程MEMC/人工智能2.0', '2849.00', '3399.00', 'block', '非常好，永远支持康佳电视！！！', ' background-position: -27px;');
INSERT INTO `tv_commodity_list` VALUES ('5', '限时特惠', 'https://www.konka.com/public/images/f8/1d/fa/5af76c21d3707195fa91457cf0c14b6c6e4bf865.jpg?78236_OW2', 'KKTV 40英寸4K智能电视', '64位31核/三星4K屏/人工智能', '1399.00', '1599.00', 'block', '还不错我喜欢 ', 'background-position: -57px;');
INSERT INTO `tv_commodity_list` VALUES ('6', '限时特惠', 'https://www.konka.com/public/images/db/2d/91/915890010a1245871e65103388d0b2a7119da060.jpg?03834_OW2', 'KKTV  43英寸全高清智能', '33核64位/易柚6.51', '1299.00', '1599.00', 'block', '物流速度可以，电视效果不错，够清晰，整体效果不错', 'background-position: -57px;');
INSERT INTO `tv_commodity_list` VALUES ('7', '限时特惠', 'https://www.konka.com/public/images/f8/94/9d/957891902058438684e5b37376e6e62daecf29d4.jpg?03838_OW2', 'KKTV  50英寸4K智能', 'AI人工智能/36核芯片', '1599.00', '1999.00', 'none', null, null);
INSERT INTO `tv_commodity_list` VALUES ('8', '限时特惠', 'https://www.konka.com/public/images/6d/fe/51/ca1f6e43b841c62f4a5f599ee8b8ec6bc27355dc.jpg?03841_OW2', 'KKTV  65英寸4K 智能HDR²', '64位架构A73CPU/2G+16G大内存', '2999.00', '3999.00', 'block', '电视特别给力。和想象中的差不多。物流速度特别快。', ' background-position: -27px;');

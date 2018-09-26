/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50622
Source Host           : localhost:3306
Source Database       : base

Target Server Type    : MYSQL
Target Server Version : 50622
File Encoding         : 65001

Date: 2018-09-26 16:27:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_photo
-- ----------------------------
DROP TABLE IF EXISTS `tb_photo`;
CREATE TABLE `tb_photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `upload_man` varchar(255) DEFAULT NULL COMMENT '上传人',
  `origin_name` varchar(255) DEFAULT NULL COMMENT '原始文件名，如20180816',
  `real_name` varchar(255) DEFAULT NULL COMMENT '服务器上存放的真实名字',
  `upload_time` datetime DEFAULT NULL COMMENT '上传时间',
  `file_size` varchar(255) DEFAULT NULL COMMENT '文件大小',
  `description` varchar(255) DEFAULT NULL,
  `del_flag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_photo
-- ----------------------------
INSERT INTO `tb_photo` VALUES ('33', 'admin', '20180816.Photo', '7OSHM7H9JAHH28UFCFQK2ATS.Photo', '2018-09-25 10:35:39', '17541KB', null, '0');
INSERT INTO `tb_photo` VALUES ('34', 'admin', '20180816.Photo', '81A0BLB8O3RJELF56DD58790U.Photo', '2018-09-25 10:37:35', '17541KB', null, '0');
INSERT INTO `tb_photo` VALUES ('35', 'admin', '20180816.Photo', 'H90M7MERHCOUI6C7PEED3ODN.Photo', '2018-09-25 13:45:00', '17541KB', null, '0');
INSERT INTO `tb_photo` VALUES ('36', 'admin', '20180817.Photo', '1OO1J6O0J8G2H4QRU0MUL5IIEG.Photo', '2018-09-25 13:49:28', '26669KB', null, '0');
INSERT INTO `tb_photo` VALUES ('37', 'admin', '20180820.Photo', '3E1Q5IHKC1IRE68MM9GL9COF5E.Photo', '2018-09-25 13:52:46', '9041KB', null, '0');
INSERT INTO `tb_photo` VALUES ('38', 'admin', '20180817.Photo', 'QK8B42CD7JT04BT437CVJ4SCH.Photo', '2018-09-25 13:56:19', '26669KB', '是的范德萨', '0');
INSERT INTO `tb_photo` VALUES ('39', 'admin', '20180816.Photo', '5NR7N0II8EPQ0J7OBH10OAJEE.Photo', '2018-09-25 13:59:29', '17541KB', '撒旦法', '0');
INSERT INTO `tb_photo` VALUES ('40', 'admin', '20180817.Photo', '1CQ0TS9ORP5872FT985G1N1484.Photo', '2018-09-25 14:08:48', '26669KB', '测试上传描述', '0');
INSERT INTO `tb_photo` VALUES ('41', 'admin', '20180816.Photo', '2Q136QQBOMLKIEQL5MB9RNPGQA.Photo', '2018-09-25 16:06:35', '17541KB', '2222222222222222', '0');
INSERT INTO `tb_photo` VALUES ('42', 'test', '20180816.Photo', '10E6482139R4J819PJ55GPAQA6.Photo', '2018-09-26 11:41:44', '17541KB', '这是权限控制后的第一个上传文件', '0');
INSERT INTO `tb_photo` VALUES ('43', 'admin', '20180817.Photo', '1NHJQOJ3J9PQ2B7FEG9M69RQ0E.Photo', '2018-09-26 14:48:09', '26669KB', 'sssssssss', '0');
INSERT INTO `tb_photo` VALUES ('44', 'admin', '20180820.Photo', '2BE7VH2L052QELOJKD505AL0R3.Photo', '2018-09-26 14:48:19', '9041KB', '3333333333', '0');

-- ----------------------------
-- Table structure for tb_resource
-- ----------------------------
DROP TABLE IF EXISTS `tb_resource`;
CREATE TABLE `tb_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_hide` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `source_key` varchar(255) DEFAULT NULL,
  `source_url` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf5ra2gn0xedeida2op8097sr5` (`parent_id`),
  CONSTRAINT `FKf5ra2gn0xedeida2op8097sr5` FOREIGN KEY (`parent_id`) REFERENCES `tb_resource` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_resource
-- ----------------------------
INSERT INTO `tb_resource` VALUES ('1', '2018-09-26 13:56:51', '用户管理', null, '0', '2', '用户管理', '1', 'system:user:index', '/admin/user/index', '1', '2018-09-25 13:59:01', null);
INSERT INTO `tb_resource` VALUES ('2', '2018-09-26 13:56:51', '用户编辑', null, '0', '3', '用户编辑', '1', 'system:user:edit', '/admin/user/edit*', '2', '2018-09-25 16:26:42', '1');
INSERT INTO `tb_resource` VALUES ('3', '2018-09-26 16:48:48', '用户添加', null, '0', '3', '用户添加', '2', 'system:user:add', '/admin/user/add', '2', '2018-09-25 16:49:26', '1');
INSERT INTO `tb_resource` VALUES ('4', '2018-09-26 16:48:48', '用户删除', null, '0', '3', '用户删除', '3', 'system:user:deleteBatch', '/admin/user/deleteBatch', '2', '2018-09-25 14:11:41', '1');
INSERT INTO `tb_resource` VALUES ('5', '2018-09-26 16:48:48', '角色分配', null, '0', '3', '角色分配', '4', 'system:user:grant', '/admin/user/grant/**', '2', '2018-09-25 14:11:51', '1');
INSERT INTO `tb_resource` VALUES ('6', '2018-09-26 16:45:10', '角色管理', null, '0', '2', '角色管理', '2', 'system:role:index', '/admin/role/index', '1', '2018-09-25 16:46:52', null);
INSERT INTO `tb_resource` VALUES ('7', '2018-09-26 16:47:02', '角色编辑', null, '0', '3', '角色编辑', '1', 'system:role:edit', '/admin/role/edit*', '2', '2018-09-25 10:24:06', '1');
INSERT INTO `tb_resource` VALUES ('8', '2018-09-26 16:47:23', '角色添加', null, '0', '3', '角色添加', '2', 'system:role:add', '/admin/role/add', '2', '2018-09-25 16:49:16', '6');
INSERT INTO `tb_resource` VALUES ('9', '2018-09-26 16:47:23', '角色删除', null, '0', '3', '角色删除', '3', 'system:role:deleteBatch', '/admin/role/deleteBatch', '2', '2018-09-25 14:12:03', '6');
INSERT INTO `tb_resource` VALUES ('10', '2018-09-26 16:47:23', '资源分配', null, '0', '3', '资源分配', '4', 'system:role:grant', '/admin/role/grant/**', '2', '2018-09-24 14:12:11', '6');
INSERT INTO `tb_resource` VALUES ('11', '2018-09-26 11:21:12', '资源管理', null, '0', '2', '资源管理', '3', 'system:resource:index', '/admin/resource/index', '1', '2018-09-24 11:21:42', null);
INSERT INTO `tb_resource` VALUES ('12', '2018-09-26 11:21:52', '资源编辑', null, '0', '3', '资源编辑', '1', 'system:resource:edit', '/admin/resource/edit*', '2', '2018-09-24 11:22:36', '11');
INSERT INTO `tb_resource` VALUES ('13', '2018-09-26 11:21:54', '资源添加', null, '0', '3', '资源添加', '2', 'system:resource:add', '/admin/resource/add', '2', '2018-09-25 11:22:39', '11');
INSERT INTO `tb_resource` VALUES ('14', '2018-09-26 11:21:54', '资源删除', null, '0', '3', '资源删除', '3', 'system:resource:deleteBatch', '/admin/resource/deleteBatch', '2', '2018-09-26 14:12:31', '11');
INSERT INTO `tb_resource` VALUES ('15', '2018-09-26 11:10:23', '控制文件上传功能的展示', null, '0', '2', '文件上传', '4', 'system:photo:index', '/admin/photo/index', '1', '2018-09-26 11:10:23', null);
INSERT INTO `tb_resource` VALUES ('16', '2018-09-26 11:14:05', '文件上传模块上传按钮的功能控制', null, '0', '3', '文件上传按钮', '1', 'system:photo:upload', '/admin/photo/upload', '2', '2018-09-26 11:14:05', '15');
INSERT INTO `tb_resource` VALUES ('17', '2018-09-26 11:15:50', '详情查看', null, '0', '3', '文件列表详情', '2', 'system:photo:detail', '/admin/photo/detail', '2', '2018-09-26 11:15:50', '15');

-- ----------------------------
-- Table structure for tb_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role_key` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_role
-- ----------------------------
INSERT INTO `tb_role` VALUES ('1', '2018-09-26 09:25:30', '超级管理员', 'administrator', 'administrator', '0', '2018-09-26 09:26:25');
INSERT INTO `tb_role` VALUES ('3', '2018-09-26 10:54:29', '公安民警', 'policeman', 'policeman', '0', '2018-09-26 10:54:29');
INSERT INTO `tb_role` VALUES ('4', '2018-09-26 10:55:25', '现场信息采集员', 'collector', 'collector', '0', '2018-09-26 10:55:25');

-- ----------------------------
-- Table structure for tb_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `tb_role_resource`;
CREATE TABLE `tb_role_resource` (
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`),
  KEY `FK868kc8iic48ilv5npa80ut6qo` (`resource_id`),
  CONSTRAINT `FK7ffc7h6obqxflhj1aq1mk20jk` FOREIGN KEY (`role_id`) REFERENCES `tb_role` (`id`),
  CONSTRAINT `FK868kc8iic48ilv5npa80ut6qo` FOREIGN KEY (`resource_id`) REFERENCES `tb_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_role_resource
-- ----------------------------
INSERT INTO `tb_role_resource` VALUES ('1', '1');
INSERT INTO `tb_role_resource` VALUES ('1', '2');
INSERT INTO `tb_role_resource` VALUES ('1', '3');
INSERT INTO `tb_role_resource` VALUES ('1', '4');
INSERT INTO `tb_role_resource` VALUES ('1', '5');
INSERT INTO `tb_role_resource` VALUES ('1', '6');
INSERT INTO `tb_role_resource` VALUES ('1', '7');
INSERT INTO `tb_role_resource` VALUES ('1', '8');
INSERT INTO `tb_role_resource` VALUES ('1', '9');
INSERT INTO `tb_role_resource` VALUES ('1', '10');
INSERT INTO `tb_role_resource` VALUES ('1', '11');
INSERT INTO `tb_role_resource` VALUES ('1', '12');
INSERT INTO `tb_role_resource` VALUES ('1', '13');
INSERT INTO `tb_role_resource` VALUES ('1', '14');
INSERT INTO `tb_role_resource` VALUES ('1', '15');
INSERT INTO `tb_role_resource` VALUES ('3', '15');
INSERT INTO `tb_role_resource` VALUES ('1', '16');
INSERT INTO `tb_role_resource` VALUES ('3', '16');
INSERT INTO `tb_role_resource` VALUES ('1', '17');
INSERT INTO `tb_role_resource` VALUES ('3', '17');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `delete_status` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `locked` int(11) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('1', '成都', '2018-09-26 17:26:39', '2018-09-26 17:26:42', '0', '超级管理员', 'whoismy8023@163.com', '0', 'admin', '3931MUEQD1939MQMLM4AISPVNE', '1', '15923930000', '2018-09-27 17:27:11', 'admin');
INSERT INTO `tb_user` VALUES ('3', '祁连山南路666号505弄', '2018-09-18 00:00:00', '2018-09-26 15:28:00', '0', '测试账号', '34732894@qq.com', '0', 'test', '3931MUEQD1939MQMLM4AISPVNE', '0', '12321321212', '2018-09-26 15:28:00', 'test');

-- ----------------------------
-- Table structure for tb_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_role`;
CREATE TABLE `tb_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKea2ootw6b6bb0xt3ptl28bymv` (`role_id`),
  CONSTRAINT `FK7vn3h53d0tqdimm8cp45gc0kl` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FKea2ootw6b6bb0xt3ptl28bymv` FOREIGN KEY (`role_id`) REFERENCES `tb_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_role
-- ----------------------------
INSERT INTO `tb_user_role` VALUES ('1', '1');
INSERT INTO `tb_user_role` VALUES ('3', '4');

# horribly hacked - but very first POC (exported from [dbml](https://dbdiagram.io/d/630c565df1a9b01b0ffd2f7c))
DROP SCHEMA IF EXISTS `dq.scrx.dq`;

DROP SCHEMA IF EXISTS `dq.scrx.Aggregate`;

DROP SCHEMA IF EXISTS `dq.scrx.graph`;

DROP SCHEMA IF EXISTS `dq.scrx.relational`;

CREATE SCHEMA `dq.scrx.dq`;

CREATE SCHEMA `dq.scrx.relational`;

CREATE SCHEMA `dq.scrx.Aggregate`;

CREATE SCHEMA `dq.scrx.graph`;

CREATE TABLE `dq.scrx.dq`.`meta` (
  `_database` varchar(255) DEFAULT "relational" COMMENT 'prefix:dq.scrx,
type: {
  graph: {db:arangodb, langauge:aql, schemas: [graph]
  relational: {db:mariadb, language:mysql, schemas: [relational, Aggregate]
  timeseries: {db:questdb, language:postgresql, prefix:dq.scrx.overwrites_outer_if_specified, schemas: []
}',
  `_mock` tinyint DEFAULT 0 COMMENT '// faker.version?: semver (^2.0.3, @2.0.7) // [DEFAULT] `undefined` loads latest - data not guarsnteed to be identical

// salt?: uuid (2C574E45BA2811EBB265F859713E4BE4) // [DEFAULT] `sys_guid()`

// schemas?: FLAT_MAP(_database.type.schemas.<Optional<Table>>) // [DEFAULT] `undefined` mocks _ALL_ content **IF** `_mock` IS NOT 0
  // IF COUNT(schemas) AND NOT COUNT(schemas.Table) THEN _ALL_ content IN EACH(schemas AS schema) mocked **IF** `_mock` IS NOT 0
  // IF COUNT(schemas) AND COUNT(schemas.Table) THEN _ALL_ content IN EACH(schemas.Table AS schemaTable) mocked **IF** `_mock` IS NOT 0
// NOTE: Highest depth will be applied.
  // eg. `SET _mock = 1; SET schemas = [pets, pets.dogs]` will result in _ALL_ Tables in the `pets` schema being mocked',
  `table` boolean COMMENT 'relational.qomment: {CREATE_META: ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 WITH SYSTEM VERSIONING PARTITION BY SYSTEM_TIME INTERVAL 1 MONTH STARTS TIMESTAMP\'2022-08-25 04:00:00\' PARTITIONS 12;}',
  `view` boolean COMMENT 'view.system.queries: {CREATE: AS select `dq.system`.`x` AS `x` from `dq.system` FOR SYSTEM_TIME BETWEEN TIMESTAMP current_timestamp() - interval 1 hour AND TIMESTAMP current_timestamp(6);}',
  `sequence` boolean COMMENT 'sqnc.thirteens: {_db: Aggregate, CREATE: start with 100 minvalue 1 maxvalue 1300000 increment by 13 cache 1000 nocycle ENGINE=InnoDB;}'
);

CREATE TABLE `dq.scrx.relational`.`members` (
  `id` uuid PRIMARY KEY DEFAULT (sys_guid()),
  `username` varchar(32) UNIQUE NOT NULL
);

CREATE TABLE `dq.scrx.relational`.`relationshipType` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM ('friend', 'family', 'frenemy') COMMENT '`frenemy` is member who was blocked or removed from friends/family list'
);

CREATE TABLE `dq.scrx.relational`.`joinMemberRelationship` (
  `relationsihp_type_id` int,
  `member_a` uuid COMMENT 'member_a value will _always_ be less than member_b value',
  `member_b` uuid
);

CREATE TABLE `dq.scrx.relational`.`qomment` (
  `id` uuid PRIMARY KEY DEFAULT (sys_guid()),
  `creator` uuid,
  `apply_to` uuid NOT NULL,
  `content` varchar(255),
  `created` datetime DEFAULT (now()),
  `edited` datetime DEFAULT (now())
);

CREATE TABLE `dq.scrx.relational`.`qrx` (
  `id` uuid PRIMARY KEY DEFAULT (sys_guid()),
  `creator` uuid,
  `quark` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `dq.scrx.Aggregate`.`qomments` (
  `id` int UNIQUE NOT NULL AUTO_INCREMENT,
  `init_thread_id` uuid PRIMARY KEY COMMENT 'if dbs were connected would be many-to-one with `relational.qomment.id`',
  `pos` int COMMENT '`pos` will be the sort order determined from `created` column.',
  `apply_to` uuid,
  `reply_to` uuid,
  `text` varchar(255)
);

CREATE TABLE `dq.scrx.graph`.`qomments` (
  `_key` varchar(255) PRIMARY KEY,
  `_qomment_id` uuid COMMENT 'keeping for dbml completeness, but this will never actually be created when parsed',
  `sender` uuid,
  `receiver` uuid
);

CREATE TABLE `dq.scrx.graph`.`relationships` (
  `_key` varchar(255) PRIMARY KEY,
  `_from` uuid,
  `_to` uuid,
  `type` int
);

CREATE INDEX `lesser_member_index` ON `dq.scrx.relational`.`joinMemberRelationship` (`member_a`);

CREATE INDEX `greater_member_index` ON `dq.scrx.relational`.`joinMemberRelationship` (`member_b`);

CREATE INDEX `graph_qmnt_sndr` ON `dq.scrx.graph`.`qomments` (`sender`);

CREATE INDEX `graph_qmnt_rcvr` ON `dq.scrx.graph`.`qomments` (`receiver`);

CREATE INDEX `graph_rlxns_from` ON `dq.scrx.graph`.`relationships` (`_from`);

CREATE INDEX `graph_rlxns_to` ON `dq.scrx.graph`.`relationships` (`_to`);

ALTER TABLE `dq.scrx.dq`.`meta` COMMENT = 'This table will NOT be created. It is used solely for extending the database structure and mocking data.
  
View Source for Syntax';

ALTER TABLE `dq.scrx.Aggregate`.`qomments` COMMENT = 'Aggregate will give you everything you need from a simple query selecting the `init_thread_id`

Can loop through and add the current text to the `apply_to` content
  - keeping `reply_to so more comments can be nested with ease.

SEE COLUMNS:
  - `init_thread_id`
  - `pos`';

ALTER TABLE `dq.scrx.graph`.`qomments` COMMENT = 'keeping "relational <-> graph" `ref`s for DBML completeness, but this will never actually be created when parsed';

ALTER TABLE `dq.scrx.graph`.`relationships` COMMENT = 'keeping "relational <-> graph" `ref`s for DBML completeness, but this will never actually be created when parsed';

ALTER TABLE `dq.scrx.relational`.`joinMemberRelationship` ADD FOREIGN KEY (`relationsihp_type_id`) REFERENCES `dq.scrx.relational`.`relationshipType` (`id`);

ALTER TABLE `dq.scrx.relational`.`joinMemberRelationship` ADD FOREIGN KEY (`member_a`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.relational`.`joinMemberRelationship` ADD FOREIGN KEY (`member_b`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.relational`.`qomment` ADD FOREIGN KEY (`creator`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.relational`.`qomment` ADD FOREIGN KEY (`apply_to`) REFERENCES `dq.scrx.relational`.`qomment` (`id`);

ALTER TABLE `dq.scrx.relational`.`qomment` ADD FOREIGN KEY (`apply_to`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.relational`.`qomment` ADD FOREIGN KEY (`apply_to`) REFERENCES `dq.scrx.relational`.`qrx` (`id`);

ALTER TABLE `dq.scrx.relational`.`qrx` ADD FOREIGN KEY (`creator`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.graph`.`qomments` ADD FOREIGN KEY (`_qomment_id`) REFERENCES `dq.scrx.relational`.`qomment` (`id`);

CREATE TABLE `dq.scrx.graph`.`relationships_qomments` (
  `relationships__from` uuid NOT NULL,
  `qomments_sender` uuid NOT NULL,
  PRIMARY KEY (`relationships__from`, `qomments_sender`)
);

ALTER TABLE `dq.scrx.graph`.`relationships_qomments` ADD FOREIGN KEY (`relationships__from`) REFERENCES `dq.scrx.graph`.`relationships` (`_from`);

ALTER TABLE `dq.scrx.graph`.`relationships_qomments` ADD FOREIGN KEY (`qomments_sender`) REFERENCES `dq.scrx.graph`.`qomments` (`sender`);


CREATE TABLE `dq.scrx.graph`.`relationships_qomments(1)` (
  `relationships__to` uuid NOT NULL,
  `qomments_receiver` uuid NOT NULL,
  PRIMARY KEY (`relationships__to`, `qomments_receiver`)
);

ALTER TABLE `dq.scrx.graph`.`relationships_qomments(1)` ADD FOREIGN KEY (`relationships__to`) REFERENCES `dq.scrx.graph`.`relationships` (`_to`);

ALTER TABLE `dq.scrx.graph`.`relationships_qomments(1)` ADD FOREIGN KEY (`qomments_receiver`) REFERENCES `dq.scrx.graph`.`qomments` (`receiver`);

ALTER TABLE `dq.scrx.graph`.`relationships` ADD FOREIGN KEY (`_from`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.graph`.`relationships` ADD FOREIGN KEY (`_to`) REFERENCES `dq.scrx.relational`.`members` (`id`);

ALTER TABLE `dq.scrx.graph`.`relationships` ADD FOREIGN KEY (`type`) REFERENCES `dq.scrx.relational`.`joinMemberRelationship` (`relationsihp_type_id`);


# show warnings;
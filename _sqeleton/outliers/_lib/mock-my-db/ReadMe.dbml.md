// TODO: Relocate this to _lib

Project "dq.arq.db.demo" {
  database_types: '[MariaDB, ArangoDB]'
  Note: '''
    # DQ Multi-Database Overview
    Rough Overview of the Interactions between separate database types

    ## Muliple Types
    - _RDBMS_: MariaDB tables store the initial and aggregated content
    - _Graph_: ArangoDB document store includes nodes / vertexes for graph content
  '''
}

// https://www.dbml.org/docs/#project-definition
// <: one-to-many. E.g: users.id < posts.user_id
// >: many-to-one. E.g: posts.user_id > users.id
// -: one-to-one. E.g: users.id - user_infos.user_id
// <>: many-to-many. E.g: authors.id <> books.id

//// -- DBML Custom Query Extensions
Table dq.meta {
  _database varchar [default: 'relational', note:'''
    // _src?: ./relative, /absolute/or, https://url to a `.json` file
      // file would contain the same key / values as specified below
    // NOTE: If `_src` is supplied then no other `COMMENT =` values will be read/parsed
      // eg. `_database varchar [default: 'relational', note:'_src:../ProjectRoot/Configs/database/dbml.customization.json`
    prefix:dq.scrx,
    type: {
      graph: {db:arangodb, langauge:aql, schemas: [graph]
      relational: {db:mariadb, language:mysql, schemas: [relational, Aggregate]
      timeseries: {db:questdb, language:postgresql, prefix:dq.scrx.overwrites_outer_if_specified, schemas: []
    }
  ''']
  _mock tinyint [default: 0, note: '''
  // faker.version?: semver (^2.0.3, @2.0.7) // [DEFAULT] `undefined` loads latest - data not guarsnteed to be identical
  
  // salt?: uuid (2C574E45BA2811EBB265F859713E4BE4) // [DEFAULT] `sys_guid()`
  
  // schemas?: FLAT_MAP(_database.type.schemas.<Optional<Table>>) // [DEFAULT] `undefined` mocks _ALL_ content **IF** `_mock` IS NOT 0
    // IF COUNT(schemas) AND NOT COUNT(schemas.Table) THEN _ALL_ content IN EACH(schemas AS schema) mocked **IF** `_mock` IS NOT 0
    // IF COUNT(schemas) AND COUNT(schemas.Table) THEN _ALL_ content IN EACH(schemas.Table AS schemaTable) mocked **IF** `_mock` IS NOT 0
  // NOTE: Highest depth will be applied.
    // eg. `SET _mock = 1; SET schemas = [pets, pets.dogs]` will result in _ALL_ Tables in the `pets` schema being mocked
  ''']
  table boolean [note: '''
    relational.qomment: {CREATE_META: ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 WITH SYSTEM VERSIONING PARTITION BY SYSTEM_TIME INTERVAL 1 MONTH STARTS TIMESTAMP'2022-08-25 04:00:00' PARTITIONS 12;}
  ''']
  view boolean [note:'''
    view.system.queries: {CREATE: AS select `dq.system`.`x` AS `x` from `dq.system` FOR SYSTEM_TIME BETWEEN TIMESTAMP current_timestamp() - interval 1 hour AND TIMESTAMP current_timestamp(6);}
  ''']
  sequence boolean [note:'''
    sqnc.thirteens: {_db: Aggregate, CREATE: start with 100 minvalue 1 maxvalue 1300000 increment by 13 cache 1000 nocycle ENGINE=InnoDB;}
  ''']
  
  Note: '''This table will NOT be created. It is used solely for extending the database structure and mocking data.
  
View Source for Syntax
'''
  /* `dq` TABLE SYNTAX:
    Table dq.meta {
     <DB_FIELD_TYPE> boolean [note\'\'\'
      <DB_FIELD_NAME>: {<DB_FIELD_ACTION>:<DB_FIELD_CONTENT>}
      [<Optional<ITERABLE>>]
     \'\'\']
    }
  :: will mutate the generated sql file using the following pseudo-code ::
      :: _underscored keys are skipped in below LOOP ::
        :: pseudo-code used due to separate db languages ::
  :: For brevity we will show mysql-ish pseudo-code.
      But all applicable languages will need to have a translator. ::
    [[LOOP _database.type AS CURRENT_TYPE]]
      [[DUPLICATE]]
        % cp <GENERATED_FILENAME>.sql dq.<GENERATED_FILENAME>.<CURRENT_TYPE.language>
      [[ETACILPUD]]
      [[LOOP Map(TABLES)]]
        SET _DB_PREFIX <CURRENT_TYPE.prefix> || <dq.meta._database.prefix> || ''
        IF _DB_PREFIX IS NOT '' THEN SET _DB_PREFIX CONCAT(_DB_PREFIX,".")
        SET _DB CONCAT(
          _DB_PREFIX,
          <DB_FIELD_CONTENT._db> || <dq.meta._database>
        )
        [[MATCH _DB NOT IN CURRENT_TYPE.schemas]]
          DROP <DB_FIELD_TYPE> IF EXISTS `<_DB>`.`<DB_FIELD_NAME>`
          [[CONTINUE]]
        [[HCTAM]]
        [[SWITCH <DB_FIELD_ACTION>]]
          |CREATE|:
            DROP <DB_FIELD_TYPE> IF EXISTS `<_DB>`.`<DB_FIELD_NAME>`
            CREATE `<DB_FIELD_TYPE>` `<_DB>`.`<DB_FIELD_NAME>` <DB_FIELD_CONTENT>
          |CREATE_META|:
            〔
            SET _REGEX_REPLACE /^CREATE <DB_FIELD_TYPE> `<_DB>`.`<DB_FIELD_NAME>`(.*\s.)*(;$)/gi
              # example: /^CREATE TABLE `Aggregate`.`qomments`(.*\s.)*(;$)/gi
            _REGEX_REPLACE.replace($2, <DB_FIELD_CONTENT>;)
            〕
      [[POOL]] // Map(TABLES)
      
    [[POOL]] // CURRENT_TYPE
*/
}

Enum dq.enumRelationshipType {
  friend
  family
  frenemy
}

//// -- Relational
Table relational.members {
  id uuid [pk, default: `sys_guid()`]
  username varchar(32) [not null, unique]
}
Table relational.relationshipType {
  id int [pk, increment]
  type dq.enumRelationshipType [note: '`frenemy` is member who was blocked or removed from friends/family list']
}
Table relational.joinMemberRelationship {
  relationsihp_type_id int [ref: - relational.relationshipType.id]
  member_a uuid [ref: > relational.members.id, note: "member_a value will _always_ be less than member_b value"]
  member_b uuid [ref: > relational.members.id]
  Indexes {
    member_a [name: 'lesser_member_index']
    member_b [name: 'greater_member_index']
  }
}

Table relational.qomment {
  id uuid [pk, default: `sys_guid()`]
  creator uuid [ref: > relational.members.id]
  apply_to uuid [not null,
    ref: > relational.qomment.id,
    ref: > relational.members.id,
    ref: > relational.qrx.id]
  content varchar
  created datetime [default: `now()`]
  edited datetime [default: `now()`]
}

Table relational.qrx {
  id uuid [pk, default: `sys_guid()`]
  creator uuid [ref: > relational.members.id]
  quark varchar [not null, unique]
}

Table Aggregate.qomments
{
  id int [unique, not null, increment]
  init_thread_id uuid [pk, note: 'if dbs were connected would be many-to-one with `relational.qomment.id`']
  pos int [note: '`pos` will be the sort order determined from `created` column.']
  apply_to uuid
  reply_to uuid
  text varchar
  
Note: '''Aggregate will give you everything you need from a simple query selecting the `init_thread_id`

Can loop through and add the current text to the `apply_to` content
  - keeping `reply_to so more comments can be nested with ease.

SEE COLUMNS:
  - `init_thread_id`
  - `pos`
'''
}

//// -- Graph
Table graph.qomments as gQomm {
  _key varchar [pk]
  _qomment_id uuid [ref: > relational.qomment.id]
  sender uuid [ref: <> gRel._from]
  receiver uuid [ref: <> gRel._to]
  
  Indexes {
    sender [name: 'graph_qmnt_sndr']
    receiver [name: 'graph_qmnt_rcvr']
  }
  
  Note: 'keeping "relational <-> graph" `ref`s for DBML completeness, but this will never actually be created when parsed'
}

Table graph.relationships as gRel {
  _key varchar [pk]
  _from uuid [ref: > relational.members.id]
  _to uuid [ref: > relational.members.id]
  type int [ref: > relational.joinMemberRelationship.relationsihp_type_id]
  
  Indexes {
    _from [name: 'graph_rlxns_from']
    _to [name: 'graph_rlxns_to']
  }
  
  Note: 'keeping "relational <-> graph" `ref`s for DBML completeness, but this will never actually be created when parsed'
}

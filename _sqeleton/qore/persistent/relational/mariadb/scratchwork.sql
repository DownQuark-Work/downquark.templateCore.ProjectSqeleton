-- New script in localhost.
-- Date: Aug 24, 2022
-- Time: 5:17:52 PM

ALTER TABLE `member` ENGINE=`InnoDB`;


SELECT `quark` FROM `qrx` WHERE 1;

-- 
--  alter table t1 add constraint c1 foreign key (f1) references t11(f1)
-- 

ALTER TABLE `dq.relational`.qollection DROP FOREIGN KEY `foreign.qollection.member`;

ALTER TABLE `qollection` ADD CONSTRAINT `foreign.qollection.member` FOREIGN KEY (`key.id.member`) REFERENCES member(id);


ALTER TABLE `qollection` ADD CONSTRAINT `fk.qollection.member`
  FOREIGN KEY (`key.id.member`) REFERENCES member(id)
    ON DELETE SET NULL # This requires that the referenced columns are not defined as NOT NULL
    ON UPDATE NO ACTION;
-- 
-- ALTER TABLE `dq.relational`.`qollection` DROP INDEX `.constraint.id.tag`;

# SECURITY INVOKER -> 
#  # when the view is accessed, it runs with the same privileges that the person accessing the view has
USE `dq.relational`;
-- CREATE SQL SECURITY INVOKER VIEW `view.Quarklettes` AS 
SELECT `quark`, 3 FROM `qrx` WHERE 1;

SELECT * FROM `view.Quarklettes`;
DROP VIEW `view.Quarklettes`;

SET @count = 3;
---  @count := @count;

-- CREATE SQL SECURITY INVOKER VIEW `view.HalfLife` AS
  SELECT 3 AS countdown, table_schema as `DB`, table_name AS `Table`, 
    ROUND(((data_length + index_length) / 1024 / 1024), 2) `Size (MB)` 
    FROM information_schema.TABLES 
    ORDER BY (data_length + index_length) DESC;

SELECT COUNT(countdown) AS cntd FROM `view.HalfLife`;
-- UPDATE `view.halflife` SET `view.halflife`.`countdown` = 13
-- WHERE `view.halflife`.`Table` = 'help_topic';

CREATE SEQUENCE sqnc START WITH 100 INCREMENT BY 13;
SELECT NEXTVAL(sqnc); --- continue running the previous query


  
SELECT `quark` FROM `qrx`;
  
/*
to set a value for a user-defined variable you can use:

SET statement;
:= operator within a SQL statement;
SELECT ... INTO.
---
It is unsafe to read a user-defined variable
They must be used to PREPARE a prepared statement:

SELECT ROUND((COUNT(id)/4)) INTO @qtr FROM db.tbl WHERE col != 'User';
SELECT @qtr;
PREPARE stmnt FROM 'SELECT * FROM db.tbl WHERE col != \'User\' ORDER BY id DESC LIMIT ?';
EXECUTE stmnt USING @qtr;
DEALLOCATE PREPARE stmnt;


---
Another common use is to include a counter in a query:

SET @var = 0;
SELECT a, b, c, (@var:=@var+1) AS counter FROM my_table;
*/


SET @str = CAST(123 AS CHAR(5));
SET @var = 0;
SELECT * FROM information_schema.USER_VARIABLES ORDER BY VARIABLE_NAME;
FLUSH USER_VARIABLES;
SELECT * FROM information_schema.USER_VARIABLES ORDER BY VARIABLE_NAME;

Drop TABLE `dq.system`;
CREATE TABLE `dq.system` (x int) WITH SYSTEM VERSIONING # PARTITION BY SYSTEM_TIME LIMIT 1000 AUTO;
PARTITION BY SYSTEM_TIME 
    INTERVAL 1 MONTH 
    PARTITIONS 12;
SELECT versioning, ROW_START, ROW_END FROM `dq.system`;
SELECT * FROM `dq.system` FOR SYSTEM_TIME BETWEEN (NOW() - INTERVAL 1 YEAR) AND NOW();
SELECT * FROM `dq.system` FOR SYSTEM_TIME AS OF TIMESTAMP'2016-10-09 08:07:06';
SELECT * FROM `dq.system` FOR SYSTEM_TIME ALL;
select *,row_start,row_end from `dq.system` for system_time all;

CREATE VIEW `view.system.queries` AS SELECT * FROM `dq.system` FOR SYSTEM_TIME BETWEEN (NOW() - INTERVAL 1 HOUR) AND NOW();
SELECT * FROM `view.system.queries`;

SELECT SYS_GUID();

/***********************************/
/* trigger
DELIMITER //
CREATE TRIGGER the_mooses_are_loose
AFTER INSERT ON animals
FOR EACH ROW
BEGIN
 IF NEW.name = 'Moose' THEN
  UPDATE animal_count SET animal_count.animals = animal_count.animals+100;
 ELSE 
  UPDATE animal_count SET animal_count.animals = animal_count.animals+1;
 END IF;
END; //

DELIMITER ;
*/

# log tables
SELECT * FROM information_schema.tables WHERE TABLE_SCHEMA = 'mysql' AND TABLE_NAME  LIKE '%log%';

SET GLOBAL log_output='TABLE';
SET GLOBAL general_log=1;
SET GLOBAL slow_query_log=1;

SELECT * FROM mysql.slow_log;


SELECT * FROM mysql.general_log;
TRUNCATE TABLE mysql.general_log;
SELECT * FROM mysql.general_log;

SET SESSION sql_log_bin = 1;

SHOW BINARY LOGS;
PURGE BINARY LOGS;
SHOW BINARY LOGS;

SHOW MASTER LOGS;

SET GLOBAL general_log=0;
SET GLOBAL slow_query_log=0;
SET SESSION sql_log_bin = 0;

/* stored function 1
DELIMITER //

CREATE FUNCTION FortyTwo() RETURNS TINYINT DETERMINISTIC
BEGIN
 DECLARE x TINYINT;
 SET x = 42;
 RETURN x;
END 

//

DELIMITER ;
*/

/* stored function 2
DELIMITER //
CREATE FUNCTION VatCents(price DECIMAL(10,2)) RETURNS INT DETERMINISTIC
BEGIN
 DECLARE x INT;
 SET x = price * 114;
 RETURN x;
END //

DELIMITER ;
*/

/* stored aggregate function
DELIMITER //
CREATE AGGREGATE FUNCTION IF NOT EXISTS aggregate_count(x INT) RETURNS INT
BEGIN
 DECLARE count_students INT DEFAULT 0;
 DECLARE CONTINUE HANDLER FOR NOT FOUND
 RETURN count_students;
      LOOP
          FETCH GROUP NEXT ROW;
          IF x  THEN
            SET count_students = count_students+1;
          END IF;
      END LOOP;
END //
DELIMITER ;
*/

-- function return value; cannot be called outside of query
-- procedure returns nothing; must be called outside of query

/* procedure
 CREATE PROCEDURE
  Withdraw                             # Routine name
  (parameter_amount DECIMAL(6,2),     # Parameter list
  parameter_teller_id INTEGER,
  parameter_customer_id INTEGER)
  MODIFIES SQL DATA                   # Data access clause
  BEGIN                        # Routine body
    UPDATE Customers
        SET balance = balance - parameter_amount
        WHERE customer_id = parameter_customer_id;
    UPDATE Tellers
        SET cash_on_hand = cash_on_hand + parameter_amount
        WHERE teller_id = parameter_teller_id;
    INSERT INTO Transactions VALUES (
        parameter_customer_id,
        parameter_teller_id,
        parameter_amount);
  END;
 */

/* event
SET GLOBAL event_scheduler = ON;
CREATE EVENT test_event 
  ON SCHEDULE EVERY 1 MINUTE DO 
   UPDATE test.t1 SET a = a + 1;
 */
/***********************************/


CREATE DEFINER=`root`@`localhost` TRIGGER memberadded
AFTER INSERT
ON `member` FOR EACH ROW
  INSERT INTO qollection (`key.id.member`)
    VALUES (NEW.id)

--- SHOW CREATE FUNCTION

SET @salt = SHA2('password',512);
SET @encrypted = AES_ENCRYPT('downquark',);
SELECT LENGTH(@salt), LENGTH(COMPRESS(@salt)), LENGTH(UNCOMPRESS(COMPRESS(@salt)));
SELECT @salt, COMPRESS(@salt), UNCOMPRESS(COMPRESS(@salt)), @salt = UNCOMPRESS(COMPRESS(@salt));
SELECT @encrypted;
SELECT AES_DECRYPT(@encrypted,@salt);

-- show engine aria status
show engine innoDB status;
-- 
-- show warnings;
-- ANALYZE TABLE `qollection`
select * from information_schema.engines;

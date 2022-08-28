USE `dq.relational`;

-- logging
SET GLOBAL log_output='TABLE';
SET GLOBAL general_log=1;
SET GLOBAL slow_query_log=1;

SELECT * FROM mysql.slow_log;


SELECT * FROM mysql.general_log;
TRUNCATE TABLE  mysql.general_log;
SELECT * FROM mysql.general_log;

SET SESSION sql_log_bin = 1;


SHOW BINARY LOGS;
PURGE BINARY LOGS;
SHOW BINARY LOGS;

SHOW MASTER LOGS;

SET GLOBAL general_log=0;
SET GLOBAL slow_query_log=0;
SET SESSION sql_log_bin = 0;

-- functions
DELIMITER //

CREATE FUNCTION Thirteen() RETURNS TINYINT DETERMINISTIC
BEGIN
 DECLARE x TINYINT;
 SET x = 13;
 RETURN x;
END 

//

CREATE FUNCTION TransformNumber(price DECIMAL(10,2)) RETURNS INT DETERMINISTIC
BEGIN
 DECLARE x INT;
 SET x = price * 114;
 RETURN x;
END //

DELIMITER ;

SELECT TransformNumber(Thirteen());

DROP FUNCTION Thirteen;
DROP FUNCTION TransformNumber;

-- simple encryption
SET @salt = SHA2('password',512);
SET @encrypted = AES_ENCRYPT('downquark',);
SELECT @salt;
SELECT @encrypted;
SELECT AES_DECRYPT(@encrypted,@salt);

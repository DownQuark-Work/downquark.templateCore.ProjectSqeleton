-- function return value; cannot be called outside of query
-- procedure returns nothing; must be called outside of query

USE `prepmd_monitoring_development`;
DROP PROCEDURE IF EXISTS Distribute;
DELIMITER ~!~
CREATE PROCEDURE Distribute(paramDistributions VARCHAR(100))
  BEGIN
    DECLARE AmtMembers, AmtPractice, AmtSite TINYINT DEFAULT 0;
    DECLARE PracId, SiteId INT DEFAULT 0;
  
    DECLARE crsrDone INT DEFAULT FALSE;
    DECLARE crsrMemSite CURSOR FOR SELECT DISTINCT site_id FROM site_memberships;
    DECLARE crsrMemPrct CURSOR FOR SELECT DISTINCT practice_id FROM sites;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET crsrDone = TRUE;
  
    SELECT COUNT(id), COUNT(DISTINCT(practice_id)) INTO AmtSite, AmtPractice FROM sites;
    SELECT COUNT(id) INTO AmtMembers FROM site_memberships sm WHERE sm.site_membershipable_type != 'User';

  
    IF paramDistributions = '*' THEN SET paramDistributions = 'bersite|berprac'; END IF;
    IF paramDistributions LIKE '%bersite%' THEN
      SET @sitesPerMem = ROUND(AmtMembers/AmtSite);
      SET @topLimit = AmtMembers;
      OPEN crsrMemSite;
      memSiteLoop: LOOP
        FETCH crsrMemSite INTO SiteId;
        IF crsrDone THEN LEAVE memSiteLoop; END IF;
        PREPARE stmntMemSite FROM 'UPDATE site_memberships sm
          SET sm.site_id = ?
          WHERE sm.site_membershipable_type != \'User\'
          LIMIT ?';
        EXECUTE stmntMemSite USING SiteId, @topLimit;
        DEALLOCATE PREPARE stmntMemSite;
        SET @topLimit = @topLimit - @sitesPerMem;
        IF @topLimit < 1 THEN SET @topLimit = 1; END IF;
      END LOOP memSiteLoop;
      CLOSE crsrMemSite;
      SET crsrDone = FALSE;
      
      SELECT COUNT (*) AS amt, site_id FROM site_memberships sm GROUP BY site_id;
    END IF;
    IF paramDistributions LIKE '%berprac%' THEN
      SET @pracsPerMem = ROUND(AmtMembers/AmtPractice);
      SET @topLimit = AmtMembers;
      OPEN crsrMemPrct;
      memPracLoop: LOOP
        FETCH crsrMemPrct INTO PracId;
        IF crsrDone THEN LEAVE memPracLoop; END IF;
        PREPARE stmntMemPrac FROM 'UPDATE patients p
          SET p.practice_id = ? WHERE 1
          LIMIT ?';
        EXECUTE stmntMemPrac USING PracId, @topLimit;
        DEALLOCATE PREPARE stmntMemPrac;
        SET @topLimit = @topLimit - @pracsPerMem;
        IF @topLimit < 1 THEN SET @topLimit = 1; END IF;
      END LOOP memPracLoop;
      CLOSE crsrMemPrct;
      SET crsrDone = FALSE;
      
      SELECT COUNT (*) AS amt, practice_id FROM patients GROUP BY practice_id;
    END IF;
  END
~!~
DELIMITER ;
CALL Distribute('*');
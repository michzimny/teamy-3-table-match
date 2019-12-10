SET @day=1;
SET @segment=1;

SET @skip_boards=((@day-1)*4+@segment-1)*18;
TRUNCATE TABLE 2nwsp._scores;
INSERT INTO 2nwsp._scores (rnd,segment,tabl,room,board,declarer,contract,result,lead,score)
SELECT (@day-1)*3+1,@segment,1,1,nrr-@skip_boards,rozg,kont,wyni,wist,zapi FROM trojmecz.zapisy WHERE stol=1 AND nrr-@skip_boards BETWEEN 1 AND 6;
INSERT INTO 2nwsp._scores (rnd,segment,tabl,room,board,declarer,contract,result,lead,score)
SELECT (@day-1)*3+1,@segment,1,2,nrr-@skip_boards,rozg,kont,wyni,wist,zapi FROM trojmecz.zapisy WHERE stol=3 AND nrr-@skip_boards BETWEEN 1 AND 6;
INSERT INTO 2nwsp._scores (rnd,segment,tabl,room,board,declarer,contract,result,lead,score)
SELECT (@day-1)*3+2,@segment,1,1,nrr-@skip_boards-6,rozg,kont,wyni,wist,zapi FROM trojmecz.zapisy WHERE stol=2 AND nrr-@skip_boards BETWEEN 7 AND 12;
INSERT INTO 2nwsp._scores (rnd,segment,tabl,room,board,declarer,contract,result,lead,score)
SELECT (@day-1)*3+2,@segment,1,2,nrr-@skip_boards-6,rozg,kont,wyni,wist,zapi FROM trojmecz.zapisy WHERE stol=1 AND nrr-@skip_boards BETWEEN 7 AND 12;
INSERT INTO 2nwsp._scores (rnd,segment,tabl,room,board,declarer,contract,result,lead,score)
SELECT (@day-1)*3+3,@segment,1,1,nrr-@skip_boards-12,rozg,kont,wyni,wist,zapi FROM trojmecz.zapisy WHERE stol=3 AND nrr-@skip_boards BETWEEN 13 AND 18;
INSERT INTO 2nwsp._scores (rnd,segment,tabl,room,board,declarer,contract,result,lead,score)
SELECT (@day-1)*3+3,@segment,1,2,nrr-@skip_boards-12,rozg,kont,wyni,wist,zapi FROM trojmecz.zapisy WHERE stol=2 AND nrr-@skip_boards BETWEEN 13 AND 18;

SELECT * FROM 2nwsp._scores;
DELETE FROM 2nwsp.scores WHERE rnd>(@day-1)*3 AND segment=@segment;
INSERT INTO 2nwsp.scores SELECT * FROM 2nwsp._scores;
TRUNCATE TABLE 2nwsp._scores;

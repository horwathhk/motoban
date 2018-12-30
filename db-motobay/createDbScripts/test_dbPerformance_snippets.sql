-- **************************************************
-- TEST: Make foreign key indexes. make 5million rows
-- **************************************************
CREATE TABLE a
(
    a_id    int     PRIMARY KEY
);
CREATE TABLE b
(
    b_id    int,
    a_id    int     REFERENCES a(a_id)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
);
INSERT INTO a
    SELECT  x
    FROM    generate_series(1, 5000000) AS x;
INSERT INTO b
    SELECT  x, x
    FROM    generate_series(1, 5000000) AS x;

-- Then analyze
explain analyze DELETE FROM a WHERE a_id = 10;
--Then add the index
CREATE INDEX idx_b ON b (a_id);
--Then analyze again... its many times faster
explain analyze DELETE FROM a WHERE a_id = 11;




-- *******************************
-- SEE ALL THE INDEXES OF A TABLE
-- *******************************
SELECT * FROM pg_indexes WHERE tablename = 'b';
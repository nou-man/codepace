CREATE DATABASE codepace;

--CREATING TABLES

CREATE TABLE subjects (
  sem integer NOT NULL,
  sub_code varchar(10) NOT NULL,
  sub_name varchar(50) NOT NULL,
  CONSTRAINT subjects_pk PRIMARY KEY (sub_code)
);


CREATE TABLE code_description (
  code_id serial PRIMARY KEY,
  sub_code varchar(10) NOT NULL REFERENCES subjects(sub_code),
  title varchar(50) NOT NULL,
  description text NOT NULL
);


CREATE TABLE programs (
  code_id integer PRIMARY KEY REFERENCES code_description(code_id),
  program text NOT NULL
);

-- Modify foreign key constraint in "code_description" table
ALTER TABLE code_description
DROP CONSTRAINT code_description_sub_code_fkey,
ADD CONSTRAINT code_description_sub_code_fkey
  FOREIGN KEY (sub_code)
  REFERENCES subjects(sub_code)
  ON DELETE CASCADE;

-- Modify foreign key constraint in "programs" table
ALTER TABLE programs
DROP CONSTRAINT programs_code_id_fkey,
ADD CONSTRAINT programs_code_id_fkey
  FOREIGN KEY (code_id)
  REFERENCES code_description(code_id)
  ON DELETE CASCADE;


--inserting values into subject table

INSERT INTO subjects (sem, sub_code, sub_name)
VALUES (6, '18CSMP68', 'MAD'),
       (6, '18CSL66', 'SSL'),
       (6, '18CSL67', 'CGL');
       

--Inserting value into both (description, programs) tables at a time;
--new version postgres only
--post

BEGIN;
DECLARE code_id INTEGER;
INSERT INTO code_description (sub_code, title, description)
VALUES ('18CS59', 'Program 1', 'This is a course about Object Oriented Concepts.')
RETURNING code_id INTO code_id;
INSERT INTO programs (code_id, program)
VALUES (code_id, 'This is the program for the Object Oriented Concepts course.');
COMMIT;


--Inserting value into both (description, programs) tables at a time;
--older version of postgresql
BEGIN;
INSERT INTO code_description (sub_code, title, description)
VALUES ('18CSL66', 'Program 2', 'This is a course about Object Oriented Concepts.')
RETURNING code_id;
INSERT INTO programs (code_id, program)
VALUES (currval('code_description_code_id_seq'), 'This is the program for the Object Oriented Concepts course.');
COMMIT;


--deleting data from description and programs
DELETE FROM code_description
WHERE code_id = <code_id_value>;


--fetching data for specific subject

SELECT s.sem, s.sub_code, s.sub_name, cd.title, cd.description, p.program
FROM subjects s
INNER JOIN code_description cd ON s.sub_code = cd.sub_code
INNER JOIN programs p ON cd.code_id = p.code_id
WHERE s.sub_code = '18CSL66';














       

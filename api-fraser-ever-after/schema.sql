DROP TABLE IF EXISTS INVITE_RSVP;
DROP TABLE IF EXISTS INVITE_ANSWER;
DROP TABLE IF EXISTS INVITE;
DROP TABLE IF EXISTS RSVP;
DROP TABLE IF EXISTS MAIN_DISH;
DROP TABLE IF EXISTS CHOICES;
DROP TABLE IF EXISTS QUESTIONS;

CREATE TABLE IF NOT EXISTS MAIN_DISH (
  main_dish TEXT PRIMARY KEY
  );

INSERT INTO MAIN_DISH ( main_dish ) VALUES ('Maple Salmon Filet'), ('AAA Grade Beef Striploin'), ('[ KIDS ] Cheese Pizza'), ('[ KIDS ] Pasta With Tomato Sauce');

CREATE TABLE IF NOT EXISTS INVITE (
  invite_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone_number INTEGER,
  created_dt DATE,
  attending TEXT,
  song_request TEXT,
  guest_count INTEGER,
  kids INTEGER
);
CREATE TABLE IF NOT EXISTS INVITE_RSVP (
  invite_id TEXT,
  rsvp_id INTEGER,
  PRIMARY KEY (invite_id, rsvp_id)
  FOREIGN KEY(invite_id) REFERENCES invite(invite_id),
  FOREIGN KEY(rsvp_id) REFERENCES rsvp(rsvp_id)
  );
CREATE TABLE IF NOT EXISTS RSVP (
  rsvp_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  dietary_restrictions TEXT,
  main_dish TEXT REFERENCES MAIN_DISH(main_dish),
  created_dt DATE DEFAULT CURRENT_DATE
  );
INSERT INTO INVITE (
    invite_id, first_name, last_name, email, phone_number, guest_count, created_dt
  ) VALUES (
    'fd0211d6-3e87-46d4-9376-12880296f670', 'Coulton', 'Fraser', 'cjrfraser@gmail.com', 4033055795,1,'2017-01-01'
  );

CREATE TABLE IF NOT EXISTS QUESTIONS (
  trivia_id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT
  );

CREATE TABLE IF NOT EXISTS CHOICES (
  choice_id INTEGER PRIMARY KEY AUTOINCREMENT,
  is_answer BOOLEAN,
  trivia_id INTEGER,
  choice TEXT,
  FOREIGN KEY(trivia_id) REFERENCES questions(trivia_id)
  );

CREATE TABLE IF NOT EXISTS INVITE_ANSWER (
  invite_answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  trivia_id INTEGER,
  invite_id TEXT,
  choice_id INTEGER,
  FOREIGN KEY(choice_id) REFERENCES choices(choice_id)
  FOREIGN KEY(trivia_id) REFERENCES questions(trivia_id),
  FOREIGN KEY(invite_id) REFERENCES invite(invite_id)
  );

INSERT INTO QUESTIONS ( question ) VALUES 
( 'Who is better at Wordle' ),
( 'Who said I love you first' ),
( "Who's car is the cleanest" ),
( "Who is the smarter one" ),
( "Who has more shoes" ),
( 'Who wakes up the ealiest' ),
( 'Who made the first move' ),
( 'Who will cry on the big day' ),
( 'Who would survive longer on a deserted island' ),
( 'Who is the bigger party animal' ),
( 'Who has more tattoos' );

INSERT INTO CHOICES ( trivia_id, choice, is_answer ) VALUES 
(1, 'Bride', 1), (1, 'Groom', 0), 
(2, 'Bride', 0), (2, 'Groom', 1) ,
(3, 'Bride', 0), (3, 'Groom', 1) ,
(4, 'Bride', 1), (4, 'Groom', 0) ,
(5, 'Bride', 1), (5, 'Groom', 0) ,
(6, 'Bride', 1), (6, 'Groom', 0) ,
(7, 'Bride', 1), (7, 'Groom', 0) ,
(8, 'Bride', 0), (8, 'Groom', 1) ,
(9, 'Bride', 1), (9, 'Groom', 0) ,
(10, 'Bride', 0), (10, 'Groom', 1) ,
(11, 'Bride', 0), (11, 'Groom', 1) ;
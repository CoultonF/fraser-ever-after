DROP TABLE IF EXISTS INVITE_RSVP;
DROP TABLE IF EXISTS INVITE;
DROP TABLE IF EXISTS RSVP;
DROP TABLE IF EXISTS QUESTIONS;
DROP TABLE IF EXISTS CHOICES;
DROP TABLE IF EXISTS INVITE_ANSWERS;
CREATE TABLE IF NOT EXISTS INVITE (
  invite_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone_number INTEGER,
  created_dt DATE,
  attending TEXT,
  guest_count INTEGER
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
  main_dish TEXT,
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
  FOREIGN KEY(trivia_id) REFERENCES trivia(trivia_id)
  );

CREATE TABLE IF NOT EXISTS INVITE_ANSWERS (
  invite_answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  trivia_id INTEGER,
  invite_id TEXT,
  FOREIGN KEY(trivia_id) REFERENCES trivia(trivia_id),
  FOREIGN KEY(invite_id) REFERENCES invite(invite_id)
  );

INSERT INTO QUESTIONS ( question ) VALUES 
( 'Who is better at Wordle' ),
( 'What is the capital of Canada?' );

INSERT INTO CHOICES ( trivia_id, choice, is_answer ) VALUES 
(1, 'Coulton', 0), (1, 'Stephanie', 1), 
(2, 'Ottowa', 1), (2, 'Calgary', 0) ;
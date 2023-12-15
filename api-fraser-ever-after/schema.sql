DROP TABLE IF EXISTS INVITE_RSVP;
DROP TABLE IF EXISTS INVITE;
DROP TABLE IF EXISTS RSVP;
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
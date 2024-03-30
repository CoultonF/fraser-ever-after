import { DateTime, Str, Int } from "@cloudflare/itty-router-openapi";

export const RsvpUpdateSchema = {
  rsvp_id: Number,
  first_name: new Str(),
  last_name: new Str(),
  dietary_restrictions: new Str({required:false,default: "None"}),
  main_dish: new Str({ required: true }),
};

export const InviteUpdateSchema = {
  invite_id: new Str({ required: true }),
  attending: new Str({ required: true }),
  song_request: new Str({ required: false, default: '' }),
  rsvps: [RsvpUpdateSchema],
};

export const RsvpDeleteSchema = [Number];

export const RsvpCreate = {
  first_name: new Str(),
  last_name: new Str(),
  dietary_restrictions: new Str({default: "None"}),
  main_dish: new Str({ required: true }),
};

export const Rsvp = {
  first_name: new Str(),
  last_name: new Str(),
  dietary_restrictions: new Str({default: "None"}),
  main_dish: new Str({ required: true }),
  created_dt: new Str(),
};

export const InviteCreate = {
  invite_id: new Str({ required: true }),
  attending: new Str({ required: true }),
  song_request: new Str({ required: false, default: '' }),
  rsvps: [RsvpCreate],
};
export const Invite = {
  invite_id: new Str({ required: true }),
  attending: new Str({ required: true }),
  song_request: new Str({ required: false, default: '' }),
  rsvps: [Rsvp],
};

export const TriviaCreate = {
  trivia_id: new Int({ required: true }),
  choice_id: new Int({ required: true })
};
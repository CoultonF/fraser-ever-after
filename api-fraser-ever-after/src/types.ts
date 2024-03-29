import { DateTime, Str, Int } from "@cloudflare/itty-router-openapi";

export const RsvpUpdateSchema = {
  rsvp_id: Number,
  first_name: new Str(),
  last_name: new Str(),
  dietary_restrictions: new Str(),
  main_dish: new Str({ required: false }),
};

export const InviteUpdateSchema = {
  invite_id: new Str({ required: true }),
  attending: new Str({ required: true }),
  rsvps: [RsvpUpdateSchema],
};

export const RsvpDeleteSchema = [Number];

export const RsvpCreate = {
  first_name: new Str(),
  last_name: new Str(),
  dietary_restrictions: new Str(),
  main_dish: new Str({ required: false }),
};

export const Rsvp = {
  first_name: new Str(),
  last_name: new Str(),
  dietary_restrictions: new Str(),
  main_dish: new Str({ required: false }),
  created_dt: new Str(),
};

export const InviteCreate = {
  invite_id: new Str({ required: true }),
  attending: new Str({ required: true }),
  rsvps: [RsvpCreate],
};
export const Invite = {
  invite_id: new Str({ required: true }),
  attending: new Str({ required: true }),
  rsvps: [Rsvp],
};

export const TriviaCreate = {
  trivia_id: new Int({ required: true }),
  choice_id: new Int({ required: true })
};
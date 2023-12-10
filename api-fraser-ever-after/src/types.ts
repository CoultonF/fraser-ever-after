import { DateTime, Str } from "@cloudflare/itty-router-openapi";

export const RsvpUpdateSchema = {
	rsvp_id: Number,
	first_name: new Str(),
	last_name: new Str(),
	dietary_restrictions: new Str(),
};

export const InviteUpdateSchema = {
	invite_id: new Str({required: true}),
	attending: new Str({required: true}),
	rsvps: [RsvpUpdateSchema]
};

export const Rsvp = {
	first_name: new Str(),
	last_name: new Str(),
	dietary_restrictions: new Str(),
};

export const Invite = {
	invite_id: new Str({required: true}),
	attending: new Str({required: true}),
	rsvps: [Rsvp]
};

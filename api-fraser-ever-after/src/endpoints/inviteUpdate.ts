import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders as headers } from "cors";
import { Invite, InviteUpdateSchema } from "../types";
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export class InviteUpdate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Invite"],
		summary: "Update an existing invite",
		requestBody: InviteUpdateSchema,
	};
	async handle(
		request: Request,
		env: Env,
		context: any,
		data: Record<string, typeof InviteUpdateSchema>
	) {
		// Retrieve the validated request body

  // Check if it's a preflight request (OPTIONS) and respond accordingly
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: headers });
  }
		const rsvpToUpdate = data.body;
		const {results: inviteResults} = await env.DB.prepare("select * from invite where invite_id = ?").bind(rsvpToUpdate.invite_id).all()
		if (inviteResults.length !== 1) {
			return new Response("Invite not found", {headers: headers})
		}
		const rsvpBatches = []
		const {results: inviteRsvpCount} = await env.DB.prepare("select count(*) as rsvp_count from invite_rsvp where invite_id = ?").bind(rsvpToUpdate.invite_id).all()
		const remainingInvites = Number(Number(inviteResults[0].guest_count) - Number(inviteRsvpCount[0].rsvp_count))
		rsvpToUpdate.rsvps.forEach(rsvp => {
			rsvpBatches.push(
				env.DB.prepare(
					"update rsvp set first_name = ?, last_name = ?, dietary_restrictions = ? where rsvp_id = ?"
					).bind(
						rsvp.first_name, rsvp.last_name, rsvp.dietary_restrictions, rsvp.rsvp_id
						)
			)
		})
		await env.DB.prepare("update invite set attending = ? where invite_id = ?").bind(rsvpToUpdate.attending, rsvpToUpdate.invite_id).run()
		if (rsvpBatches.length > 0) await env.DB.batch(rsvpBatches)
		return new Response(null, {status: 200, headers: headers})
	}
}

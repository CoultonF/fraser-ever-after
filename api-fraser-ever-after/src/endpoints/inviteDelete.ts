import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders } from "cors";
import { Invite, InviteUpdateSchema, RsvpDeleteSchema } from "../types";
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export class RsvpDelete extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["RSVP"],
		summary: "Delete an RSVP",
		requestBody: RsvpDeleteSchema,
	};

	async handle(
		request: Request,
		env: Env,
		context: any,
		data: Record<string, typeof RsvpDeleteSchema>
	) {
		// Retrieve the validated request body
const headers = new Headers({
    'Access-Control-Allow-Origin': '*', // Adjust the allowed origin as needed
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400', // 24 hours
  });

  // Check if it's a preflight request (OPTIONS) and respond accordingly
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }
		const rsvpToDelete = data.body;
		const placeholders = rsvpToDelete.map(() => "?").join(",");
		const deleteIRQuery = `DELETE FROM invite_rsvp WHERE rsvp_id IN (${placeholders})`;
		await env.DB.prepare(deleteIRQuery).bind(...rsvpToDelete).all();
		const deleteRQuery = `DELETE FROM rsvp WHERE rsvp_id IN (${placeholders})`;
		await env.DB.prepare(deleteRQuery).bind(...rsvpToDelete).all();
		return new Response(undefined, {status: 200, headers: {"access-control-allow-origin": "*"}})
	}
}

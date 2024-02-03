import {
  OpenAPIRoute,
  type OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders as headers } from "cors";
import { RsvpDeleteSchema } from "../types";
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
    data: Record<string, typeof RsvpDeleteSchema>,
  ) {
    // Retrieve the validated request body

    // Check if it's a preflight request (OPTIONS) and respond accordingly
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: headers });
    }
    const rsvpToDelete = data.body;
    const placeholders = rsvpToDelete.map(() => "?").join(",");
    const deleteIRQuery = `DELETE FROM invite_rsvp WHERE rsvp_id IN (${placeholders})`;
    await env.DB.prepare(deleteIRQuery)
      .bind(...rsvpToDelete)
      .all();
    const deleteRQuery = `DELETE FROM rsvp WHERE rsvp_id IN (${placeholders})`;
    await env.DB.prepare(deleteRQuery)
      .bind(...rsvpToDelete)
      .all();
    return new Response(null, { status: 200, headers: headers });
  }
}

import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders as headers } from "cors";
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export class InviteFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["RSVP"],
    summary: "Fetch invite",
    parameters: {
      inviteId: Path(String, {
        description: "Invite id",
      }),
    },
  };

  async handle(
    request: Request,
    env: Env,
    context: any,
    data: Record<string, any>,
  ) {
    // Retrieve the validated request body

    // Check if it's a preflight request (OPTIONS) and respond accordingly
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: headers });
    }
    const { inviteId } = data.params;
    const { results: inviteResults } = await env.DB.prepare(
      "select invite.* from invite where invite_id = ?",
    )
      .bind(inviteId)
      .all();
    return new Response(JSON.stringify(inviteResults), { headers: headers });
  }
}

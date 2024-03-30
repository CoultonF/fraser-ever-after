import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders as headers } from "cors";
import { InviteCreate } from "../types";
export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export class RsvpCreate extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["RSVP"],
    summary: "Create a new rsvp",
    requestBody: InviteCreate,
  };

  async handle(
    request: Request,
    env: Env,
    context: any,
    data: Record<string, typeof InviteCreate>,
  ) {
    // Check if it's a preflight request (OPTIONS) and respond accordingly
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: headers });
    }
    // Retrieve the validated request body
    const rsvpToCreate = data.body;
    const { results: inviteResults } = await env.DB.prepare(
      "select * from invite where invite_id = ?",
    )
      .bind(rsvpToCreate.invite_id)
      .all();
    if (inviteResults.length !== 1) {
      return new Response("Invite not found", {
        status: 404,
        headers: headers,
      });
    }
    const rsvpBatches: D1PreparedStatement[] = [];
    const { results: inviteRsvpCount } = await env.DB.prepare(
      "select count(*) as rsvp_count from invite_rsvp where invite_id = ?",
    )
      .bind(rsvpToCreate.invite_id)
      .all();
    const remainingInvites =
      Number(
        Number(inviteResults[0].guest_count) -
          Number(inviteRsvpCount[0].rsvp_count),
      ) + 1;
    rsvpToCreate.rsvps
      .filter((_, index) => index < remainingInvites)
      .forEach((rsvp) => {
        let dr = rsvp.dietary_restrictions;
        if (dr === "" || dr === undefined || dr === null) {
          dr = "None";
        }
        rsvpBatches.push(
          env.DB.prepare(
            "insert into rsvp (first_name, last_name, dietary_restrictions, main_dish) values (?,?,?,?) returning rsvp_id",
          ).bind(rsvp.first_name, rsvp.last_name, dr, rsvp.main_dish),
        );
      });
    const rsvpResults =
      rsvpBatches.length > 0 ? await env.DB.batch(rsvpBatches) : [];
    const inviteRsvp: D1PreparedStatement[] = [];
    rsvpResults.forEach((rsvp, index) => {
      if (rsvp.results.at(0) === undefined) return;
      const rsvpItem = rsvp.results.at(0) as { rsvp_id: number };
      inviteRsvp.push(
        env.DB.prepare(
          "insert into invite_rsvp (invite_id, rsvp_id) values (?,?)",
        ).bind(rsvpToCreate.invite_id, rsvpItem.rsvp_id),
      );
    });
    if (inviteRsvp.length > 0) await env.DB.batch(inviteRsvp);
    const songRequest = String(rsvpToCreate.song_request) !== '' ? rsvpToCreate.song_request : null;
    await env.DB.prepare("update invite set attending = ?, song_request = ? where invite_id = ?")
      .bind(rsvpToCreate.attending, songRequest, rsvpToCreate.invite_id)
      .run();
    if (remainingInvites >= rsvpToCreate.rsvps.length) {
      return new Response(null, { status: 200, headers: headers });
    } else {
      return new Response("Not enough invites", {
        status: 400,
        headers: headers,
      });
    }
  }
}

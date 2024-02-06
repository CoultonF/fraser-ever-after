import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders as headers } from "cors";
import { TriviaCreate } from "types";
export interface Env {
  DB: D1Database;
}

export class TriviaWrite extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["RSVP"],
    summary: "Write trivia asnwer",
    requestBody: TriviaCreate,
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
    try{
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: headers });
      }
      const {choice_id, trivia_id} = data.body;
      const {inviteId} = data.params;
      env.DB.prepare(`
      update invite_answer
      set choice_id = ?
      where invite_id = ?
      and trivia_id = ?
      and choice_id is null
      `).bind(choice_id, inviteId, trivia_id).run();
      return new Response(undefined, {status: 200, headers:  headers});
  } catch (e) {
    return new Response(undefined, {status: 500, headers:  headers});
  }
}
}
export class TriviaFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["RSVP"],
    summary: "Fetch trivia questions",
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
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: headers });
    }
    const {inviteId} = data.params;

    const { results:inviteQuestions } = await env.DB.prepare(
      'select trivia_id from invite join invite_answer using (invite_id) where invite_id = ? and choice_id is null order by trivia_id asc limit 1',
    ).bind(inviteId).all();
    if (inviteQuestions.length === 0) {
      try{

        await env.DB.prepare('insert into invite_answer (invite_id, trivia_id) select ? as invite_id, (select coalesce(max(trivia_id)+1, 1) from invite_answer where invite_id = ?) as trivia_id ').bind(inviteId, inviteId).run();
      } catch (e) {
       return new Response(JSON.stringify([]), {headers: {...headers, "Content-Type": "application/json"}});
      }
    }
    const { results } = await env.DB.prepare(
      `select 
      q.trivia_id,
      q.question,
      ch.choice_id,
      ch.choice
      from questions q
      join choices ch on ch.trivia_id = q.trivia_id
      join invite_answer ia on ia.trivia_id = q.trivia_id
      where ia.invite_id = ?
      and ia.choice_id is null
      order by q.trivia_id`,
    ).bind(inviteId).all();
    const output = transformResults(results);
    const responseBody = JSON.stringify(output);
    const responseHeaders = {
      ...headers,
      "Content-Type": "application/json",
    };
    return new Response(responseBody, { headers: responseHeaders });
  }
}

function transformResults(results: any[]) {
  const transformedResults = results.reduce((acc, row) => {
    const indexOf = acc.findIndex((r) => r.trivia_id === row.trivia_id);
    if (indexOf === -1) {
      acc.push({
        trivia_id: row.trivia_id,
        question: row.question,
        choices: [{
          choice_id: row.choice_id,
          choice: row.choice,
        }],
      });
    }
    else {
      acc[indexOf].choices.push({
        choice_id: row.choice_id,
        choice: row.choice,
      });
    }
    return acc;
  }, []);
  return transformedResults
}
export class TriviaHistoryFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["RSVP"],
    summary: "Fetch trivia history",
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
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: headers });
    }
    const {inviteId} = data.params;
    const { results } = await env.DB.prepare(
      `select 
      q.trivia_id,
      q.question,
      ch.choice_id,
      ch.choice,
      ch.is_answer
      from questions q
      join choices ch on ch.trivia_id = q.trivia_id
      join invite_answer ia on ia.trivia_id = q.trivia_id and ia.choice_id = ch.choice_id
      where ia.invite_id = ?
      and ia.choice_id is not null
      order by q.trivia_id desc`,
    ).bind(inviteId).all();
    return new Response(JSON.stringify(results), {headers: {...headers, "Content-Type": "application/json"}});
  }

}
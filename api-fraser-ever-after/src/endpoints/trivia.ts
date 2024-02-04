import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
  Path,
} from "@cloudflare/itty-router-openapi";
import { corsHeaders as headers } from "cors";
export interface Env {
  DB: D1Database;
}

export class TriviaFetch extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["RSVP"],
    summary: "Fetch trivia questions",
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
    const { results } = await env.DB.prepare(
      "select trivia_id, question, choice_id, choice from trivia join choices using (trivia_id) order by trivia_id, choice_id",
    ).all();
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
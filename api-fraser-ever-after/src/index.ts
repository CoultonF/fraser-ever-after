import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { Router, createCors, error, json } from "itty-router";
import { RsvpCreate } from "./endpoints/rsvpCreate";
import { RsvpFetch } from "./endpoints/rsvpFetch";
import { InviteFetch } from "./endpoints/inviteFetch";
import { InviteUpdate } from "./endpoints/inviteUpdate";
import { RsvpDelete } from "endpoints/inviteDelete";
import { TriviaFetch } from "endpoints/trivia";
const { preflight, corsify } = createCors({
  origins: ["*"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

export const router = OpenAPIRouter({
  docs_url: "/",
});

router.all("*", preflight);
// router.get("/api/tasks/", TaskList);
router.post("/api/rsvp/create", preflight, RsvpCreate);
router.get("/api/rsvp/:inviteId", preflight, RsvpFetch);
router.post("/api/rsvp/delete", preflight, RsvpDelete);
router.post("/api/rsvp/update", preflight, InviteUpdate);
router.get("/api/invite/:inviteId", preflight, InviteFetch);
router.get("/api/trivia", preflight, TriviaFetch);
// router.get("/api/tasks/:taskSlug/", TaskFetch);
// router.delete("/api/tasks/:taskSlug/", TaskDelete);

// 404 for everything else
router.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    { status: 404 },
  ),
);

export default {
  fetch: router.handle,
};

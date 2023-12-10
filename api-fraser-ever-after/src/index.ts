import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { RsvpCreate } from "./endpoints/rsvpCreate";
import { RsvpFetch } from "./endpoints/rsvpFetch";
import { InviteFetch } from "./endpoints/inviteFetch";
import { InviteUpdate } from "./endpoints/inviteUpdate";

export const router = OpenAPIRouter({
	docs_url: "/",
});

// router.get("/api/tasks/", TaskList);
router.post("/api/rsvp/", RsvpCreate);
router.get("/api/rsvp/:inviteId", RsvpFetch);
router.put("/api/invite/", InviteUpdate);
router.get("/api/invite/:inviteId", InviteFetch);
// router.get("/api/tasks/:taskSlug/", TaskFetch);
// router.delete("/api/tasks/:taskSlug/", TaskDelete);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};

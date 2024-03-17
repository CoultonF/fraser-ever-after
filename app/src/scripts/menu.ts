import { inviteAtom } from "@/components/inviteStore.ts";
document.addEventListener('astro:page-load', () => {
  const storedValue = inviteAtom.get()
    const invEl = document.getElementById('invite-menu-href') as HTMLAnchorElement;
    if (invEl) {
      invEl.href = `/invite${typeof storedValue === 'string' ? '/' + storedValue : ''}`;
    }
    const rsvpEl = document.getElementById('rsvp-btn-href') as HTMLAnchorElement;
    if (rsvpEl) {
      rsvpEl.href = `/invite${typeof storedValue === 'string' ? '/' + storedValue : ''}`;
    }
    const triviaEl = document.getElementById('trivia-menu-href') as HTMLAnchorElement;
    if (triviaEl) {
      triviaEl.href = `/trivia${typeof storedValue === 'string' ? '/' + storedValue : ''}`;
    }
});

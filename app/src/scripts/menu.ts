import { inviteAtom } from "@/components/inviteStore.ts";
document.addEventListener('astro:page-load', () => {
  const storedValue = inviteAtom.get()
    const invEl = document.querySelectorAll('[id^="invite-menu-href"]');
    if (invEl.length > 0) {
      invEl.forEach((el) => {
      el.href = `/invite${typeof storedValue === 'string' ? '/' + storedValue : ''}`;
      });
    }
    const rsvpEl = document.querySelectorAll('[id^="registry-menu-href"]');
    if (rsvpEl.length > 0) {
      rsvpEl.forEach((el) => {
      el.href = `/registry${typeof storedValue === 'string' ? '/' + storedValue : ''}`;
    })
    const triviaEl = document.querySelectorAll('[id^="trivia-menu-href"]');
    if (triviaEl.length > 0) {
      triviaEl.forEach((el) => {
      el.href = `/trivia${typeof storedValue === 'string' ? '/' + storedValue : ''}`;
    })
  }
  }
});

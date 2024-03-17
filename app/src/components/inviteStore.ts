import { persistentAtom } from '@nanostores/persistent';

export const inviteAtom = persistentAtom<string>('inviteId','');
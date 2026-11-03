import {
  signInAnonymously,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from './client';

export function initAuth(
  onSignedIn: (user: User) => void,
  onError: (err: Error) => void
): () => void {
  if (!isFirebaseConfigured) {
    onError(new Error('Firebase chưa được cấu hình'));
    return () => {};
  }

  const auth = getFirebaseAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      onSignedIn(user);
    } else {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        onError(err as Error);
      }
    }
  });

  return unsubscribe;
}

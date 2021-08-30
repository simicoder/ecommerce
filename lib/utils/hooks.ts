import { useState, useEffect } from 'react';
import { auth } from 'lib/firebase';
import firebase from 'firebase/app';

export const useUser = () => {
  const [user, setUser] = useState<firebase.User | null>(auth.currentUser || null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [user]);

  return { user };
};

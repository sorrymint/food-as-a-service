import { useEffect, useState } from 'react';

type User = { id: number } | null;

export function useUser() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch('/api/session')
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

  return user;
}
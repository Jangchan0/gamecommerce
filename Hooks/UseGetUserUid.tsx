import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const UseGetUserUid = (): string => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (authUser) => setUser(authUser));

        return () => unsubscribe();
    }, []);

    return user?.uid || '';
};

export default UseGetUserUid;

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const UseGetUserUid = () => {
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user as unknown as string);
        });

        return () => unsubscribe();
    }, []);

    return user?.uid || '';
};

export default UseGetUserUid;

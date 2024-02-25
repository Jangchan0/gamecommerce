// 'UseGetUserInfo.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

const UseGetUserInfo = (callback) => {
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            callback(user);
        });

        return () => unsubscribe();
    }, [callback]);
};

export default UseGetUserInfo;

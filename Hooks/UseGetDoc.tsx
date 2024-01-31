// 커스텀 훅
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

const UseGet = (userEmail: string) => {
    const docRef = doc(db, 'users', userEmail);

    return getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log('No such document!');
                return null;
            }
        })
        .catch((error) => {
            console.error('Error getting document:', error);
            return null;
        });
};

export { UseGet };

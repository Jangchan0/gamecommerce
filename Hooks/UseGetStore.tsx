// 커스텀 훅
import { db } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

const UseGetStore = (collection: string, docName: string) => {
    const docRef = doc(db, collection, docName);

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

export { UseGetStore };

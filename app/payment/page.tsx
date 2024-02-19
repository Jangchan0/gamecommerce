'use client';
import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '../firebase';
import UseAuthVerification from '../../Hooks/UseAuthVerification';

const Payment = () => {
    UseAuthVerification();

    return <div>Payment</div>;
};

export default Payment;

import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PositionToast() {
    useEffect(() => {
        toast('🚫 포지션을 선택해주세요!', {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}
export default PositionToast;

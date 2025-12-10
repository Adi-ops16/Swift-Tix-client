import React from 'react';
import notFoundAnimation from '../../animations/socialv no data.json'
import Lottie from 'lottie-react';

const NotFound = () => {
    return (
        <div className='min-h-[calc(100vh/4)] flex justify-center items-center'>
            <Lottie
                animationData={notFoundAnimation}
            ></Lottie>
        </div>
    );
};

export default NotFound;
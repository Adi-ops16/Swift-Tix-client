import Lottie from 'lottie-react';
import React from 'react';
import loadingAnimation from '../../animations/Loading 40 _ Paperplane.json'

const Loading = () => {
    return (
        <div className='flex min-h-[calc(100vh/2)] justify-center items-center'>
            <Lottie
                animationData={loadingAnimation}
                loop={true}
            >
            </Lottie>
        </div>
    );
};

export default Loading;
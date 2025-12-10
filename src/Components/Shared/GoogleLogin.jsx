import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import SwiftAlert from '../../utils/alerts/SwiftAlert';
import SmallLoader from '../Loading/smallLoader';
import useAxios from '../../Hooks/useAxios'
import { useNavigate } from 'react-router';

const GoogleLogin = ({ title, state }) => {
    const [isPending, setIsPending] = useState(false)
    const { signInWithGoogle, setUser } = useAuth()

    const axios = useAxios()

    const navigate = useNavigate()

    const handleSignIn = () => {
        setIsPending(true)
        signInWithGoogle()


            .then(async res => {

                const displayName = res.user.displayName
                const email = res.user.email
                const photoURL = res.user.photoURL

                const userInfo = {
                    displayName,
                    email,
                    photoURL
                }

                await axios.post('/users', userInfo)

                SwiftAlert({
                    title: "Welcome to Swift-Tix",
                    text: `${title} successful`,
                })

                setUser(res.user)
                setIsPending(false)

                navigate(state || "/")
            })
            .catch(err => {
                console.log(err)
                setIsPending(false)
            })
    }
    return (
        <div className='w-full'>
            {
                isPending ? <div className='btn w-full bg-white text-black border-[#e5e5e5]'>
                    <SmallLoader></SmallLoader>
                </div>
                    :
                    <button onClick={handleSignIn} className="btn w-full bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        {title} with google

                    </button>
            }
        </div>
    );
};

export default GoogleLogin;
import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/'
})


const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        // request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
        }
    }, [user])

    return axiosSecure
};

export default useAxiosSecure;
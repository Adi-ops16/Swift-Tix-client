import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role, isLoading: roleLoading, } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/role?email=${user?.email}`)
            return res.data.role
        },
        enabled: !!user?.email
    })

    return { role, roleLoading };
};

export default useRole;
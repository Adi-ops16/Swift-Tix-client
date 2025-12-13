import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RevenueOverview = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: stats = [] } = useQuery({
        queryKey: ['revenue-overview', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor/dashboard-stats?email=${user?.email}`)
            return res.data
        }
    })
    console.log(stats)
    return (
        <div>

        </div>
    );
};

export default RevenueOverview;
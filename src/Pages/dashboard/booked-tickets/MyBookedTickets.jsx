import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyBookedTickets = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`)
            return res.data;
        }
    })
    console.log(bookings)
    return (
        <div>
            User
        </div>
    );
};

export default MyBookedTickets;
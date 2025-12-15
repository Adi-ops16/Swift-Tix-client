import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar, BarChart, Bar
} from 'recharts';
import Loading from '../../../Components/Loading/Loading';

const RevenueOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ['revenue-overview', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/vendor/dashboard-stats?email=${user.email}`
            );
            return res.data.stats;
        }
    });

    const {
        totalRevenue = 0,
        totalTicketsSold = 0,
        totalTicketsAdded = 0
    } = data || {};

    const [animated, setAnimated] = useState({
        revenue: 0,
        sold: 0,
        added: 0
    });

    useEffect(() => {
        let start = null;
        const duration = 1200;

        const animate = (time) => {
            if (!start) start = time;
            const progress = Math.min((time - start) / duration, 1);

            setAnimated({
                revenue: Math.floor(progress * totalRevenue),
                sold: Math.floor(progress * totalTicketsSold),
                added: Math.floor(progress * totalTicketsAdded)
            });

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [totalRevenue, totalTicketsSold, totalTicketsAdded]);

    if (!data) {
        return null
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="mx-5 lg:mx-20 my-12 space-y-10">

            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-primary">
                    Revenue Overview
                </h1>
                <p className="text-base text-base-content/70">
                    Real-time performance summary of your ticket business
                </p>
            </div>

            <div className="
            relative
            bg-base-100
            rounded-3xl
            shadow-lg
            p-6 md:p-8
            transition-all
            hover:shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <p className="text-sm font-medium text-base-content/60">
                            Total Revenue
                        </p>
                        <h2 className="text-4xl font-extrabold text-success mt-1">
                            $ {animated.revenue.toLocaleString()}
                        </h2>
                        <span className="text-xs text-base-content/50">
                            Aggregated lifetime earnings
                        </span>
                    </div>

                    <div className="badge badge-success badge-outline">
                        Updated live
                    </div>
                </div>

                <div className="h-64 min-h-64 rounded-xl bg-base-200/40 p-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={[
                                { name: 'Start', value: 0 },
                                { name: 'Now', value: animated.revenue }
                            ]}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--color-success)"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Tickets Sold */}
                <div className=" bg-base-100 rounded-3xl shadow-md p-6 transition-all hover:shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-base-content/60">
                                Tickets Sold
                            </p>
                            <h3 className="text-3xl font-bold text-secondary">
                                {animated.sold}
                            </h3>
                        </div>
                        <span className="badge badge-secondary badge-outline">
                            Sales
                        </span>
                    </div>

                    <div className="h-56 bg-base-200/40 rounded-xl p-3">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="65%"
                                outerRadius="90%"
                                barSize={18}
                                data={[{ value: animated.sold }]}
                            >
                                <RadialBar
                                    background
                                    clockWise
                                    dataKey="value"
                                    fill="var(--color-secondary)"
                                />
                                <Tooltip />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className=" bg-base-100 rounded-3xl shadow-md p-6 transition-all hover:shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-base-content/60">
                                Tickets Added
                            </p>
                            <h3 className="text-3xl font-bold text-accent">
                                {animated.added}
                            </h3>
                        </div>
                        <span className="badge badge-accent badge-outline">
                            Inventory
                        </span>
                    </div>

                    <div className="h-56 min-h-56 bg-base-200/40 rounded-xl p-3">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    {
                                        name: 'Tickets',
                                        Added: animated.added,
                                        Sold: animated.sold
                                    }
                                ]}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="Added"
                                    fill="var(--color-accent)"
                                    radius={[8, 8, 0, 0]}
                                />
                                <Bar
                                    dataKey="Sold"
                                    fill="var(--color-secondary)"
                                    radius={[8, 8, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RevenueOverview;

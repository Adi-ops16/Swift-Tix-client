import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserTie, FaUserShield } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import { BiSolidError } from "react-icons/bi";
import SwiftConfirm from '../../../utils/alerts/SwiftConfirm';
import SwiftAlert from '../../../utils/alerts/SwiftAlert';
import Loading from '../../../Components/Loading/Loading';

const ManageUsers = () => {
    const [isPending, setIsPending] = useState(false)
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', 'role'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleUserRole = async (user, role) => {
        setIsPending(true)
        const userInfo = {
            id: user?._id,
            updatedRole: role
        }

        try {
            const result = await SwiftConfirm({
                title: `Are you sure?`,
                text: `you want to 
                ${role === 'user' ? "remove" : "make"}
                ${user.displayName} 
                ${role === 'user' ? "from an admin?" : role === 'admin' ? "an admin?" : "a vendor?"}`,
                icon: "info"
            })
            if (result.isConfirmed) {
                axiosSecure.patch('/update/role', userInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            SwiftAlert({
                                title: "Success",
                                text: `${user?.displayName} updated to ${role}`
                            })
                            refetch()
                        }
                    })
            }
        }
        catch (err) {
            console.log(err)
            SwiftAlert({
                title: "Something went wrong",
                text: `please try again`,
                icon: "error"
            })
        }
        finally {
            setIsPending(false)
        }

    }

    return (
        <div className="min-h-screen px-4 py-10 bg-oklch-95">
            <h2 className="text-4xl font-bold mb-8 text-center">
                Manage Users
            </h2>
            {isPending ?
                <Loading />
                :
                <div className="bg-white shadow-xl rounded-2xl p-6">
                    <div className="overflow-x-auto rounded-xl">
                        <table className="table table-zebra">
                            <thead className="bg-oklch-92 text-oklch-20 font-semibold">
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="text-oklch-30">
                                {users.map((user, i) => {

                                    const isAdmin = user.role === "admin";
                                    const isVendor = user.role === "vendor";
                                    const isUser = user.role === "user";

                                    const { _id, photoURL, displayName, email, role } = user || {}

                                    return (
                                        <tr key={_id} className="hover:bg-oklch-96 transition">
                                            <td className="font-semibold">{i + 1}</td>

                                            <td>
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar">
                                                        <div className="w-12 h-12 rounded-xl border border-oklch-85 shadow-md overflow-hidden">
                                                            <img
                                                                src={photoURL}
                                                                alt="user"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="font-bold text-oklch-20">
                                                            {displayName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="text-oklch-40">{email}</td>

                                            <td>
                                                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-oklch-90 capitalize">
                                                    {role}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="flex items-center justify-center flex-wrap gap-3">

                                                    {isAdmin && (
                                                        <button
                                                            onClick={() => handleUserRole(user, 'user')}
                                                            className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 flex items-center gap-2 shadow cursor-pointer"
                                                        >
                                                            <RiUserUnfollowFill size={18} />
                                                            Remove Admin
                                                        </button>
                                                    )}

                                                    {isUser && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUserRole(user, 'admin')}
                                                                className="px-3 py-1 rounded-lg my-gradient hover-gradient text-white text-sm flex items-center gap-2 shadow cursor-pointer">
                                                                <MdAdminPanelSettings size={18} />
                                                                Make Admin
                                                            </button>

                                                            <button
                                                                onClick={() => handleUserRole(user, 'vendor')}
                                                                className="px-3 py-1 rounded-lg bg-oklch-80 text-oklch-20 hover:bg-oklch-70 text-sm flex items-center gap-2 shadow cursor-pointer">
                                                                <FaUserTie size={18} />
                                                                Make Vendor
                                                            </button>
                                                        </>
                                                    )}

                                                    {isVendor && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUserRole(user, 'admin')}
                                                                className="px-3 py-1 rounded-lg my-gradient hover-gradient text-white text-sm flex items-center gap-2 shadow cursor-pointer">
                                                                <MdAdminPanelSettings size={18} />
                                                                Make Admin
                                                            </button>

                                                            <button className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 flex items-center gap-2 shadow cursor-pointer">
                                                                <BiSolidError size={18} />
                                                                Mark as Fraud
                                                            </button>
                                                        </>
                                                    )}

                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default ManageUsers;

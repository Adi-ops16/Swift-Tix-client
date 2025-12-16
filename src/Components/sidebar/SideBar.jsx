import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaThLarge, FaUser, FaSignOutAlt, FaUsers, FaClipboardList, FaChartLine } from "react-icons/fa";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoTicket, IoBagAdd } from "react-icons/io5";
import { LuTicketPlus } from "react-icons/lu";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
import Logo from "../Shared/Logo";
import useRole from "../../Hooks/useRole";
import SwiftAlert from "../../utils/alerts/SwiftAlert";

const SideBar = ({ isExpanded, setIsExpanded }) => {
    const { user, logOut } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { role } = useRole()

    const menu = [
        { to: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
        ...role === 'user' ? [
            { to: "/dashboard/bookings", label: "My Booked Tickets", icon: <IoBagAdd /> },
            { to: "/dashboard/payment-history", label: "Transaction History", icon: <MdOutlineReceiptLong /> }
        ] : [],

        ...role === 'vendor' ? [
            { to: "/dashboard/add-ticket", label: "Add tickets", icon: <IoTicket /> },
            { to: "/dashboard/added-tickets", label: "My added tickets", icon: <LuTicketPlus /> },
            { to: "/dashboard/requested-bookings", label: "Requested Bookings", icon: <FaClipboardList /> },
            { to: "/dashboard/revenue-overview", label: "Revenue Overview", icon: <FaChartLine /> }
        ] : [],

        ...role === 'admin' ? [
            { to: "/dashboard/manage-tickets", label: "Manage tickets", icon: <IoTicket /> },
            { to: "/dashboard/manage-users", label: "Manage User", icon: <FaUsers /> },
            { to: "/dashboard/advertise-tickets", label: "Advertise tickets", icon: <LuTicketPlus /> },
        ] : []
    ];

    const navigate = useNavigate()

    const handleLogOut = () => {
        setMobileOpen(false)
        logOut()
            .then(() => {
                navigate('/')
                SwiftAlert({
                    title: "LogOut successful",
                    text: " "
                })
            })
    }

    return (
        <>

            <motion.aside
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                animate={{
                    width: isExpanded ? 256 : 64
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:bg-base-200 lg:border-r lg:border-base-200 lg:z-50"
            >
                <div className="px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <Logo></Logo>
                    </div>
                    {isExpanded && (
                        <div>
                            <div className="font-bold">Swift-Tix</div>
                            <div className="text-xs text-base-content/60">Book with ease</div>
                        </div>
                    )}
                </div>

                <nav className="flex-1 mt-4 px-2">
                    <ul className="flex flex-col gap-1">
                        {menu.map((m) => (
                            <li key={m.to}>
                                <NavLink
                                    to={m.to}
                                    {...(m.to === "/dashboard" && { end: true })}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition ${isActive ? "active" : ""}`}
                                >
                                    <span className="text-lg">{m.icon}</span>
                                    {isExpanded && <span>{m.label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="px-3 pb-6 border-t border-base-300 pt-4">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-base-300">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/1b0k0rR/default-avatar.png"}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        {isExpanded && (
                            <div>
                                <div className="font-medium">{user?.displayName}</div>
                                <div className="text-xs text-base-content/60">
                                    Role: {role || "user"}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleLogOut}
                        className="btn btn-ghost w-full mt-3 flex items-center gap-3 justify-start"
                    >
                        <FaSignOutAlt />
                        {isExpanded && "Logout"}
                    </button>
                </div>
            </motion.aside>

            <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-base-200 border-b border-base-300 z-40 flex items-center justify-between px-4">

                <button onClick={() => setMobileOpen(true)} className="btn btn-ghost btn-sm">
                    ☰
                </button>

                <Link to="/" className="font-bold text-lg">
                    <Logo />
                </Link>

                <Link to="/" className="btn btn-ghost btn-sm">Help</Link>
            </div>

            <div
                className={`fixed inset-y-0 left-0 w-64 bg-base-200 border-r border-base-300 z-50 transform transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4 pt-20">
                    <button
                        className="w-full px-2 absolute top-4 right-4 flex items-center justify-between"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Logo></Logo>
                        ✕
                    </button>

                    <nav className="mt-4">
                        <ul className="flex flex-col gap-3">
                            {menu.map((m) => (
                                <li key={m.to}>
                                    <NavLink
                                        to={m.to}
                                        {...(m.to === "/dashboard" && { end: true })}
                                        className={({ isActive }) =>
                                            `px-3 py-2 rounded-lg hover:bg-base-300 ${isActive ? "active" : ""}`
                                        }
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {m.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <button
                        className="btn btn-outline w-full mt-6"
                        onClick={handleLogOut}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

        </>
    );
};

export default SideBar;
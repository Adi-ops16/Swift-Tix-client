import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import useAuth from "../../Hooks/useAuth";
import SwiftAlert from "../../utils/alerts/SwiftAlert";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then(() => {
                SwiftAlert({
                    title: "LogOut successful",
                    text: " "
                })
            })
    }
    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:text-primary hover:bg-base-200 mr-2"
                >
                    <FaHome /> Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-tickets"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:text-primary hover:bg-base-200 mr-2"
                >
                    <IoTicketOutline /> All Tickets
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:text-primary hover:bg-base-200 mr-2"
                >
                    <LuLayoutDashboard /> Dashboard
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 rounded-2xl">
            {/* Left Section */}
            <div className="navbar-start">
                {/* Mobile Menu */}
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        ☰
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>

                <Link to="/" className="text-xl font-bold">
                    <Logo />
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            {/* Right Section */}
            <div className="navbar-end flex items-center gap-4">
                {user ? (
                    <div className="dropdown dropdown-end pr-3">
                        <div tabIndex={0} role="button" className="flex items-center tooltip tooltip-bottom" data-tip={`${user.displayName}`}>
                            <img
                                className="w-11 h-11 rounded-full border border-base-300 object-cover hover:opacity-90 transition"
                                src={user.photoURL || "https://i.ibb.co.com/BKZZLqwM/default-Logo.jpg"}
                                alt="user"
                            />
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu dropdown-content bg-base-100 rounded-xl w-48 p-2 shadow-md mt-3 border border-base-200`}
                        >
                            <li>
                                <Link to="/dashboard/profile" className="font-medium">Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogOut} className="text-red-500 font-semibold">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link
                        to="/auth/login"
                        className="btn rounded-xl font-semibold my-gradient text-white hover-gradient"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
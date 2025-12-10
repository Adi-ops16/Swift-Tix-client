import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AllTickets from "../Pages/All-tickets/AllTickets";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/dashboard/DashboardHome";
import Profile from "../Pages/dashboard/profile/Profile";
import VendorRoute from "./VendorRoute";
import AddTicket from "../Pages/dashboard/add-ticket/AddTicket";
import AddedTickets from "../Pages/dashboard/added-tickets/AddedTickets";
import Error from "../Pages/error/Error";
import AdminRoute from "./AdminRoute";
import ManageTickets from "../Pages/dashboard/manage-tickets/ManageTickets";
import ManageUsers from "../Pages/dashboard/manage-users/ManageUsers";
import AdvertiseTickets from "../Pages/dashboard/advertise-tickets/AdvertiseTickets";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-tickets',
                element: <PrivateRoute>
                    <AllTickets></AllTickets>
                </PrivateRoute>
            }
        ]
    },
    {
        path: 'auth',
        Component: AuthLayout,
        errorElement: <Error></Error>,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'profile',
                Component: Profile
            },
            // pages for admin
            {
                path: 'manage-tickets',
                element: <AdminRoute>
                    <ManageTickets></ManageTickets>
                </AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
            },
            {
                path: 'advertise-tickets',
                element: <AdminRoute>
                    <AdvertiseTickets></AdvertiseTickets>
                </AdminRoute>
            },
            // Pages for Vendors
            {
                path: 'add-ticket',
                element: <VendorRoute>
                    <AddTicket></AddTicket>
                </VendorRoute>
            },
            {
                path: 'added-tickets',
                element: <VendorRoute>
                    <AddedTickets></AddedTickets>
                </VendorRoute>
            },
        ]
    }
])
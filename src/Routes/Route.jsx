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
import TicketDetails from "../Pages/ticket-details/TicketDetails";
import UserRoute from "./UserRoute";
import MyBookedTickets from "../Pages/dashboard/booked-tickets/MyBookedTickets";
import RequestedBookings from "../Pages/dashboard/requested-bookings/RequestedBookings";
import PaymentSuccess from "../Pages/dashboard/payment/PaymentSuccess";
import PaymentCancel from "../Pages/dashboard/payment/PaymentCancel";
import TransactionHistory from "../Pages/dashboard/transaction-history/TransactionHistory";
import RevenueOverview from "../Pages/dashboard/revenue-overview/RevenueOverview";

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
                path: 'all-tickets',
                element: <AllTickets></AllTickets>
            },
            {
                path: '/ticket/:id',
                element: <PrivateRoute>
                    <TicketDetails></TicketDetails>
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
                Component: Profile
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'payment-history',
                Component: TransactionHistory
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancel',
                Component: PaymentCancel
            },
            // pages for users
            {
                path: 'bookings',
                element: <UserRoute>
                    <MyBookedTickets></MyBookedTickets>
                </UserRoute>
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
            {
                path: 'requested-bookings',
                element: <VendorRoute>
                    <RequestedBookings></RequestedBookings>
                </VendorRoute>
            },
            {
                path: 'revenue-overview',
                element: <VendorRoute>
                    <RevenueOverview></RevenueOverview>
                </VendorRoute>
            }
        ]
    }
])
import React from 'react';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const { role, roleLoading } = useRole()
    if (roleLoading || loading || !user || !role) {
        return <Loading></Loading>
    }
    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;
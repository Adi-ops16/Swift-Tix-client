import React from 'react';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';
import useAuth from '../Hooks/useAuth';

const VendorRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const { role, roleLoading } = useRole()
    if (roleLoading || loading || !user || !role) {
        return <Loading></Loading>
    }
    if (role !== 'vendor') {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default VendorRoute;
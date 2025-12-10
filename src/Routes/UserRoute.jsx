import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const UserRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const { role, roleLoading } = useRole()
    if (roleLoading || loading || !user || !role) {
        return <Loading></Loading>
    }
    if (role !== 'user') {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default UserRoute;
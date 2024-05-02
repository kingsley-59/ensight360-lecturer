import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../stores/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
    const { children } = props;
    const authStore = useAuthStore();
    const location = useLocation();
    const [requestedLocation, setRequestedLocation] = useState<string | null>();

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                authStore.setIsAuthenticated(true);
                authStore.setUser(user);
            } 
        })

        return () => {
            unsuscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authStore.setIsAuthenticated, authStore.setUser])

    if (!authStore.isAuthenticated) {
        if (location.pathname !== requestedLocation) {
            setRequestedLocation(location.pathname);
        }

        return <Navigate to={'/auth/login'} />;
    }

    // This is done so that in case the route changes by any chance through other
    // means between the moment of request and the render we navigate to the initially
    // requested route.
    if (requestedLocation && location.pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
};

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default AuthGuard;
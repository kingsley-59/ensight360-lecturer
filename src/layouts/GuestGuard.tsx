import type { ReactNode } from 'react';
// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../stores/authStore';


export default function GuestGuard({ children }: { children: ReactNode }) {
    // const { isAuthenticated } = useAuthStore();

    // if (isAuthenticated) {
    //     return <Navigate to='/' />;
    // }

    return <>{children}</>;
}

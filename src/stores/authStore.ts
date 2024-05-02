import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
// import { User, getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleAuthProvider } from "../config";
// import { toast } from 'react-toastify'


interface User {
    displayName: string,
    photoUrl: string,
    email: string,
    getIdToken?: () => Promise<string>
}

type AuthState = {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    user: User | null;
    setUser: (user: User) => void;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => void;
    logout: () => void;
}

const useAuthStore = create<Partial<AuthState>>()(
    devtools(
        persist(
            (set) => ({
                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated: boolean) => {
                    set((state) => ({ ...state, isAuthenticated }));
                },
                // user: auth.currentUser,
                // setUser: (user) => set((state) => ({ ...state, user })),
                // login: async (email: string, password: string) => {
                //     const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                //     set((state) => ({
                //         ...state,
                //         user: userCredentials.user,
                //         isAuthenticated: true,
                //     }));
                // },
                // loginWithGoogle: async () => {
                //     const userCredentials = await signInWithPopup(auth, googleAuthProvider);
                //     const additionalInfo = getAdditionalUserInfo(userCredentials)
                //     console.log({ additionalInfo })
                //     set((state) => ({
                //         ...state,
                //         user: userCredentials.user,
                //         isAuthenticated: true,
                //     }));
                // },
                // logout: async () => {
                //     await signOut(auth).catch((error) => toast.error(error?.code || error.message || "Failed to signout"));
                //     set((state) => ({ ...state, user: null, isAuthenticated: false }))
                // },
            }),
            {
                name: 'auth-storage',
                getStorage: () => localStorage, // or sessionStorage
            }
        )
    )
);

export default useAuthStore;
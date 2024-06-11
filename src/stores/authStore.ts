import { ProfileType, User } from "@/types/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { useDepartmentState } from ".";
// import { User, getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { auth, googleAuthProvider } from "../config";
// import { toast } from 'react-toastify'


// interface User {
//     displayName: string,
//     photoUrl?: string,
//     email: string,
//     getIdToken?: () => Promise<string>
// }

type AuthState = {
    token: string | null,
    setToken: (token: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    user: User | null;
    setUser: (user: User) => void;
    profileType: ProfileType | '';
    setProfileType: (profileType: ProfileType | '') => void;
    login?: (email: string, password: string) => Promise<void>;
    loginWithGoogle?: () => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                token: localStorage.getItem('ensi-36o_token'),
                setToken: (token: string) => {
                    set((state) => ({ ...state, token }));
                },
                isAuthenticated: false,
                setIsAuthenticated: (isAuthenticated: boolean) => {
                    set((state) => ({ ...state, isAuthenticated }));
                },
                user: null,
                setUser: (user) => set((state) => ({ ...state, user })),
                profileType: '',
                setProfileType: (profileType) => set((state) => ({ ...state, profileType })),
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
                logout: async () => {
                    set((state) => ({ ...state, user: null, token: null, isAuthenticated: false }))
                    localStorage.removeItem('ensi-36o_token')
                    useDepartmentState.setState({ currentDepartment: null, departmentList: [] })
                },
            }),
            {
                name: 'auth-storage',
                getStorage: () => localStorage, // or sessionStorage
            }
        )
    )
);

export default useAuthStore;
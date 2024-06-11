
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "./forms/LoginForm"
import SignupForm from "./forms/SignupForm"
import useAuthStore from "@/stores/authStore";
import { Navigate } from "react-router-dom";


export default function AuthPage() {

    const { isAuthenticated, profileType } = useAuthStore();

    if (isAuthenticated && localStorage.getItem('ensi-36o_token') && !!profileType) {
        return <Navigate to='/' />;
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-secondary">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                    <SignupForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

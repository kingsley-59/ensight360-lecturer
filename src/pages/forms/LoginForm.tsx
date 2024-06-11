import { loginUser } from "@/api/user"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDepartmentState } from "@/stores"
import useAuthStore from "@/stores/authStore"
import { ProfileType } from "@/types/types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


interface LoginForm {
    email: string,
    password: string,
    profile: string,
}

export default function LoginForm() {
    const { register, setValue, watch, handleSubmit } = useForm<LoginForm>()
    const { setUser, setProfileType, setIsAuthenticated, setToken } = useAuthStore()
    const { refreshList } = useDepartmentState()
    const [loading, setLoading] = useState(false)

    async function formHandler(formData: LoginForm) {
        setLoading(true)
        const result = await loginUser({ ...formData }).finally(() => setLoading(false))
        console.log('login result', result)
        if (result && result?.accessToken && result.profile.__type) {
            localStorage.setItem('ensi-36o_token', result?.accessToken);
            setUser(result)
            setProfileType(result?.profile.__type.toLowerCase() as ProfileType)
            setIsAuthenticated(true)
            setToken(result?.accessToken)
            refreshList()
        }
    }

    const profile = watch('profile')
    useEffect(() => {
        console.log(profile);
    }, [profile])

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(formHandler)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register("email")}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Profile</Label>
                        <Select onValueChange={value => setValue("profile", value)} required>
                            <SelectTrigger className="_w-[180px]">
                                <SelectValue placeholder="Select profile" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="student">student</SelectItem>
                                <SelectItem value="lecturer">lecturer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a href="#" className="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </a>
                        </div>
                        <Input id="password" type="password" {...register("password")} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline">
                        Sign up
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}

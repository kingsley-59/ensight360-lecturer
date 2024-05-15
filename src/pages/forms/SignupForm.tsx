import { registerUser } from "@/api/user"
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
import { useToast } from "@/components/ui/use-toast"
import useAuthStore from "@/stores/authStore"
import { useState } from "react"
import { useForm } from "react-hook-form"


interface SignupForm {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export default function SignupForm() {
    const { toast } = useToast()
    const { register, handleSubmit } = useForm<SignupForm>();
    const { setUser, setIsAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(false)

    async function formHandler(formData: SignupForm) {
        console.log("submitted...")
        setLoading(true);
        const { email, firstname, lastname, confirmPassword, password } = formData;
        if (password !== confirmPassword) {
            toast({
                title: "Form Error",
                description: "Passwords do not match",
                variant: "destructive"
            })
            setLoading(false)
            return ;
        }
        const result = await registerUser({...formData}).finally(() => setLoading(false))
        console.log('signup result', result)
        if (result && result?.accessToken) {
            localStorage.setItem('token', result?.accessToken);
            setUser({
                displayName: `${firstname} ${lastname}`,
                email
            })
            setIsAuthenticated(true)
        }   
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(formHandler)} className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="Max" {...register('firstname')} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Robinson" {...register('lastname')} required />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            {...register('email')}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" {...register('password')} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" {...register('confirmPassword')} />
                    </div>
                    <Button type="submit" variant='default' className="w-full" disabled={loading}>
                        Create an account
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a href="#" className="underline">
                        Sign in
                    </a>
                </div>
            </CardContent>
        </Card>
    )
}

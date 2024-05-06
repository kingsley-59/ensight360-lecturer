import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";






export default function CreateDepartment() {
    const { register, handleSubmit } = useForm()

    function formHandler() {

    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-900">
            <div className="w-full max-w-[500px] mx-auto ">
                <Card className="mx-auto max-w-md" >
                    <CardHeader>
                        <CardTitle className="text-xl">Create Department</CardTitle>
                        <CardDescription>
                            Manage your own lecturers, students and courses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(formHandler)} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Input type="text" placeholder="e.g. Mechanical Engineering" {...register("name")} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Short</Label>
                                <Input type="text" placeholder="e.g. MEE" {...register("short")} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Faculty</Label>
                                <Input type="text" placeholder="e.g. Faculty of Engineering" {...register("faculty")} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Institution</Label>
                                <Input type="text" placeholder="e.g. Federal University of Technology, Owerri" {...register("institution")} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Institution Short</Label>
                                <Input type="text" placeholder="e.g. FUTO" {...register("InstitutionShort")} required />
                            </div>
                            <div className="flex gap-2">
                                <Checkbox {...register("makePublic")} />
                                <Label>Make department public</Label>
                            </div>
                            <Button type="submit" variant='default' className="w-full">
                                Create an account
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

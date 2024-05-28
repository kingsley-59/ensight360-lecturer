import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";


export default function CreateDepartmentDialog({ children }: { children: ReactNode }) {
    const { register, handleSubmit } = useForm()

    function formHandler() {

    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="text-xl">Create Department</DialogTitle>
                    <DialogDescription></DialogDescription>
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
                            <Checkbox id="makePublit" {...register("makePublic")} />
                            <Label htmlFor="makePublit">Make department public</Label>
                        </div>
                        <Button type="submit" variant='default' className="w-full">
                            Create an account
                        </Button>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

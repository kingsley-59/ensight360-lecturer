import CreateDepartmentDialog from "@/components/dialogs/CreateDepartmentDialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useDepartmentState } from "@/stores"
import useAuthStore from "@/stores/authStore"
import { Plus, Settings } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {

    return (
        <div className={`
            w-fit flex gap-0 items-center p-2
            border border-slate-900 rounded-md  bg-white
            text-xl font-bold italic font-sans shadow-md
            ${(variant == "light") ? 'text-slate-400' : 'text-slate-900'}
        `}>
            <span className="underline ">Ensight</span>
            <div className="_w-[40px] aspect-square rounded-full p-2 bg-white border-r-2 border-b-2 border-slate-900 flex items-center">
                <span className="text-xl font-bold">360</span>
            </div>
        </div>
    )
}

// const sampleDepartments = [
//     { name: "Mechanical Engineering", short: "MEE", faculty: "Faculty of Engineering", institution: 'FUTO' },
//     { name: "Civil Engineering", short: "CIE", faculty: "Faculty of Engineering", institution: 'FUTO' },
// ]

export default function ProfileHome() {
    const { user, logout } = useAuthStore()
    const { setCurrentDepartment, departmentList, refreshList } = useDepartmentState()
    const navigate = useNavigate()

    useEffect(() => {
        refreshList()
    }, [refreshList]);

    useEffect(() => console.log(departmentList), [departmentList])

    return (
        <div className="w-full _h-screen rounded-md relative">
            <div className="absolute top-0 left-0 w-full h-2/5 bg-slate-900">
                <img className="w-full h-full object-cover opacity-50" src="/images/class-ai-1.jpeg" alt="Beautiful background image" />
            </div>
            <div className="w-full h-full _overflow-y-auto relative">
                <div className="w-full p-3 sticky">
                    <Logo />
                </div>
                <div className="w-full max-w-screen-xl mx-auto p-5 md:p-10 lg:p-20 grid gap-3 ">
                    <div className="w-full md:flex justify-between bg-white rounded-lg p-3 ">
                        <div className="w-full">
                            <div className="text-xl font-semibold">Welcome back!</div>
                            <div className="text-2xl font-bold mb-5">{user?.displayName}</div>
                            <div className="text-base font-semibold">Here's your list of departments below:</div>
                        </div>
                        <div>
                            <Button variant={'outline'} className="px-3 py-2 " onClick={() => logout()}>Log out</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                        <Card className="w-full max-w-sm">
                            <CardHeader ></CardHeader>
                            <CardContent className="flex flex-col items-center cursor-pointer">
                                <CreateDepartmentDialog>
                                    <Plus size={95} className="text-blue-700" />
                                </CreateDepartmentDialog>
                                <div className="text-blue-500 text-base">Add department</div>
                            </CardContent>
                            {/* <CardFooter className="grid text-sm"></CardFooter> */}
                        </Card>

                        {departmentList.map(dept => (
                            <Card className="w-full max-w-sm " onClick={() => {
                                setCurrentDepartment(dept)
                                navigate('/dashboard')
                            }}>
                                <CardHeader >
                                    <CardDescription className="flex justify-between items-center cursor-pointer">
                                        {dept.name}
                                        <Settings size={30} />
                                    </CardDescription>
                                    <CardTitle className="text-xl">{dept.code}</CardTitle>
                                </CardHeader>
                                <CardContent >

                                </CardContent>
                                <CardFooter className="grid text-sm">
                                    <div>{dept.faculty}</div>
                                    <div>{dept.institution}</div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="w-full bg-white rounded-lg p-3 ">
                        <h2 className="text-2xl font-bold mb-6">Invitations</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Avatar>
                                        <AvatarImage alt="Avatar" src="/avatars/01.png" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">John Doe</h3>
                                        <p className="text-gray-500 dark:text-gray-400">Lecturer</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Invitation to Teach CS101</h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    John Doe has invited you to teach the CS101 course for the upcoming semester.
                                </p>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Reject</Button>
                                    <Button>Accept</Button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Avatar>
                                        <AvatarImage alt="Avatar" src="/avatars/02.png" />
                                        <AvatarFallback>SA</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">Sarah Adams</h3>
                                        <p className="text-gray-500 dark:text-gray-400">Department Head</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Invitation to Join Department</h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Sarah Adams has invited you to join the Computer Science department.
                                </p>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Reject</Button>
                                    <Button>Accept</Button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Avatar>
                                        <AvatarImage alt="Avatar" src="/avatars/03.png" />
                                        <AvatarFallback>EM</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium">Emily Martinez</h3>
                                        <p className="text-gray-500 dark:text-gray-400">Student</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Invitation to Enroll in CS101</h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Emily Martinez has invited you to enroll in the CS101 course.
                                </p>
                                <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Reject</Button>
                                    <Button>Accept</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/chRtO4Ein6e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"

// export default function Component() {
//     return (
//         <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
//             <h2 className="text-2xl font-bold mb-6">Invitations</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//                     <div className="p-6">
//                         <div className="flex items-center mb-4">
//                             <Avatar>
//                                 <AvatarImage alt="Avatar" src="/avatars/01.png" />
//                                 <AvatarFallback>JD</AvatarFallback>
//                             </Avatar>
//                             <div className="ml-4">
//                                 <h3 className="text-lg font-medium">John Doe</h3>
//                                 <p className="text-gray-500 dark:text-gray-400">Lecturer</p>
//                             </div>
//                         </div>
//                         <h4 className="text-xl font-bold mb-2">Invitation to Teach CS101</h4>
//                         <p className="text-gray-600 dark:text-gray-400 mb-4">
//                             John Doe has invited you to teach the CS101 course for the upcoming semester.
//                         </p>
//                         <div className="flex justify-end space-x-2">
//                             <Button variant="outline">Reject</Button>
//                             <Button>Accept</Button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//                     <div className="p-6">
//                         <div className="flex items-center mb-4">
//                             <Avatar>
//                                 <AvatarImage alt="Avatar" src="/avatars/02.png" />
//                                 <AvatarFallback>SA</AvatarFallback>
//                             </Avatar>
//                             <div className="ml-4">
//                                 <h3 className="text-lg font-medium">Sarah Adams</h3>
//                                 <p className="text-gray-500 dark:text-gray-400">Department Head</p>
//                             </div>
//                         </div>
//                         <h4 className="text-xl font-bold mb-2">Invitation to Join Department</h4>
//                         <p className="text-gray-600 dark:text-gray-400 mb-4">
//                             Sarah Adams has invited you to join the Computer Science department.
//                         </p>
//                         <div className="flex justify-end space-x-2">
//                             <Button variant="outline">Reject</Button>
//                             <Button>Accept</Button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//                     <div className="p-6">
//                         <div className="flex items-center mb-4">
//                             <Avatar>
//                                 <AvatarImage alt="Avatar" src="/avatars/03.png" />
//                                 <AvatarFallback>EM</AvatarFallback>
//                             </Avatar>
//                             <div className="ml-4">
//                                 <h3 className="text-lg font-medium">Emily Martinez</h3>
//                                 <p className="text-gray-500 dark:text-gray-400">Student</p>
//                             </div>
//                         </div>
//                         <h4 className="text-xl font-bold mb-2">Invitation to Enroll in CS101</h4>
//                         <p className="text-gray-600 dark:text-gray-400 mb-4">
//                             Emily Martinez has invited you to enroll in the CS101 course.
//                         </p>
//                         <div className="flex justify-end space-x-2">
//                             <Button variant="outline">Reject</Button>
//                             <Button>Accept</Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
import { Outlet } from "react-router-dom";



export default function AuthLayout() {
    return (
        <div className="w-full p-0 m-0 grid grid-cols-1 md:grid-cols-2 min-h-screen ">
            <div className="hidden md:block md:col-span-1 md:h-screen">
                <img className="w-full h-full object-cover" src="/images/class-ai-1.jpeg" alt="Beautiful background image" />
            </div>
            <div className="col-span-2 md:col-span-1">
                <Outlet />
            </div>
        </div>
    )
}

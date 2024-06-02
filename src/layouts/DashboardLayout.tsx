
import DeptSwitcher from '@/components/dashboard/DeptSwitcher';
import { MainNav } from '@/components/dashboard/MainNav';
import { Search } from '@/components/dashboard/Search';
import { UserNav } from '@/components/dashboard/UserNav';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <DeptSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

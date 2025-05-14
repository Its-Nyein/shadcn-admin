import { DashboardTopNav } from "@/components/dashboard-top-nav";
import { Header } from "@/components/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ToggleTheme } from "@/components/toggle-theme";

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]

export default function DashboardPage() {
  return (
    <div className="w-full">
      <Header>
        <DashboardTopNav links={topNav}/>
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ToggleTheme />
          <ProfileDropdown />
        </div>
      </Header>
      <div className="p-4 sm:gap-4">Hello DashboardPage</div>
    </div>
  );
}

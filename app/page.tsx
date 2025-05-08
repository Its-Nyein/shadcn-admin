import { Header } from "@/components/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ToggleTheme } from "@/components/toggle-theme";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ToggleTheme />
          <ProfileDropdown />
        </div>
      </Header>
      <div className="p-4 sm:gap-4">Hello DashboardPage</div>
    </div>
  );
}

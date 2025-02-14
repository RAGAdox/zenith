import { Button, Link } from "@/components";

interface NavbarProps {
  title: string;
  titleLink?: string;
  enableSearch?: boolean;
  userSlot: React.ReactNode;
}
export default function Navbar({
  title,
  titleLink,
  enableSearch = false,
  userSlot,
}: NavbarProps) {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="flex-1">
        <Button variant="navlink" className="text-xl" asChild>
          <Link href={titleLink ? titleLink : "/"}>{title}</Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className={`input input-bordered w-24 md:w-auto ${
            !enableSearch && "hidden"
          }`}
        />
        <Button variant="navlink" asChild>
          <Link href="/menu">Menu</Link>
        </Button>
        {/* <div className="dropdown dropdown-end [position:unset] md:relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-none md:rounded-box mt-3 md:mt-4 z-10 md:w-52 p-2 shadow w-full "
          >
            <li>
              <Button
                asChild
                variant="navlink"
                className="flex justify-between"
              >
                <Link href="/profile">
                  Profile
                  <span className="badge badge-primary end-0">New</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={"navlink"} className="justify-between">
                <Link href="/settings">Settings</Link>
              </Button>
            </li>
            <li>
              <Button asChild variant={"navlink"} className="justify-between">
                <Link href="/signout">Log out</Link>
              </Button>
            </li>
          </ul>
        </div> */}
        {userSlot}
      </div>
    </div>
  );
}

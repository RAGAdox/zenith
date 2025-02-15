import { Button, Link } from "@/components";

interface NavbarProps {
  title: string;
  titleLink?: string;
  enableSearch?: boolean;
  drawerToggle: React.ReactNode;
}
export default function Navbar({
  title,
  titleLink,
  enableSearch = false,
  drawerToggle,
}: NavbarProps) {
  return (
    <div className="navbar  bg-base-100 shadow-sm sticky top-0 z-10">
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
        {drawerToggle}
      </div>
    </div>
  );
}

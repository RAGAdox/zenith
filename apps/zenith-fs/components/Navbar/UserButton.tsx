import Button from "@/components/Button";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import SignOut from "./SignOut";

interface UserButtonProps {
  user: User;
}
async function UserButton({ user }: UserButtonProps) {
  const fullName: string = user.user_metadata?.full_name ?? user.email;

  const initials = fullName
    .split(" ")
    .map((name: string) => name[0])
    .join("")
    .toUpperCase();

  const avatarUrl = user.user_metadata?.avatar_url;

  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%"  rx="50"/>
      <text x="50%" y="50%" font-size="40" dy=".3em" fill="white" text-anchor="middle" font-family="Arial, sans-serif">
        ${initials}
      </text>
    </svg>
  `;

  const svgBase64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return (
    <div className={`dropdown dropdown-end`}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar avatar-placeholder"
      >
        <div
          className="bg-neutral text-neutral-content w-10 rounded-full"
          style={{
            backgroundImage: `url(${avatarUrl}),url(${svgBase64})`,
            backgroundSize: "cover", // Ensures the image covers the whole div
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents tiling
          }}
        ></div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <Button variant="nav-link" asChild>
          <Link href="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </Button>

        <Button variant="nav-link" className="justify-start">
          Settings
        </Button>

        <SignOut />
      </ul>
    </div>
  );
}

const UserButtonSkeleton = () => {
  return (
    <div className="skeleton btn btn-circle avatar shrink-0 rounded-full"></div>
  );
};

export { UserButtonSkeleton };
export default UserButton;

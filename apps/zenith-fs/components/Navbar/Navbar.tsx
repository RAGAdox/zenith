import Button from "@/components/Button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import CartButton from "./CartButton";
import UserButton from "./UserButton";

async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return data.user;
  }
  return null;
}

const Navbar = async () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-2">
      <div className="flex-1">
        <Button variant="nav-link" className="text-xl" asChild>
          <Link href="/">Zenith</Link>
        </Button>
      </div>
      <div className="flex flex-none gap-2">
        <CartButton />
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;

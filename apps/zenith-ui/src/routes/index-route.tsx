import { SignOutButton } from "@clerk/clerk-react";
import { Link } from "@zenith/components";

const IndexRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Greeings</h1>
      <Link href="/table">reserve table</Link>
      <SignOutButton>
        <Link>Sign Out</Link>
      </SignOutButton>
    </div>
  );
};

export default IndexRoute;

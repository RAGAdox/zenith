import { Link } from "@zenith/components";
import {} from "react-router";

const IndexRoute = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Greeings</h1>
      <Link href="/profile">Go to Profile</Link>
    </div>
  );
};

export default IndexRoute;

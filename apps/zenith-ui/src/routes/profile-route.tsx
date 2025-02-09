import { useLoaderData } from "react-router";

const ProfileRoute = () => {
  const data = useLoaderData();
  console.log("Data===>", data);
  return <div>Profile Route</div>;
};

export default ProfileRoute;

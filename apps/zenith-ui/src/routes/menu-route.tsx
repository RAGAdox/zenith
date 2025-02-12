import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { StatusCompoent } from "../components/StatusComponent";
import useFetch from "../hooks/useFetch";

const MenuRoute = () => {
  // TODO: Need to set isProtectedApi to false
  const { execute, isSuccess, data, isFetching, isLoaded, isError, error } =
    useFetch("menu", {
      method: "GET",
      isProtectedApi: true,
      executeOnMount: false,
    });

  useEffect(() => {
    execute(true);
  }, []);

  if (isSuccess) {
    return <>{JSON.stringify(data)}</>;
  }

  if (isError) {
    return <StatusCompoent header={error} />;
  }

  if (isFetching || !isLoaded) {
    return <Loader />;
  }
};

export default MenuRoute;

import { useEffect } from "react";
import { Loader } from "../components/Loader";
import useFetch from "../hooks/useFetch";

const MenuRoute = () => {
  // TODO: Need to set isProtectedApi to false
  const { store, isSuccess, data, isFetching, isLoaded, isError, error } =
    useFetch("menu", {
      method: "GET",
      isProtectedApi: true,
      // executeOnMount: true,
    });

  useEffect(() => {
    // execute(true);
  }, []);

  console.log("store", store);

  if (isSuccess) {
    return <>{JSON.stringify(data)}</>;
  }

  if (isError) {
    return (
      <>
        <h1 className="text-center">Oops! 😟</h1>
        <h4 className="text-center">
          {error ? error : "Somethings doesn't feel right"}
        </h4>
      </>
    );
  }

  if (isFetching || !isLoaded) {
    return <Loader />;
  }
};

export default MenuRoute;

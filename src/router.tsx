import React, { Suspense, useEffect, useState } from "react";
import Loader from "./components/loader";
import { getComponent, QueryParams } from "./routes";
import parseQueryString from "./utils/parseQueryString";

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const [hydrated, setHydrated] = useState(false);
  const [queryParams, setQueryParams] = useState<QueryParams>(
    parseQueryString(window.location.search)
  );

  function handleRouteChange() {
    setCurrentPath(window.location.pathname);
    const query = parseQueryString(window.location.search);
    setQueryParams(query);
  }

  useEffect(() => {
    window.addEventListener("popstate", handleRouteChange);
    setHydrated(true);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const Component = getComponent(currentPath);
  if (!hydrated) {
    return null;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Component query={queryParams} />
    </Suspense>
  );
};

export default Router;

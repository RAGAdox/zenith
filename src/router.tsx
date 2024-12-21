import React, { Suspense, useEffect, useState } from "react";

const AboutPage = React.lazy(() => import("./pages/about/page"));
const HomePage = React.lazy(() => import("./pages/index/page"));

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  function handleRouteChange() {
    setCurrentPath(window.location.pathname);
  }

  useEffect(() => {
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const Component = currentPath === "/" ? HomePage : AboutPage;
  return (
    <Suspense fallback={<div>Loading Component ..</div>}>
      <Component />
    </Suspense>
  );
};

export default Router;

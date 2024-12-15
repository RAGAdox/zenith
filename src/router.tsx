import React, { useEffect, useState } from "react";
import AboutPage from "./pages/about/page";
import HomePage from "./pages/index/page";

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
  return <Component />;
};

export default Router;

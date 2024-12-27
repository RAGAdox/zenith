import React, { Suspense, useEffect } from "react";
import { Loader } from "./components";

interface RouterProps {
  url: string;
}
const Router = ({ url = "/" }: RouterProps) => {
  const [currentHref, setCurrentHref] = React.useState<string>(url);

  function getComponent(url: string) {
    const Component =
      url === "" || url === "/"
        ? React.lazy(() => import("./pages/Home"))
        : React.lazy(() => import("./pages/About"));

    return Component;
  }
  useEffect(() => {
    const handlePopState = () => {
      setCurrentHref(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {React.createElement(getComponent(currentHref))}
    </Suspense>
  );
};

export default Router;

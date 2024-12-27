import React, { Suspense, useEffect } from "react";
import { Loader } from "./components";

interface RouterProps {
  url: string;
}
const Router = ({ url = "/" }: RouterProps) => {
  const [currentHref, setCurrentHref] = React.useState<string>(url);
  const [Component, setComponent] = React.useState<React.FC<any> | null>(null);
  const [props, setProps] = React.useState<any>(null);

  async function getComponent(url: string) {
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
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const loadComponent = async (href: string) => {
      const Component = await getComponent(href);

      setComponent(Component);
    };
    loadComponent(currentHref);
  }, [currentHref]);

  if (!Component) {
    return <Loader />;
  }
  return <Suspense fallback={<Loader />}>{<Component />}</Suspense>;
};

export default Router;

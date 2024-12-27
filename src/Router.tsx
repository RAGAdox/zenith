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
    const Component = React.lazy(
      () =>
        import(
          /* @vite-ignore */ `./pages${
            url === "" || url === "/" ? "/Home" : url
          }`
        )
    );

    let initProps = await (
      await import(
        /* @vite-ignore */ `./pages${url === "" || url === "/" ? "/Home" : url}`
      )
    ).getInitialProps();
    
    return { Component, initProps };
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
      const { Component, initProps } = await getComponent(href);
      setProps(initProps);
      setComponent(Component);
    };
    loadComponent(currentHref);
  }, [currentHref]);

  if (!Component) {
    return <Loader />;
  }
  return <Suspense fallback={<Loader />}>{<Component {...props} />}</Suspense>;
};

export default Router;

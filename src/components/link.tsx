import React from "react";

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  function handleNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const newRoute = event.currentTarget.getAttribute("href");
    if (newRoute && newRoute !== window.location.pathname) {
      window.history.pushState({}, "", newRoute);
      window.dispatchEvent(new Event("popstate"));
    }
  }
  return (
    <a href={href} onClick={handleNavigation}>
      {children}
    </a>
  );
};

export default Link;
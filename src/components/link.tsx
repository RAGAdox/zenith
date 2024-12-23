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
    const currentUrl = new URL(window.location.href);

    if (newRoute && newRoute !== currentUrl.pathname + currentUrl.search) {
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

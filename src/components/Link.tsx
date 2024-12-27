interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = ({ href, children, ...props }: LinkProps) => {
  function handleOnClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.history.pushState({}, "", href);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  }

  return (
    <a {...props} href={href} onClick={handleOnClick}>
      {children}
    </a>
  );
};

export default Link;

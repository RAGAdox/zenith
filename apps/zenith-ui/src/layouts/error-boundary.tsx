import { Link } from "@zenith/components";
import { useRouteError } from "react-router";

export default function ErrorBoundary() {
  // const navigate = useNavigate();

  const error: any = useRouteError();

  if (error.status === 404) {
    return (
      <>
        <h1 className="text-center">Oops! You’ve hit a wrong note 🎵</h1>
        <h4 className="text-center">
          Don’t worry — let’s help you find your way <Link href="/">back!</Link>
        </h4>
      </>
    );
  }

  if (error.status === 401) {
    return (
      <>
        <h1 className="text-center">Hold up! 🔐</h1>
        <h4 className="text-center">
          Please{" "}
          <Link href={`/sign-in?referer=${window.location.href}`}>Sign In</Link>{" "}
          to access this page.
        </h4>
      </>
    );
  }

  if (error.status === 403) {
    return (
      <>
        <h1 className="text-center">Access Denied 🚫</h1>
        <h4 className="text-center">
          It looks like you don’t have permission to view this page.
        </h4>
      </>
    );
  }

  if (error.status === 503) {
    return (
      <>
        <h1 className="text-center">Uh-oh! 🚧</h1>
        <h4 className="text-center">
          Our APIs are taking a break — we’ll be back soon!
        </h4>
        <p className="text-center">
          If the problem persists, please contact us at{" "}
          <a href="mailto:support@zenith.com" target="_blank">
            support@zenith.com
          </a>
          .
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center">Oops! 😟</h1>
      <h4 className="text-center">
        {error.message ? error.message : "Somethings doesn't feel right"}
      </h4>
    </>
  );
}

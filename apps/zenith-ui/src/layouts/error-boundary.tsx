import { useNavigate, useRouteError } from "react-router";
import { StatusCompoent } from "../components/StatusComponent";

export default function ErrorBoundary() {
  console.log("In error boundary");
  const navigate = useNavigate();

  const error: any = useRouteError();

  if (error.status === 404) {
    return (
      <StatusCompoent
        header="Oops! You’ve hit a wrong note 🎵"
        subHeader="Don’t worry — let’s help you find your way back!"
      />
    );
  }

  if (error.status === 401) {
    return (
      <StatusCompoent
        header="Hold up! 🔐"
        subHeader="Please sign in to access this page."
        actionButton={{
          buttonAction: () => {
            navigate(
              `/sign-in?referer=${encodeURIComponent(window.location.href)}`
            );
          },
          buttonText: "Sign In",
        }}
      />
    );
  }

  if (error.status === 403) {
    return (
      <StatusCompoent
        header="Access Denied 🚫"
        subHeader="It looks like you don’t have permission to view this page."
      />
    );
  }

  if (error.status === 503) {
    return (
      <StatusCompoent
        header="Uh-oh! 🚧"
        subHeader="Our APIs are taking a break — we’ll be back soon!"
      />
    );
  }

  return (
    <StatusCompoent
      header="Oops! 😟"
      subHeader={error.message ? error.message : undefined}
    />
  );
}

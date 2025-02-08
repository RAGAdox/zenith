import { Code, Flex, Heading, ScrollArea, Text, Theme } from "@radix-ui/themes";

import { ClerkProvider } from "@clerk/clerk-react";
import { useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { Background } from "./components/Background";
import { TopNavigation } from "./components/TopNavigation";
import { useIdle, useSSE } from "./hooks";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "apple-touch-icon-precomposed",
    href: "/apple-touch-icon-precomposed.png",
  },
  { rel: "apple-touch-icon", href: "/apple-touch-icon-precomposed.png" },
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Theme
            appearance="dark"
            accentColor="teal"
            radius="full"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Background />
            <AuthLoadedLayout>{children}</AuthLoadedLayout>
            <ScrollRestoration />
          </Theme>
        </ClerkProvider>
        <Scripts />
        <script src="/registerSW.js" />
      </body>
    </html>
  );
}

const AuthLoadedLayout = ({ children }: { children: React.ReactNode }) => {
  const { triggerSSE, closeSSE } = useSSE();
  const { idle } = useIdle();

  useEffect(() => {
    if (!idle) {
      triggerSSE();
    } else {
      closeSSE();
    }

    return () => {
      closeSSE();
    };
  }, [idle]);

  return (
    <>
      <TopNavigation />
      <Flex px="4" flexGrow="1" align="center" justify="center">
        {children}
      </Flex>
    </>
  );
};

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Flex direction="column" align="center" justify="center" gapY="4">
      <Flex direction="column" align="center" gapY="2">
        <Heading weight="bold">{message}</Heading>
        <Text>{details}</Text>
      </Flex>
      {stack && (
        <ScrollArea
          scrollbars="horizontal"
          style={{ width: "78vw", height: "fit-content" }}
          asChild
        >
          <Code>{stack}</Code>
        </ScrollArea>
      )}
    </Flex>
  );
}

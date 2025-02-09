import { ClerkProvider } from "@clerk/clerk-react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme
      accentColor="teal"
      radius="full"
      appearance="dark"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <Router />
        {/* <App /> */}
      </ClerkProvider>
    </Theme>
  </StrictMode>
);

import React, { Suspense, useEffect, useState } from "react";
import Loader from "./components/loader";
import { getComponent, QueryParams } from "./routes";

interface AppProps {
  initialRoute: string;
  initialQuery?: QueryParams;
}

const App: React.FC<AppProps> = ({ initialRoute = "/", initialQuery = {} }) => {
  const Component = getComponent(initialRoute);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or a loading spinner, or some placeholder content
  }

  return (
    <Suspense fallback={<Loader />}>
      <Component query={initialQuery} />
    </Suspense>
  );
};

export default App;

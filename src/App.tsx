import React, { Suspense } from "react";
const HomePage = React.lazy(() => import("./pages/index/page"));
const AboutPage = React.lazy(() => import("./pages/about/page"));

const App: React.FC<{ initialRoute: string }> = ({ initialRoute = "/" }) => {
  const Component = initialRoute === "/" ? HomePage : AboutPage;
  return (
    <Suspense fallback={<div>Loading Component ..</div>}>
      <Component />
    </Suspense>
  );
};

export default App;

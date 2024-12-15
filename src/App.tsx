import React from "react";
import AboutPage from "./pages/about/page";
import HomePage from "./pages/index/page";

const App: React.FC<{ initialRoute: string }> = ({ initialRoute = "/" }) => {
  const Component = initialRoute === "/" ? HomePage : AboutPage;
  return <Component />;
};

export default App;

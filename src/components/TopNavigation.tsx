import React from "react";
import Link from "./Link";

const TopNavigation: React.FC = () => {
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
  );
};

export default TopNavigation;

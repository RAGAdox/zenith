import React from "react";
import Link from "../../components/link";
import { RouteComponentProps } from "../../routes";

const HomePage: React.FC<RouteComponentProps> = ({ query }) => {
  return (
    <div>
      HomePage
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link href="/about">About</Link>
        <Link href="/new">Not Found</Link>
        <Link href="/?new=true">Home</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {JSON.stringify(query)}
      </div>
    </div>
  );
};

export default HomePage;

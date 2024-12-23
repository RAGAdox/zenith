import React from "react";
import Link from "../../components/link";
import { RouteComponentProps } from "../../routes";

const AboutPage: React.FC<RouteComponentProps> = ({ query }) => {
  return (
    <div>
      AboutPage
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>Lotus ipsum dolor sit amet, consectetur adipiscing elit.</div>
      <div>{JSON.stringify(query)}</div>
    </div>
  );
};

export default AboutPage;

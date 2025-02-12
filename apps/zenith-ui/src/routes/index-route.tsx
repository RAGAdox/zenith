import { Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router";

const IndexRoute = () => {
  return (
    <Flex direction="column">
      <Heading>IndexRoute</Heading>
      <Link to="/profile">Go To Profile</Link>
      <a href="http://localhost:3001/api/authorization">Authorize</a>
    </Flex>
  );
};

export default IndexRoute;

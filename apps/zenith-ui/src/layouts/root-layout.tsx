import { Flex } from "@radix-ui/themes";
import { ReactNode } from "react";
import { Outlet } from "react-router";
import Backgroud from "../components/Background/Background";
import { TopNavigation } from "../components/TopNavigation";

const RootLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Backgroud />
      <TopNavigation />
      <Flex px="4" flexGrow="1" align="center" justify="center">
        {children ? children : <Outlet />}
      </Flex>
    </>
  );
};

export default RootLayout;

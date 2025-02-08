import { Box } from "@radix-ui/themes";

import SVGComponent from "../../bg.svg";
const Backgroud = () => {
  return (
    <>
      {/* <Box
        minHeight="100svh"
        minWidth="100vw"
        position="fixed"
        style={{
          backgroundImage: 'url("/assets/bg.svg")',
        }}
      ></Box> */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100svh"
        overflow="hidden"
        style={{ zIndex: -1 }}
      >
        <SVGComponent
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            fill: "var(--accent-9)",
            opacity: 0.1,
          }}
        />
      </Box>

      <Box
        minHeight="100svh"
        minWidth="100vw"
        position="fixed"
        style={{
          backgroundImage:
            "linear-gradient(to bottom,var(--accent-2),transparent)",
          zIndex: "-2",
        }}
      />
    </>
  );
};

export default Backgroud;

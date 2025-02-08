import { Box } from "@radix-ui/themes";

import { useEffect, useState } from "react";
import SVGComponent from "../../bg.svg";
const Backgroud = () => {
  const [aspectRatio, setAspectRatio] = useState<number>();

  useEffect(() => {
    const handleResize = () => {
      const ratio = window.innerWidth / window.innerHeight;
      setAspectRatio(ratio);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
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
            fill: "var(--accent-9)",
            opacity: 0.1,
          }}
          {...(aspectRatio && aspectRatio > 1
            ? { width: "100%" }
            : { height: "100%" })}
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

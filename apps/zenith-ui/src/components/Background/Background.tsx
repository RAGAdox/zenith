import { Box } from "@radix-ui/themes";

const Background = () => {
  return (
    <>
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

export default Background;

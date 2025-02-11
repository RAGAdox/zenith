import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { ISpotifyTrackDetails } from "@zenith/types";
import { useRef } from "react";
import { AutoScrollX } from "../AutoScrollX";
const SongComponent = ({
  spotifyTrackDetails,
  variant = "full",
}: {
  spotifyTrackDetails: ISpotifyTrackDetails;
  variant?: "full" | "small";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (variant === "full") {
    return (
      <Card ref={containerRef} size="1" style={{ padding: "var(--space-4)" }}>
        <Box position="relative" width="300px" height="300px">
          <img
            src={spotifyTrackDetails.images[1].url}
            width="300px"
            height="300px"
          />
          <Box
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(15deg, rgba(0,0,0,0.7), transparent)",
            }}
          >
            <Flex
              p="4"
              justify="between"
              align="center"
              gapX="2"
              style={{
                position: "absolute",
                left: "0",
                bottom: "0",
                width: "100%",
              }}
            >
              <Box style={{ minWidth: "0" }}>
                <Heading size="4" truncate weight="bold" highContrast>
                  {spotifyTrackDetails.name}
                </Heading>
                <Text>{spotifyTrackDetails.artist}</Text>
              </Box>
              <Link
                href={spotifyTrackDetails.uri}
                style={{ color: "var(--gray-12)" }}
              >
                <FontAwesomeIcon icon={faSpotify} size="2x" />
              </Link>
            </Flex>
          </Box>
        </Box>
      </Card>
    );
  }
  return (
    <Card ref={containerRef} size="1" style={{ padding: "var(--space-4)" }}>
      <Flex
        position="relative"
        direction="row"
        align="stretch"
        gapX="2"
        width="300px"
      >
        <img
          src={spotifyTrackDetails.images[2].url}
          height="64px"
          width="64px"
        />
        <Flex direction="column" justify="between">
          <AutoScrollX
            maxWidth="230px"
            component={Heading}
            componentProps={{ wrap: "nowrap" }}
          >
            {spotifyTrackDetails.name}
          </AutoScrollX>
          <AutoScrollX
            maxWidth="230px"
            component={Text}
            componentProps={{ as: "p", wrap: "nowrap" }}
          >
            {spotifyTrackDetails.artist}
          </AutoScrollX>
        </Flex>
      </Flex>
    </Card>
  );
};

export default SongComponent;

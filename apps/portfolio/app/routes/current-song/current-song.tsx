import { useAutoAnimate } from "@formkit/auto-animate/react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@radix-ui/themes";
import { useRef } from "react";
import { SongComponent } from "../../components/SongComponent";
import { StatusComponent } from "../../components/StatusComponent";
import store from "../../store";

const CurrentSong = () => {
  const [animationParent] = useAutoAnimate();

  const { resourceValue: currentSong, errorCode } = store["CURRENT_SONG"]();

  const container = useRef<HTMLDivElement>(null);

  if (errorCode) {
    if (errorCode === "NOT_PLAYING") {
      return (
        <>
          <StatusComponent
            header="No tunes? No problem."
            subHeader="Be the DJ and start the party!"
            actionLink={{
              linkText: "Lets Go ",
              linkTo: "/share-target",
              linkIcon: <FontAwesomeIcon icon={faArrowRight} size="1x" />,
            }}
          />
        </>
      );
    }
    return (
      <StatusComponent
        header="Processing failure! 😳"
        subHeader="Let’s give that another shot, shall we?"
        actionButton={{
          buttonText: "Try Again",
          buttonAction: () => {},
        }}
      />
    );
  }

  return (
    <Box>
      {currentSong ? (
        <SongComponent spotifyTrackDetails={currentSong} />
      ) : (
        <StatusComponent
          header="Fetching fresh tunes…"
          subHeader="Let’s jam soon! 🎸"
        />
      )}
    </Box>
  );
};

export default CurrentSong;

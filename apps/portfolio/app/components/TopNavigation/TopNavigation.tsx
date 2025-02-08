import {
  faBars,
  faBookOpen,
  faCompactDisc,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Separator,
} from "@radix-ui/themes";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { NavLink as RouterLink } from "react-router";
import store from "../../store";
import "./TopNavigation.scss";

const TopNavigation = () => {
  const [animationParent] = useAutoAnimate();

  const [isOpen, setIsOpen] = useState(false);
  const { resourceValue: currentSong } = store["CURRENT_SONG"]();
  return (
    <Container
      flexGrow="0"
      p="2"
      position="fixed"
      style={{
        width: "100%",
        zIndex: 1,
      }}
    >
      <Card className="top-navigation">
        <Flex direction="row" position="relative" justify="between">
          <Box width="50%">
            <Button asChild variant="soft">
              <RouterLink to="/" viewTransition>
                Home
              </RouterLink>
            </Button>
          </Box>

          <Flex
            gapX="2"
            flexGrow="1"
            justify="end"
            display={{ initial: "none", xs: "flex" }}
            ref={animationParent}
          >
            {currentSong && (
              <Button variant="outline">
                <FontAwesomeIcon icon={faCompactDisc} spin />
                Now Playing
              </Button>
            )}
            <Button variant="soft" asChild>
              <RouterLink to="/menu" viewTransition>
                <FontAwesomeIcon icon={faBookOpen} />
                Menu
              </RouterLink>
            </Button>

            <SignedIn>
              <Button asChild variant="soft">
                <RouterLink to="/profile">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </RouterLink>
              </Button>
              <SignOutButton>
                <Button variant="soft">Sign out</Button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" withSignUp>
                <Button variant="soft">Sign in</Button>
              </SignInButton>
            </SignedOut>
          </Flex>

          <Box display={{ initial: "block", xs: "none" }}>
            <Button variant="soft" onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Box>
        </Flex>
        {isOpen ? (
          <Flex direction="column" align="start" gapY="2">
            <Separator my="3" size="4" />
            {currentSong && (
              <Button variant="ghost">
                <FontAwesomeIcon icon={faCompactDisc} spin />
                Now Playing
              </Button>
            )}
            <Button variant="ghost" asChild>
              <RouterLink to="/menu" viewTransition>
                <FontAwesomeIcon icon={faBookOpen} />
                Menu
              </RouterLink>
            </Button>
            <SignedIn>
              <Button asChild variant="ghost">
                <RouterLink to="/profile">
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </RouterLink>
              </Button>
              <SignOutButton>
                <Button variant="ghost">Sign out</Button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" withSignUp>
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
            </SignedOut>
          </Flex>
        ) : (
          <></>
        )}
      </Card>
    </Container>
  );
};

export default TopNavigation;

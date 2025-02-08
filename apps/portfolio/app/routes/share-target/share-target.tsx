import { useAuth } from "@clerk/clerk-react";
import { Button, Flex } from "@radix-ui/themes";
import { BACKEND_API } from "../../utils";

const ShareTarget = () => {
  const { getToken } = useAuth();

  const handleAuthorize = async () => {
    await fetch(
      BACKEND_API + "/authorization" + `?referer=${window.location.href}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    ).then(async (res) => {
      if (res.ok) {
        const { redirect_uri } = await res.json();
        window.location.href = redirect_uri;
      }
    });
  };

  return (
    <Flex>
      <Button onClick={handleAuthorize}>Click to authorize</Button>
    </Flex>
  );
};

export default ShareTarget;

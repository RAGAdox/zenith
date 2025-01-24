import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      console.log("Before install prompt event triggered");
      // Prevent the mini-infobar from appearing
      event.preventDefault();
      // Save the event for triggering install later
      setDeferredPrompt(event);
      setIsInstallable(true); // Show the install button
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    console.log("Install button clicked");
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User accepted the PWA installation");
    } else {
      console.log("User dismissed the PWA installation");
    }

    // Reset the deferred prompt variable
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <button className="border " onClick={handleInstallClick}>
      Install Application
    </button>
  );
};

export default InstallButton;

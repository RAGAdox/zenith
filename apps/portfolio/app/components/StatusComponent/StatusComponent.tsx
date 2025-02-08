import { Button, Flex, Heading, Link } from "@radix-ui/themes";
import { useEffect, useRef, type ReactNode } from "react";
import { Link as RouterLink } from "react-router";
interface ActionLinkProps {
  linkText: string;
  linkTo: string;
  linkIcon?: ReactNode;
}

interface ActionButtonProps {
  buttonText: string;
  buttonAction: (value?: any) => void;
}

type StatusComponentProps =
  | {
      header: string;
      subHeader?: string;
      actionLink: ActionLinkProps;
      actionButton?: never;
    }
  | {
      header: string;
      subHeader?: string;
      actionButton?: ActionButtonProps;
      actionLink?: never;
    }
  | {
      header: string;
      subHeader?: string;
      actionLink?: never;
      actionButton?: never;
    };

const StatusComponent = ({
  header,
  subHeader,
  actionButton,
  actionLink,
}: StatusComponentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   const ctx = gsap.context(() => {
  //     if (containerRef.current) {
  //       gsap.fromTo(
  //         containerRef.current.children,
  //         { opacity: 0, duration: 0.7 },
  //         { opacity: 1, duration: 0.5, stagger: 0.7 }
  //       );
  //     }
  //   });
  //   return () => {
  //     console.log("ctx.revert triggered===>");
  //     gsap.to(containerRef.current, {
  //       opacity: 0,
  //       duration: 0.1,
  //       onComplete: () => {
  //         console.log("completed");
  //       },
  //     });
  //     ctx.revert();
  //   };
  // }, []);

  useEffect(() => {
    console.log("Mounted", header);
    return () => console.log("unmounted", header);
  }, []);

  return (
    <div>
      <Flex ref={containerRef} direction="column" gap="4" align="center">
        <Heading as="h1">{header}</Heading>
        <Flex direction="column" gap="2" align="center">
          <Heading size="5" as="h2" wrap="nowrap">
            {subHeader}
          </Heading>
          {actionLink && (
            <Link asChild size="5">
              <RouterLink to={actionLink.linkTo}>
                {actionLink.linkText}
                {actionLink.linkIcon}
              </RouterLink>
            </Link>
          )}
          {actionButton && (
            <Button onClick={actionButton.buttonAction} variant="outline">
              {actionButton.buttonText}
            </Button>
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export default StatusComponent;

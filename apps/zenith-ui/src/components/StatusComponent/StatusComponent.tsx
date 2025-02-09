import { Button, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { type ReactNode } from "react";
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
  return (
    <div>
      <Flex direction="column" gap="4" align="center">
        <Heading as="h1" align="center">
          {header}
        </Heading>
        <Flex direction="column" gap="2" align="center">
          <Text align="center">{subHeader}</Text>
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

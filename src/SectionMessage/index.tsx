import { useState } from "react";

import { MdClear } from "react-icons/md";

import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { CountdownBar } from "@inubekit/countdownbar";
import { Icon } from "@inubekit/icon";

import { ISectionMessageAppearance } from "./props";
import { StyledSectionMessage } from "./styles";

interface ISectionMessage {
  icon: JSX.Element;
  title: string;
  description: string;
  appearance: ISectionMessageAppearance;
  duration: number;
  closeSectionMessage: () => void;
  isMessageResponsive: boolean;
}

const SectionMessage = (props: ISectionMessage) => {
  const {
    icon,
    title,
    description,
    appearance = "primary",
    duration,
    closeSectionMessage,
  } = props;

  const [isPaused, setIsPaused] = useState(false);
  const isMessageResponsive = useMediaQuery("(max-width: 565px)");

  const newDescription = description.substring(0, 240);

  const interceptionCloseSectionMessage = () => {
    try {
      closeSectionMessage && closeSectionMessage();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <StyledSectionMessage
      $appearance={appearance}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      $isMessageResponsive={isMessageResponsive}
    >
      <Stack justifyContent="space-between" padding="s200">
        <Stack
          gap="16px"
          alignItems={isMessageResponsive ? "center" : undefined}
        >
          <Stack alignItems="center" gap="16px">
            <Icon
              size="24px"
              spacing="wide"
              appearance={appearance}
              icon={icon}
            />
            <Stack direction="column" gap="6px">
              <Text size="large" textAlign="start">
                {title}
              </Text>
              {!isMessageResponsive && (
                <Text size="small" appearance="gray" textAlign="start">
                  {newDescription}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack alignItems={isMessageResponsive ? "center" : undefined}>
          <Icon
            size="16px"
            onClick={interceptionCloseSectionMessage}
            appearance={appearance}
            icon={<MdClear />}
          />
        </Stack>
      </Stack>
      {duration && (
        <CountdownBar
          paused={isPaused}
          appearance={appearance}
          duration={duration}
          onCountdown={interceptionCloseSectionMessage}
        />
      )}
    </StyledSectionMessage>
  );
};

export { SectionMessage };
export type { ISectionMessage };

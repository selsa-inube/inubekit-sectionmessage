import { useState } from "react";

import { MdClear } from "react-icons/md";

import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { CountdownBar } from "@inubekit/countdownbar";
import { Icon } from "@inubekit/icon";

import { ISectionMessageAppearance } from "./props";
import { inube } from "@inubekit/foundations";
import { StyledSectionMessage, StyledCountdownBarContainer } from "./styles";

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
    appearance,
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
      <Stack justifyContent="space-between" padding="16px">
        <Stack alignItems="center" gap="16px">
          <Icon
            size="24px"
            spacing="wide"
            appearance={
              inube.sectionMessage[appearance].countdownbar
                .appearance as keyof typeof inube.sectionMessage
            }
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
        <Icon
          size="16px"
          onClick={interceptionCloseSectionMessage}
          appearance="dark"
          icon={<MdClear />}
        />
      </Stack>
      {duration && (
        <StyledCountdownBarContainer>
          <CountdownBar
            paused={isPaused}
            appearance={
              inube.sectionMessage[appearance].countdownbar
                .appearance as keyof typeof inube.sectionMessage
            }
            duration={duration}
            onCountdown={interceptionCloseSectionMessage}
          />
        </StyledCountdownBarContainer>
      )}
    </StyledSectionMessage>
  );
};

export { SectionMessage };
export type { ISectionMessage };

import { useState } from "react";
import { MdClear } from "react-icons/md";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { ITextAppearance, Text } from "@inubekit/text";
import { CountdownBar } from "@inubekit/countdownbar";
import { IIconAppearance, Icon } from "@inubekit/icon";

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
  const theme: typeof inube = useContext(ThemeContext);
  const [isPaused, setIsPaused] = useState(false);
  const isMessageResponsive = useMediaQuery("(max-width: 565px)");

  const newDescription = description.substring(0, 240);

  const iconAppearance = (
    appearance: ISectionMessageAppearance,
  ): keyof typeof inube.icon => {
    return (
      (theme?.sectionMessage?.[appearance]?.icon
        .appearance as ISectionMessageAppearance) ||
      inube.sectionMessage[appearance]?.icon.appearance
    );
  };

  const countdownBarAppearance = (
    appearance: ISectionMessageAppearance,
  ): keyof typeof inube.countdownBar => {
    return (
      (theme?.sectionMessage?.[appearance]?.countdownbar
        .appearance as ISectionMessageAppearance) ||
      inube.sectionMessage[appearance]?.countdownbar.appearance
    );
  };

  const textAppearance =
    theme?.sectionMessage?.gray?.content.appearance ||
    inube.sectionMessage.gray?.content.appearance;

  const closeIconAppearance =
    theme?.sectionMessage?.dark?.icon.appearance ||
    inube.sectionMessage.dark?.icon.appearance;
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
            appearance={iconAppearance(appearance)}
            icon={icon}
          />
          <Stack direction="column" gap="6px">
            <Text size="large" textAlign="start">
              {title}
            </Text>
            {!isMessageResponsive && (
              <Text
                size="small"
                appearance={textAppearance as ITextAppearance}
                textAlign="start"
              >
                {newDescription}
              </Text>
            )}
          </Stack>
        </Stack>
        <Icon
          size="16px"
          onClick={interceptionCloseSectionMessage}
          appearance={closeIconAppearance as IIconAppearance}
          icon={<MdClear />}
        />
      </Stack>
      {duration && (
        <StyledCountdownBarContainer>
          <CountdownBar
            paused={isPaused}
            appearance={countdownBarAppearance(appearance)}
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

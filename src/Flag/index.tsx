import { useState } from "react";
import { MdClear } from "react-icons/md";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { ITextAppearance, Text } from "@inubekit/text";
import { CountdownBar, ICountdownBarAppearance } from "@inubekit/countdownbar";
import { IIconAppearance, Icon } from "@inubekit/icon";

import { IFlagAppearance } from "./props";
import { inube } from "@inubekit/foundations";
import {
  StyledFlag,
  StyledCountdownBarContainer,
  StyledCloseIconContainer,
} from "./styles";

interface IFlag {
  icon: JSX.Element;
  title: string;
  description: string;
  appearance: IFlagAppearance;
  duration: number;
  closeFlag: () => void;
  isMessageResponsive: boolean;
}

const Flag = (props: IFlag) => {
  const { icon, title, description, appearance, duration, closeFlag } = props;
  const theme: typeof inube = useContext(ThemeContext);
  const [isPaused, setIsPaused] = useState(false);
  const isMessageResponsive = useMediaQuery("(max-width: 565px)");

  const newDescription = description.substring(0, 240);

  const iconAppearance = (appearance: IFlagAppearance) => {
    return (theme?.sectionMessage?.[appearance]?.icon.appearance ||
      inube.sectionMessage[appearance]?.icon.appearance) as IIconAppearance;
  };

  const countdownBarAppearance = (appearance: IFlagAppearance) => {
    return (theme?.sectionMessage?.[appearance]?.countdownbar.appearance ||
      inube.sectionMessage[appearance]?.countdownbar
        .appearance) as ICountdownBarAppearance;
  };

  const textAppearance = (theme?.sectionMessage?.gray?.content.appearance ||
    inube.sectionMessage.gray?.content.appearance) as ITextAppearance;

  const closeIconAppearance = (theme?.sectionMessage?.dark?.icon.appearance ||
    inube.sectionMessage.dark?.icon.appearance) as IIconAppearance;

  const interceptionCloseFlag = () => {
    try {
      closeFlag && closeFlag();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return (
    <StyledFlag
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
              <Text size="small" appearance={textAppearance} textAlign="start">
                {newDescription}
              </Text>
            )}
          </Stack>
        </Stack>
        <StyledCloseIconContainer>
          <Icon
            size="16px"
            onClick={interceptionCloseFlag}
            appearance={closeIconAppearance}
            icon={<MdClear />}
          />
        </StyledCloseIconContainer>
      </Stack>
      {duration && (
        <StyledCountdownBarContainer>
          <CountdownBar
            paused={isPaused}
            appearance={countdownBarAppearance(appearance)}
            duration={duration}
            onCountdown={interceptionCloseFlag}
          />
        </StyledCountdownBarContainer>
      )}
    </StyledFlag>
  );
};

export { Flag };
export type { IFlag };

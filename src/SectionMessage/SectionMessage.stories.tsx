import { ThemeProvider } from "styled-components";
import { MdWarning } from "react-icons/md";

import { presente } from "@inubekit/foundations";
import { action } from "@storybook/addon-actions";

import { props, parameters } from "./props";
import { ISectionMessageProps, SectionMessage } from ".";

const story = {
  title: "feedback/SectionMessage",
  components: [SectionMessage],
  parameters,
  argTypes: {
    ...props,
  },
};

export const Default = (args: ISectionMessageProps) => (
  <SectionMessage {...args} />
);
const closeSectionMessage = () => {
  action("SectionMessage closed")();
};
Default.args = {
  title: "Title",
  description: "Description",
  icon: <MdWarning />,
  duration: 10000,
  closeSectionMessage: closeSectionMessage,
};

const theme = {
  ...presente,
};

export const Themed = (args: ISectionMessageProps) => (
  <ThemeProvider theme={theme}>
    <SectionMessage {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export default story;

import { ThemeProvider } from "styled-components";
import { MdWarning } from "react-icons/md";

import { presente } from "@inubekit/foundations";
import { action } from "@storybook/addon-actions";

import { props, parameters } from "./props";
import { ISectionMessage, SectionMessage } from ".";

const story = {
  title: "feedback/SectionMessage",
  components: [SectionMessage],
  parameters,
  argTypes: {
    ...props,
  },
};

const Default = (args: ISectionMessage) => <SectionMessage {...args} />;
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

const Themed = (args: ISectionMessage) => (
  <ThemeProvider theme={theme}>
    <SectionMessage {...args} />
  </ThemeProvider>
);

Themed.args = {
  ...Default.args,
};

export { Default, Themed };
export default story;

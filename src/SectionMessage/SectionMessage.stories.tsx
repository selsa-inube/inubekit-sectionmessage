import { MdWarning } from "react-icons/md";
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
  appearance: "primary",
  icon: <MdWarning />,
  duration: 10000,
  closeSectionMessage: closeSectionMessage,
};

export { Default };
export default story;

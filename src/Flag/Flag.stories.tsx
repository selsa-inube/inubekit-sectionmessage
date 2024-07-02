import { MdWarning } from "react-icons/md";
import { action } from "@storybook/addon-actions";

import { props, parameters } from "./props";
import { IFlag, Flag } from ".";

const story = {
  title: "feedback/Flag",
  components: [Flag],
  parameters,
  argTypes: {
    ...props,
  },
};

const Default = (args: IFlag) => <Flag {...args} />;
const closeFlag = () => {
  action("Flag closed")();
};
Default.args = {
  title: "Title",
  description: "Description",
  appearance: "primary",
  icon: <MdWarning />,
  duration: 10000,
  closeFlag: closeFlag,
};

export { Default };
export default story;

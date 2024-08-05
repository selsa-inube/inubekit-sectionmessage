import { MdWarning } from "react-icons/md";
import { action } from "@storybook/addon-actions";
import { Button } from "@inubekit/button";
import { FlagPortal } from ".";
import { FlagProvider } from "../../providers/FlagsProvider";
import { useFlag } from "../../hooks/useFlag";

const story = {
  title: "feedback/FlagPortal",
  components: [FlagPortal],
  decorators: [
    (Story: React.FC) => (
      <FlagProvider>
        <Story />
      </FlagProvider>
    ),
  ],
};

const Default: React.FC = () => {
  const { addMessage } = useFlag();

  const handleClick = () => {
    addMessage({
      icon: <MdWarning />,
      title: "Title",
      description: "Description",
      appearance: "primary",
      duration: 10000,
      closeFlag: action("Flag closed"),
    });
  };

  return (
    <>
      <Button onClick={handleClick}>Show Message</Button>
      <FlagPortal />
    </>
  );
};

export { Default };
export default story;

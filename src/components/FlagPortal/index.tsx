import ReactDOM from "react-dom";
import { StyledContainer } from "./styles";
import { Flag } from "../Flag";
import { useFlag } from "../../hooks/useFlag";

const FlagPortal = () => {
  const { flags, removeMessage } = useFlag();

  return ReactDOM.createPortal(
    <StyledContainer>
      {flags.map((msg) => (
        <Flag
          key={msg.id}
          icon={msg.icon}
          title={msg.title}
          description={msg.description}
          appearance={msg.appearance}
          duration={msg.duration}
          closeFlag={() => removeMessage(msg.id!)}
          isMessageResponsive={false}
        />
      ))}
    </StyledContainer>,
    document.body,
  );
};

export { FlagPortal };

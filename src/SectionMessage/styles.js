import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledSectionMessage = styled.div`
  background-color: ${({ $appearance }) =>
    inube.sectionMessage[$appearance].background.color};
  width: ${($isMessageResponsive) => ($isMessageResponsive ? "auto" : "400px")};
  height: auto;
  border-radius: 4px;
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export { StyledSectionMessage };

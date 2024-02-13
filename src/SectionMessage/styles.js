import styled from "styled-components";

import { inube } from "@inubekit/foundations";

export const StyledSectionMessage = styled.div`
  background-color: ${({ theme, $appearance }) => {
    return (
      theme?.color?.surface?.[$appearance]?.clear ||
      inube.color.surface[$appearance].clear
    );
  }};
  width: ${($isMessageResponsive) => ($isMessageResponsive ? "auto" : "400px")};
  height: auto;
  border-radius: 4px;
  box-shadow:
    0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  overflow-wrap: anywhere;
`;

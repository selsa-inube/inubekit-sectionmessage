const appearances = [
  "primary",
  "danger",
  "warning",
  "success",
  "help",
  "light",
  "gray",
  "dark",
] as const;

type IFlagAppearance = (typeof appearances)[number];

const parameters = {
  docs: {
    description: {
      component:
        "Flag communicate important information in a section of a screen. Flags are persistent, but can disappear when the user takes action or resolves the situation.",
    },
  },
};

const props = {
  icon: {
    control: { type: "element" },
    description: "The icon to be displayed in the Flag.",
  },
  title: {
    control: { type: "text" },
    description: "The title text of the Flag.",
  },
  description: {
    control: { type: "text", maxLength: 240 },
    description:
      "The description text of the flag. If the description is too long, it will be truncated to the MAX_DESCRIPTION_LENGTH.",
  },
  appearance: {
    options: appearances,
    control: { type: "select" },
    description: "The appearance style of the Flag and related components.",
  },
  duration: {
    control: { type: "number" },
    description:
      "The duration for which the countdown bar runs. If provided, a countdown bar will appear.",
    table: {
      type: { summary: "number (milliseconds)" },
    },
  },
  closeFlag: {
    control: { type: "action" },
    description:
      "Callback function that is called when the Flag needs to be closed, either by user action or after the countdown.",
  },
};

export { parameters, props };
export type { IFlagAppearance };

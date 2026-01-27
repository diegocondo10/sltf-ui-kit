import type { Preview } from "@storybook/nextjs-vite";
import React from "react";

// Import global styles
import "../src/app/globals.scss";

// Import providers
import { Providers } from "../src/app/providers";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    layout: "padded",
    docs: {
      toc: true,
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#f3f4f6" },
        { name: "dark", value: "#1f2937" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;

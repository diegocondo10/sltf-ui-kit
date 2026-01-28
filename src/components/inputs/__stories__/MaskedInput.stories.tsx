import type { Meta, StoryObj } from "@storybook/react";
import { MaskedInput } from "../MaskedInput";

/**
 * MaskedInput applies formatting masks to text input.
 * Uses `#` as a digit placeholder in the mask pattern.
 *
 * ## Usage
 * ```tsx
 * <MaskedInput
 *   mask="(###) ###-####"
 *   placeholder="(555) 555-5555"
 *   onChange={(e) => setValue(e.target.value)}
 * />
 * ```
 */
const meta: Meta<typeof MaskedInput> = {
  title: "Inputs/MaskedInput",
  component: MaskedInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Visual state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    mask: {
      control: "text",
      description: "Mask pattern using # as digit placeholder",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const Default: Story = {
  args: {
    mask: "(###) ###-####",
    placeholder: "(555) 555-5555",
    size: "md",
    state: "default",
  },
};

export const Phone: Story = {
  args: {
    mask: "(###) ###-####",
    placeholder: "(555) 555-5555",
  },
};

export const SSN: Story = {
  args: {
    mask: "###-##-####",
    placeholder: "123-45-6789",
  },
};

export const CreditCard: Story = {
  args: {
    mask: "#### #### #### ####",
    placeholder: "1234 5678 9012 3456",
  },
};

export const Date: Story = {
  args: {
    mask: "##/##/####",
    placeholder: "MM/DD/YYYY",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <MaskedInput mask='(###) ###-####' placeholder='Small' size='sm' />
      <MaskedInput mask='(###) ###-####' placeholder='Medium' size='md' />
      <MaskedInput mask='(###) ###-####' placeholder='Large' size='lg' />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <MaskedInput mask='(###) ###-####' placeholder='Default' state='default' />
      <MaskedInput mask='(###) ###-####' placeholder='Error' state='error' />
      <MaskedInput mask='(###) ###-####' placeholder='Success' state='success' />
      <MaskedInput mask='(###) ###-####' placeholder='Warning' state='warning' />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    mask: "(###) ###-####",
    placeholder: "Disabled input",
    disabled: true,
  },
};

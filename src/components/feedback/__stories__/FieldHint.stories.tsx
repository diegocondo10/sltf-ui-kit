import type { Meta, StoryObj } from "@storybook/react";
import { FieldHint } from "../FieldHint";

/**
 * FieldHint displays helper text for form fields with consistent styling.
 *
 * ## Features
 * - Consistent styling across the application
 * - Multiple size variants
 * - Supports id for aria-describedby accessibility
 *
 * ## Usage
 * ```tsx
 * // Basic usage
 * <FieldHint>We'll never share your email</FieldHint>
 *
 * // With size variant
 * <FieldHint size="sm">Optional field</FieldHint>
 *
 * // With accessibility
 * <FieldHint id="email-hint">Enter your work email</FieldHint>
 * <input aria-describedby="email-hint" />
 * ```
 */
const meta: Meta<typeof FieldHint> = {
  title: "Feedback/FieldHint",
  component: FieldHint,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    children: {
      control: "text",
      description: "Hint text content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldHint>;

export const Default: Story = {
  args: {
    children: "We'll never share your email with anyone",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-1 text-sm text-gray-600'>Small</p>
        <FieldHint size='sm'>This is a small hint text</FieldHint>
      </div>
      <div>
        <p className='mb-1 text-sm text-gray-600'>Medium (default)</p>
        <FieldHint size='md'>This is a medium hint text</FieldHint>
      </div>
      <div>
        <p className='mb-1 text-sm text-gray-600'>Large</p>
        <FieldHint size='lg'>This is a large hint text</FieldHint>
      </div>
    </div>
  ),
};

export const WithAccessibility: Story = {
  render: () => (
    <div className='flex flex-col gap-2'>
      <label htmlFor='accessible-input' className='text-sm font-medium'>
        Password
      </label>
      <input
        id='accessible-input'
        type='password'
        className='border rounded px-3 py-2 w-full'
        aria-describedby='password-hint'
      />
      <FieldHint id='password-hint'>
        Password must be at least 8 characters with one number and one special character
      </FieldHint>
    </div>
  ),
};

export const CommonUseCases: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <div>
        <label className='block text-sm font-medium mb-1'>Username</label>
        <input className='border rounded px-3 py-2 w-full' placeholder='johndoe' />
        <div className='mt-1'>
          <FieldHint>Choose a unique username for your account</FieldHint>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Phone (optional)</label>
        <input className='border rounded px-3 py-2 w-full' placeholder='+1 (555) 000-0000' />
        <div className='mt-1'>
          <FieldHint>Used only for account recovery</FieldHint>
        </div>
      </div>

      <div>
        <label className='block text-sm font-medium mb-1'>Bio</label>
        <textarea className='border rounded px-3 py-2 w-full' rows={3} />
        <div className='mt-1'>
          <FieldHint>Tell us about yourself in 160 characters or fewer</FieldHint>
        </div>
      </div>
    </div>
  ),
};

export const Empty: Story = {
  args: {
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "When children is undefined/null, nothing is rendered",
      },
    },
  },
};

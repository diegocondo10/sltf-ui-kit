import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from "../FileUploader";

/**
 * FileUploader allows drag-and-drop or click-to-browse file uploads.
 * Supports single/multiple selection with file type filtering.
 *
 * ## Usage
 * ```tsx
 * <FileUploader
 *   accept="image/*"
 *   multiple
 *   maxFiles={5}
 *   onChange={(files) => console.log(files)}
 * />
 * ```
 */
const meta: Meta<typeof FileUploader> = {
  title: "Inputs/FileUploader",
  component: FileUploader,
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
    multiple: {
      control: "boolean",
      description: "Allow multiple files",
    },
    accept: {
      control: "text",
      description: "Accepted file types",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  args: {
    accept: "image/*",
    size: "md",
    state: "default",
  },
};

export const Single: Story = {
  args: {
    multiple: false,
    accept: "image/*",
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    accept: "image/*,application/pdf",
    maxFiles: 5,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <FileUploader accept='image/*' size='sm' />
      <FileUploader accept='image/*' size='md' />
      <FileUploader accept='image/*' size='lg' />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <FileUploader accept='image/*' state='default' />
      <FileUploader accept='image/*' state='error' />
      <FileUploader accept='image/*' state='success' />
      <FileUploader accept='image/*' state='warning' />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    accept: "image/*",
    disabled: true,
  },
};

export const DocumentsOnly: Story = {
  args: {
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
  },
};

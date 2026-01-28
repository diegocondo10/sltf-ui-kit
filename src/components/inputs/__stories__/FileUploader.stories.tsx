import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader, type FileError } from "../FileUploader";

/**
 * FileUploader allows drag-and-drop or click-to-browse file uploads.
 * Supports single/multiple selection with file type and size validation.
 * Includes optional image previews and file removal functionality.
 *
 * ## Features
 * - Drag and drop support with visual feedback
 * - Click to browse files
 * - File type validation via `accept` prop
 * - File size validation via `maxSize` prop
 * - Maximum file count via `maxFiles` prop
 * - Image previews via `showPreview` prop
 * - File removal with `onRemove` callback
 * - Error handling via `onError` callback
 * - Full keyboard accessibility
 *
 * ## Usage
 * ```tsx
 * <FileUploader
 *   accept="image/*"
 *   multiple
 *   maxFiles={5}
 *   maxSize={5 * 1024 * 1024}
 *   showPreview
 *   onChange={(files) => console.log(files)}
 *   onError={(errors) => console.log(errors)}
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
    showPreview: {
      control: "boolean",
      description: "Show image previews",
    },
    showFileList: {
      control: "boolean",
      description: "Show file list below drop zone",
    },
    accept: {
      control: "text",
      description: "Accepted file types (MIME or extensions)",
    },
    maxFiles: {
      control: "number",
      description: "Maximum number of files",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in bytes",
    },
    dropText: {
      control: "text",
      description: "Custom drop zone text",
    },
    disabledText: {
      control: "text",
      description: "Custom disabled text",
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

export const WithPreview: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    showPreview: true,
  },
};

export const WithSizeLimit: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    maxSize: 1024 * 1024, // 1MB
    onError: (errors: FileError[]) => {
      console.log("Validation errors:", errors);
      alert(errors.map((e) => e.message).join("\n"));
    },
  },
};

export const WithAllValidation: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    maxSize: 2 * 1024 * 1024, // 2MB
    showPreview: true,
    onError: (errors: FileError[]) => {
      console.log("Validation errors:", errors);
    },
  },
};

export const CustomText: Story = {
  args: {
    accept: "image/*",
    dropText: "Drag your images here",
    disabledText: "Image upload is currently disabled",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Small</p>
        <FileUploader accept='image/*' size='sm' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Medium (default)</p>
        <FileUploader accept='image/*' size='md' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Large</p>
        <FileUploader accept='image/*' size='lg' />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Default</p>
        <FileUploader accept='image/*' state='default' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Error</p>
        <FileUploader accept='image/*' state='error' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Success</p>
        <FileUploader accept='image/*' state='success' />
      </div>
      <div>
        <p className='mb-2 text-sm text-gray-500'>Warning</p>
        <FileUploader accept='image/*' state='warning' />
      </div>
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
    maxSize: 10 * 1024 * 1024, // 10MB
  },
};

export const ImagesWithPreview: Story = {
  args: {
    accept: "image/png,image/jpeg,image/gif,image/webp",
    multiple: true,
    maxFiles: 6,
    maxSize: 5 * 1024 * 1024, // 5MB per file
    showPreview: true,
  },
};

export const HiddenFileList: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    showFileList: false,
    onChange: (files) => {
      console.log("Files selected:", files);
    },
  },
};

export const WithRemoveCallback: Story = {
  args: {
    accept: "image/*",
    multiple: true,
    maxFiles: 5,
    showPreview: true,
    onRemove: (file, index) => {
      console.log(`Removed file "${file.name}" at index ${index}`);
    },
  },
};

export const FullFeatured: Story = {
  args: {
    accept: "image/*,application/pdf,.doc,.docx",
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    showPreview: true,
    dropText: "Drop files here or click to browse",
    onChange: (files) => {
      console.log("Files changed:", files);
    },
    onRemove: (file, index) => {
      console.log(`Removed: ${file.name}`);
    },
    onError: (errors) => {
      console.log("Errors:", errors);
    },
  },
};

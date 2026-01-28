import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { FileUploaderField } from "../FileUploaderField";

/**
 * FileUploaderField integrates FileUploader with React Hook Form.
 * Provides automatic validation handling and error display.
 *
 * ## Usage
 * ```tsx
 * <FileUploaderField
 *   name="avatar"
 *   control={control}
 *   label="Profile Picture"
 *   accept="image/*"
 *   rules={{ required: "Please upload an image" }}
 * />
 * ```
 */
const meta: Meta<typeof FileUploaderField> = {
  title: "Fields/FileUploaderField",
  component: FileUploaderField,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "floating"],
      description: "Container variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    required: {
      control: "boolean",
      description: "Shows required indicator",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple files",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploaderField>;

const SingleExample = () => {
  const { control } = useForm({ defaultValues: { file: null } });
  return <FileUploaderField name='file' control={control} label='Upload File' accept='image/*' />;
};

export const Single: Story = {
  render: () => <SingleExample />,
};

const MultipleExample = () => {
  const { control } = useForm({ defaultValues: { files: [] } });
  return (
    <FileUploaderField
      name='files'
      control={control}
      label='Upload Files'
      accept='image/*,application/pdf'
      multiple
      maxFiles={5}
      hint='Max 5 files'
    />
  );
};

export const Multiple: Story = {
  render: () => <MultipleExample />,
};

const FloatingLabelExample = () => {
  const { control } = useForm({ defaultValues: { document: null } });
  return (
    <FileUploaderField
      name='document'
      control={control}
      label='Document'
      accept='.pdf,.doc,.docx'
      variant='floating'
    />
  );
};

export const FloatingLabel: Story = {
  render: () => <FloatingLabelExample />,
};

const WithValidationExample = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { avatar: null },
    mode: "onBlur",
  });
  return (
    <form onSubmit={handleSubmit(() => {})} className='flex flex-col gap-4'>
      <FileUploaderField
        name='avatar'
        control={control}
        label='Profile Picture'
        accept='image/*'
        required
        rules={{
          required: "Please upload a profile picture",
        }}
      />
      <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
        Submit
      </button>
    </form>
  );
};

export const WithValidation: Story = {
  render: () => <WithValidationExample />,
};

const DisabledExample = () => {
  const { control } = useForm({ defaultValues: { file: null } });
  return (
    <FileUploaderField
      name='file'
      control={control}
      label='Upload File'
      accept='image/*'
      disabled
    />
  );
};

export const Disabled: Story = {
  render: () => <DisabledExample />,
};

const SizesExample = () => {
  const { control } = useForm({ defaultValues: { sm: null, md: null, lg: null } });
  return (
    <div className='flex flex-col gap-4'>
      <FileUploaderField name='sm' control={control} label='Small' size='sm' />
      <FileUploaderField name='md' control={control} label='Medium' size='md' />
      <FileUploaderField name='lg' control={control} label='Large' size='lg' />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesExample />,
};

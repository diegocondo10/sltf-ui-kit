import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { MaskedInputField } from "../MaskedInputField";

/**
 * MaskedInputField integrates MaskedInput with React Hook Form.
 * Provides automatic validation handling and error display.
 *
 * ## Usage
 * ```tsx
 * <MaskedInputField
 *   name="phone"
 *   control={control}
 *   label="Phone Number"
 *   mask="(###) ###-####"
 *   rules={{ required: "Phone is required" }}
 * />
 * ```
 */
const meta: Meta<typeof MaskedInputField> = {
  title: "Fields/MaskedInputField",
  component: MaskedInputField,
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
  },
};

export default meta;
type Story = StoryObj<typeof MaskedInputField>;

const PhoneExample = () => {
  const { control } = useForm({ defaultValues: { phone: "" } });
  return (
    <MaskedInputField
      name='phone'
      control={control}
      label='Phone Number'
      mask='(###) ###-####'
      placeholder='(555) 555-5555'
    />
  );
};

export const Phone: Story = {
  render: () => <PhoneExample />,
};

const SSNExample = () => {
  const { control } = useForm({ defaultValues: { ssn: "" } });
  return (
    <MaskedInputField
      name='ssn'
      control={control}
      label='Social Security Number'
      mask='###-##-####'
      placeholder='123-45-6789'
    />
  );
};

export const SSN: Story = {
  render: () => <SSNExample />,
};

const FloatingLabelExample = () => {
  const { control } = useForm({ defaultValues: { phone: "" } });
  return (
    <MaskedInputField
      name='phone'
      control={control}
      label='Phone Number'
      mask='(###) ###-####'
      placeholder='(555) 555-5555'
      variant='floating'
    />
  );
};

export const FloatingLabel: Story = {
  render: () => <FloatingLabelExample />,
};

const WithValidationExample = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { phone: "" },
    mode: "onBlur",
  });
  return (
    <form onSubmit={handleSubmit(() => {})} className='flex flex-col gap-4'>
      <MaskedInputField
        name='phone'
        control={control}
        label='Phone Number'
        mask='(###) ###-####'
        hint='Enter your phone number'
        required
        rules={{
          required: "Phone number is required",
          minLength: {
            value: 14,
            message: "Please enter a complete phone number",
          },
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
  const { control } = useForm({ defaultValues: { phone: "(555) 123-4567" } });
  return (
    <MaskedInputField
      name='phone'
      control={control}
      label='Phone Number'
      mask='(###) ###-####'
      disabled
    />
  );
};

export const Disabled: Story = {
  render: () => <DisabledExample />,
};

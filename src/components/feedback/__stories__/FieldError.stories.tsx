import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { FieldError } from "../FieldError";

/**
 * FieldError displays error messages for form fields with consistent styling.
 *
 * ## Features
 * - Supports simple string errors
 * - Supports React Hook Form FieldError objects
 * - Integration with @hookform/error-message
 * - Multiple size variants
 * - Accessibility with role="alert" and aria-live
 *
 * ## Usage
 * ```tsx
 * // Simple string error
 * <FieldError error="This field is required" />
 *
 * // With RHF FieldError object
 * <FieldError error={fieldState.error} />
 *
 * // With RHF errors object
 * <FieldError name="email" errors={formState.errors} />
 * ```
 */
const meta: Meta<typeof FieldError> = {
  title: "Feedback/FieldError",
  component: FieldError,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    error: {
      control: "text",
      description: "Error message or FieldError object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FieldError>;

export const Default: Story = {
  args: {
    error: "This field is required",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='mb-1 text-sm text-gray-500'>Small</p>
        <FieldError error='Small error message' size='sm' />
      </div>
      <div>
        <p className='mb-1 text-sm text-gray-500'>Medium (default)</p>
        <FieldError error='Medium error message' size='md' />
      </div>
      <div>
        <p className='mb-1 text-sm text-gray-500'>Large</p>
        <FieldError error='Large error message' size='lg' />
      </div>
    </div>
  ),
};

export const WithFieldErrorObject: Story = {
  args: {
    error: {
      type: "required",
      message: "Email is required",
    },
  },
};

export const WithReactHookForm: Story = {
  render: function WithRHF() {
    const {
      register,
      formState: { errors },
      trigger,
    } = useForm({
      mode: "onChange",
      defaultValues: { email: "" },
    });

    return (
      <div className='flex flex-col gap-4'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='border rounded px-3 py-2 w-full'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            onBlur={() => trigger("email")}
          />
          <div className='mt-1'>
            <FieldError name='email' errors={errors} />
          </div>
        </div>
        <p className='text-sm text-gray-500'>
          Type an invalid email and blur to see the error
        </p>
      </div>
    );
  },
};

export const CustomRender: Story = {
  args: {
    error: "Custom styled error",
    render: (message: string) => (
      <span className='flex items-center gap-1 text-red-600'>
        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
            clipRule='evenodd'
          />
        </svg>
        {message}
      </span>
    ),
  },
};

export const NoError: Story = {
  args: {
    error: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "When error is undefined/null, nothing is rendered",
      },
    },
  },
};

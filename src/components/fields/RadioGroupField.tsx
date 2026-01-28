"use client";

import React, { useId } from "react";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { RadioGroup, type RadioGroupProps } from "../inputs/RadioGroup";
import { FieldError } from "../feedback/FieldError";
import { FieldHint } from "../feedback/FieldHint";
import type { ComponentSize, RadioOption } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for RadioGroupField component
 */
export interface RadioGroupFieldProps<
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<RadioGroupProps<T>, "name" | "value" | "onChange" | "state"> {
  /**
   * Label text for the field
   */
  label?: string;

  /**
   * Helper text displayed below the radio group
   */
  hint?: string;

  /**
   * Size variant
   * @default "md"
   */
  size?: ComponentSize;
}

/**
 * RadioGroupField - Radio group with React Hook Form integration
 *
 * @description
 * Combines RadioGroup with useController for form validation.
 * Automatically handles value state and error display.
 *
 * @example
 * ```tsx
 * <RadioGroupField
 *   name="subscription"
 *   control={control}
 *   label="Select plan"
 *   options={[
 *     { label: "Basic", value: "basic" },
 *     { label: "Pro", value: "pro" },
 *     { label: "Enterprise", value: "enterprise" },
 *   ]}
 *   rules={{ required: "Please select a plan" }}
 * />
 * ```
 */
export function RadioGroupField<
  T = string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  size = "md",
  // RadioGroup props
  options,
  orientation = "vertical",
  disabled,
  className,
  ...radioGroupProps
}: RadioGroupFieldProps<T, TFieldValues, TName>): React.ReactElement {
  const generatedId = useId();

  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const state = invalid ? "error" : "default";

  return (
    <div className={cn("ui-radio-group-field", className)}>
      {label && (
        <label className="ui-radio-group-field__label">{label}</label>
      )}
      <RadioGroup<T>
        {...radioGroupProps}
        name={field.name}
        options={options}
        value={field.value as T}
        onChange={(value) => field.onChange(value)}
        orientation={orientation}
        size={size}
        state={state}
        disabled={disabled}
        ref={field.ref}
      />
      <div className="ui-radio-group-field__helper">
        <FieldError error={error} size={size} />
        {!error && hint && <FieldHint size={size}>{hint}</FieldHint>}
      </div>
    </div>
  );
}

export default RadioGroupField;

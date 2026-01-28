"use client";

import React, { useId } from "react";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { Checkbox, type CheckboxProps } from "../inputs/Checkbox";
import { FieldError } from "../feedback/FieldError";
import { FieldHint } from "../feedback/FieldHint";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for CheckboxField component
 */
export interface CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<CheckboxProps, "name" | "checked" | "onChange" | "state"> {
  /**
   * Label text displayed next to the checkbox
   */
  label?: string;

  /**
   * Helper text displayed below the checkbox
   */
  hint?: string;

  /**
   * Size variant
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Custom ID for the input
   * Auto-generated if not provided
   */
  id?: string;
}

/**
 * CheckboxField - Checkbox with React Hook Form integration
 *
 * @description
 * Combines Checkbox with useController for form validation.
 * Automatically handles checked state and error display.
 *
 * @example
 * ```tsx
 * <CheckboxField
 *   name="acceptTerms"
 *   control={control}
 *   label="I accept the terms and conditions"
 *   rules={{ required: "You must accept the terms" }}
 * />
 * ```
 */
export function CheckboxField<
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
  id: customId,
  // Checkbox props
  labelPosition = "right",
  indeterminate,
  disabled,
  className,
  ...checkboxProps
}: CheckboxFieldProps<TFieldValues, TName>): React.ReactElement {
  const generatedId = useId();
  const id = customId || `checkbox-${name}-${generatedId}`;

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
    <div className={cn("ui-checkbox-field", className)}>
      <Checkbox
        {...checkboxProps}
        id={id}
        name={field.name}
        checked={Boolean(field.value)}
        onChange={(checked) => field.onChange(checked)}
        label={label}
        labelPosition={labelPosition}
        indeterminate={indeterminate}
        size={size}
        state={state}
        disabled={disabled}
        ref={field.ref}
      />
      <div className="ui-checkbox-field__helper">
        <FieldError error={error} size={size} />
        {!error && hint && <FieldHint size={size}>{hint}</FieldHint>}
      </div>
    </div>
  );
}

export default CheckboxField;

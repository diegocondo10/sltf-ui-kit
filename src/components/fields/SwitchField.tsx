"use client";

import React, { useId } from "react";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { Switch, type SwitchProps } from "../inputs/Switch";
import { FieldError } from "../feedback/FieldError";
import { FieldHint } from "../feedback/FieldHint";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for SwitchField component
 */
export interface SwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<SwitchProps, "name" | "checked" | "onChange"> {
  /**
   * Label text displayed next to the switch
   */
  label?: string;

  /**
   * Helper text displayed below the switch
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
 * SwitchField - Switch with React Hook Form integration
 *
 * @description
 * Combines Switch with useController for form validation.
 * Automatically handles checked state.
 *
 * @example
 * ```tsx
 * <SwitchField
 *   name="notifications"
 *   control={control}
 *   label="Enable notifications"
 * />
 * ```
 */
export function SwitchField<
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
  // Switch props
  labelPosition = "right",
  disabled,
  className,
  ...switchProps
}: SwitchFieldProps<TFieldValues, TName>): React.ReactElement {
  const generatedId = useId();
  const id = customId || `switch-${name}-${generatedId}`;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <div className={cn("ui-switch-field", className)}>
      <Switch
        {...switchProps}
        id={id}
        name={field.name}
        checked={Boolean(field.value)}
        onChange={(checked) => field.onChange(checked)}
        label={label}
        labelPosition={labelPosition}
        size={size}
        disabled={disabled}
        ref={field.ref}
      />
      <div className="ui-switch-field__helper">
        <FieldError error={error} size={size} />
        {!error && hint && <FieldHint size={size}>{hint}</FieldHint>}
      </div>
    </div>
  );
}

export default SwitchField;

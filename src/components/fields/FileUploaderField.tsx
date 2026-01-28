"use client";

import React, { useId } from "react";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FieldContainer } from "../containers/FieldContainer";
import { FloatingContainer } from "../containers/FloatingContainer";
import {
  FileUploader,
  type FileUploaderProps,
  type FileError,
} from "../inputs/FileUploader";
import type { ContainerVariant, ComponentSize } from "../types";

/**
 * Props for FileUploaderField component
 */
export interface FileUploaderFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>
  extends
    Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<FileUploaderProps, "onChange" | "state"> {
  /**
   * Label text for the field
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  hint?: string;

  /**
   * Container variant
   * @default "default"
   */
  variant?: ContainerVariant;

  /**
   * Size variant
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Whether the field is required
   * Adds visual indicator to label
   */
  required?: boolean;

  /**
   * Custom ID for the field
   * Auto-generated if not provided
   */
  id?: string;

  /**
   * Callback fired when file validation fails
   * Receives array of FileError objects
   */
  onValidationError?: (errors: FileError[]) => void;
}

/**
 * FileUploaderField - File uploader with React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with FileUploader and useController.
 * Automatically handles validation states and error display.
 * Stores File[] for multiple or File | null for single upload.
 * Supports file size/type validation with error callbacks.
 *
 * @example
 * ```tsx
 * // Single file upload with preview
 * <FileUploaderField
 *   name="avatar"
 *   control={control}
 *   label="Profile Picture"
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024}
 *   showPreview
 *   rules={{ required: "Please upload an image" }}
 * />
 *
 * // Multiple files with floating label
 * <FileUploaderField
 *   name="documents"
 *   control={control}
 *   label="Documents"
 *   multiple
 *   maxFiles={5}
 *   maxSize={10 * 1024 * 1024}
 *   variant="floating"
 *   onValidationError={(errors) => console.log(errors)}
 * />
 * ```
 */
export function FileUploaderField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // Uploader props
  multiple,
  accept,
  maxFiles,
  maxSize,
  showPreview,
  showFileList,
  dropText,
  disabledText,
  onRemove,
  onValidationError,
  disabled,
  className,
  ...uploaderProps
}: FileUploaderFieldProps<TFieldValues, TName>): React.ReactElement {
  const generatedId = useId();
  const id = customId || `field-${String(name)}-${generatedId}`;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, shouldUnregister });

  const state = error ? "error" : "default";

  const handleChange = (files: File[]) => {
    // store files array or single file depending on multiple
    field.onChange(multiple ? files : (files[0] ?? null));
  };

  const handleError = (errors: FileError[]) => {
    onValidationError?.(errors);
  };

  const valueHasFiles = Array.isArray(field.value) ? field.value.length > 0 : !!field.value;

  const uploader = (
    <FileUploader
      {...uploaderProps}
      multiple={multiple}
      accept={accept}
      maxFiles={maxFiles}
      maxSize={maxSize}
      showPreview={showPreview}
      showFileList={showFileList}
      dropText={dropText}
      disabledText={disabledText}
      onChange={handleChange}
      onRemove={onRemove}
      onError={handleError}
      size={size}
      state={state}
      disabled={disabled}
    />
  );

  if (variant === "floating") {
    return (
      <FloatingContainer
        id={id}
        label={label}
        hint={hint}
        error={error}
        required={required}
        disabled={disabled}
        hasValue={valueHasFiles}
        isFocused={false}
        size={size}
        className={className}>
        {uploader}
      </FloatingContainer>
    );
  }

  return (
    <FieldContainer
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      disabled={disabled}
      size={size}
      className={className}>
      {uploader}
    </FieldContainer>
  );
}

export default FileUploaderField;

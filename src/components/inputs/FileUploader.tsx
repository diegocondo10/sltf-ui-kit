"use client";

import React, { forwardRef, useRef, useState } from "react";
import type { ComponentSize, FieldState } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for FileUploader component
 */
export interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Accepted file types (MIME types or extensions)
   * @example "image/*" or "image/*,application/pdf"
   */
  accept?: string;

  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;

  /**
   * Callback fired when files are selected or dropped
   */
  onChange?: (files: File[]) => void;

  /**
   * Size variant
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Visual state
   * @default "default"
   */
  state?: FieldState;

  /**
   * Whether the uploader is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * FileUploader - Drag and drop file upload component
 *
 * @description
 * Component for uploading files via drag-and-drop or click-to-browse.
 * Supports single/multiple file selection with file type filtering.
 * Uses CSS custom properties for theming.
 *
 * @example
 * ```tsx
 * // Single image upload
 * <FileUploader
 *   accept="image/*"
 *   onChange={(files) => console.log(files)}
 * />
 *
 * // Multiple files with limit
 * <FileUploader
 *   multiple
 *   maxFiles={5}
 *   accept="image/*,application/pdf"
 *   onChange={(files) => setFiles(files)}
 * />
 * ```
 */
export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(
  {
    multiple = false,
    accept,
    maxFiles,
    onChange,
    size = "md",
    state = "default",
    disabled = false,
    className,
    ...props
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    const arr = Array.from(fileList);
    let next = arr;
    if (!multiple) next = arr.slice(0, 1);
    if (maxFiles) next = next.slice(0, maxFiles);
    setFiles(next);
    onChange?.(next);
  };

  const onDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    }
  };

  const onDragLeave: React.DragEventHandler = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const uploaderClasses = cn(
    "ui-file-uploader",
    `ui-file-uploader--${size}`,
    {
      [`ui-file-uploader--${state}`]: state !== "default",
      "ui-file-uploader--disabled": disabled,
      "ui-file-uploader--dragging": isDragging,
    },
    className,
  );

  return (
    <div
      {...props}
      ref={ref}
      className={uploaderClasses}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      aria-disabled={disabled}>
      <input
        ref={inputRef}
        type='file'
        style={{ display: "none" }}
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className='ui-file-uploader__drop' onClick={openFileDialog}>
        <div className='ui-file-uploader__icon'>📁</div>
        <div className='ui-file-uploader__text'>
          {disabled ? "Upload disabled" : "Drop files here or click to upload"}
        </div>
        {accept && <div className='ui-file-uploader__accept'>Accepted: {accept}</div>}
      </div>

      {files.length > 0 && (
        <ul className='ui-file-uploader__list'>
          {files.map((f, i) => (
            <li className='ui-file-uploader__item' key={`${f.name}-${i}`}>
              <span className='ui-file-uploader__name'>{f.name}</span>
              <span className='ui-file-uploader__size'>{Math.round(f.size / 1024)} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default FileUploader;

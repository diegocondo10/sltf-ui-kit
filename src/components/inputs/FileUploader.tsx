"use client";

import React, { forwardRef, useCallback, useRef, useState } from "react";
import type { ComponentSize, FieldState } from "../types";
import { cn } from "../../utils/cn";
import {
  getFileUploaderSizeClass,
  getFileUploaderStateClass,
} from "../../theme/passthrough";

/**
 * Error types for file validation
 */
export type FileErrorType = "size" | "type" | "count";

/**
 * Error object returned when file validation fails
 */
export interface FileError {
  type: FileErrorType;
  file: File;
  message: string;
}

/**
 * Props for FileUploader component
 */
export interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onError"> {
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
   * Maximum file size in bytes
   * @example 5 * 1024 * 1024 // 5MB
   */
  maxSize?: number;

  /**
   * Callback fired when files are selected or dropped
   */
  onChange?: (files: File[]) => void;

  /**
   * Callback fired when a file is removed
   */
  onRemove?: (file: File, index: number) => void;

  /**
   * Callback fired when file validation fails
   */
  onError?: (errors: FileError[]) => void;

  /**
   * Show image previews for image files
   * @default false
   */
  showPreview?: boolean;

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

  /**
   * Custom drop zone text
   */
  dropText?: string;

  /**
   * Custom disabled text
   */
  disabledText?: string;

  /**
   * Show file list below drop zone
   * @default true
   */
  showFileList?: boolean;
}

/**
 * Format file size to human readable string
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Check if a file type matches the accept pattern
 */
function matchesAccept(file: File, accept: string): boolean {
  if (!accept) return true;

  const acceptTypes = accept.split(",").map((t) => t.trim().toLowerCase());

  for (const pattern of acceptTypes) {
    // Extension pattern (e.g., ".pdf")
    if (pattern.startsWith(".")) {
      if (file.name.toLowerCase().endsWith(pattern)) return true;
    }
    // Wildcard MIME (e.g., "image/*")
    else if (pattern.endsWith("/*")) {
      const baseType = pattern.slice(0, -2);
      if (file.type.toLowerCase().startsWith(baseType + "/")) return true;
    }
    // Exact MIME match
    else if (file.type.toLowerCase() === pattern) {
      return true;
    }
  }

  return false;
}

/**
 * Check if file is an image
 */
function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/**
 * FileUploader - Drag and drop file upload component
 *
 * @description
 * Component for uploading files via drag-and-drop or click-to-browse.
 * Supports single/multiple file selection with file type and size validation.
 * Includes optional image previews and file removal functionality.
 * Uses CSS custom properties for theming.
 *
 * @example
 * ```tsx
 * // Single image upload with preview
 * <FileUploader
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024}
 *   showPreview
 *   onChange={(files) => console.log(files)}
 * />
 *
 * // Multiple files with validation
 * <FileUploader
 *   multiple
 *   maxFiles={5}
 *   maxSize={10 * 1024 * 1024}
 *   accept="image/*,application/pdf"
 *   onError={(errors) => console.log(errors)}
 *   onChange={(files) => setFiles(files)}
 * />
 * ```
 */
export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(
  {
    multiple = false,
    accept,
    maxFiles,
    maxSize,
    onChange,
    onRemove,
    onError,
    showPreview = false,
    size = "md",
    state = "default",
    disabled = false,
    dropText,
    disabledText,
    showFileList = true,
    className,
    ...props
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());
  const dragCounterRef = useRef(0);

  /**
   * Generate preview URL for an image file
   */
  const generatePreview = useCallback((file: File): string | null => {
    if (!isImageFile(file)) return null;
    return URL.createObjectURL(file);
  }, []);

  /**
   * Clean up preview URLs to prevent memory leaks
   */
  const cleanupPreviews = useCallback((previewMap: Map<string, string>) => {
    previewMap.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  /**
   * Validate files and return valid files + errors
   */
  const validateFiles = useCallback(
    (fileList: File[]): { valid: File[]; errors: FileError[] } => {
      const errors: FileError[] = [];
      const valid: File[] = [];

      for (const file of fileList) {
        // Check file type
        if (accept && !matchesAccept(file, accept)) {
          errors.push({
            type: "type",
            file,
            message: `File type not accepted: ${file.name}`,
          });
          continue;
        }

        // Check file size
        if (maxSize && file.size > maxSize) {
          errors.push({
            type: "size",
            file,
            message: `File too large: ${file.name} (${formatFileSize(file.size)} > ${formatFileSize(maxSize)})`,
          });
          continue;
        }

        valid.push(file);
      }

      return { valid, errors };
    },
    [accept, maxSize],
  );

  /**
   * Handle file selection/drop
   */
  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || disabled) return;

      const arr = Array.from(fileList);
      const { valid, errors } = validateFiles(arr);

      // Apply file count limits
      let next = valid;
      if (!multiple) next = valid.slice(0, 1);
      if (maxFiles) next = next.slice(0, maxFiles);

      // Check if we exceeded maxFiles
      if (maxFiles && valid.length > maxFiles) {
        const excessFiles = valid.slice(maxFiles);
        excessFiles.forEach((file) => {
          errors.push({
            type: "count",
            file,
            message: `Maximum ${maxFiles} files allowed`,
          });
        });
      }

      // Report errors if any
      if (errors.length > 0) {
        onError?.(errors);
      }

      // Clean up old previews
      cleanupPreviews(previews);

      // Generate new previews if enabled
      if (showPreview) {
        const newPreviews = new Map<string, string>();
        next.forEach((file, index) => {
          const previewUrl = generatePreview(file);
          if (previewUrl) {
            newPreviews.set(`${file.name}-${index}`, previewUrl);
          }
        });
        setPreviews(newPreviews);
      }

      setFiles(next);
      onChange?.(next);
    },
    [
      disabled,
      validateFiles,
      multiple,
      maxFiles,
      onError,
      cleanupPreviews,
      previews,
      showPreview,
      generatePreview,
      onChange,
    ],
  );

  /**
   * Remove a file from the list
   */
  const handleRemove = useCallback(
    (file: File, index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;

      const previewKey = `${file.name}-${index}`;
      const previewUrl = previews.get(previewKey);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviews((prev) => {
          const next = new Map(prev);
          next.delete(previewKey);
          return next;
        });
      }

      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onChange?.(newFiles);
      onRemove?.(file, index);
    },
    [disabled, files, onChange, onRemove, previews],
  );

  const onDrop: React.DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragEnter: React.DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (!disabled && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const onDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const onDragLeave: React.DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const openFileDialog = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !disabled) {
      e.preventDefault();
      openFileDialog();
    }
  };

  const uploaderClasses = cn(
    "ui-file-uploader",
    getFileUploaderSizeClass(size),
    getFileUploaderStateClass(state),
    {
      "ui-file-uploader--disabled": disabled,
      "ui-file-uploader--dragging": isDragging,
      "ui-file-uploader--has-files": files.length > 0,
    },
    className,
  );

  const defaultDropText = dropText || "Drop files here or click to upload";
  const defaultDisabledText = disabledText || "Upload disabled";

  return (
    <div
      {...props}
      ref={ref}
      className={uploaderClasses}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        className="ui-file-uploader__input"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div
        className="ui-file-uploader__drop"
        onClick={openFileDialog}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={disabled ? defaultDisabledText : defaultDropText}
      >
        <div className="ui-file-uploader__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17,8 12,3 7,8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="ui-file-uploader__text">
          {disabled ? defaultDisabledText : defaultDropText}
        </div>
        {accept && (
          <div className="ui-file-uploader__accept">Accepted: {accept}</div>
        )}
        {maxSize && (
          <div className="ui-file-uploader__max-size">
            Max size: {formatFileSize(maxSize)}
          </div>
        )}
      </div>

      {showFileList && files.length > 0 && (
        <ul className="ui-file-uploader__list" role="list">
          {files.map((file, i) => {
            const previewKey = `${file.name}-${i}`;
            const previewUrl = showPreview ? previews.get(previewKey) : null;

            return (
              <li
                className="ui-file-uploader__item"
                key={previewKey}
                role="listitem"
              >
                {previewUrl && (
                  <div className="ui-file-uploader__preview">
                    <img
                      src={previewUrl}
                      alt={`Preview of ${file.name}`}
                      className="ui-file-uploader__preview-img"
                    />
                  </div>
                )}
                <div className="ui-file-uploader__file-info">
                  <span className="ui-file-uploader__name" title={file.name}>
                    {file.name}
                  </span>
                  <span className="ui-file-uploader__size">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    className="ui-file-uploader__remove"
                    onClick={(e) => handleRemove(file, i, e)}
                    aria-label={`Remove ${file.name}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});

export default FileUploader;

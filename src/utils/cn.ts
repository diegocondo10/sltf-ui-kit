import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for constructing className strings conditionally.
 * Combines clsx for conditional classes with tailwind-merge to handle
 * Tailwind CSS class conflicts intelligently.
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn("px-2 py-1", "text-red-500")
 * // => "px-2 py-1 text-red-500"
 *
 * // Conditional classes
 * cn("base-class", isActive && "active", isDisabled && "disabled")
 *
 * // Object syntax
 * cn({ "bg-red-500": hasError, "bg-green-500": isSuccess })
 *
 * // Tailwind merge (later classes win)
 * cn("px-2 py-1", "px-4")
 * // => "py-1 px-4"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;

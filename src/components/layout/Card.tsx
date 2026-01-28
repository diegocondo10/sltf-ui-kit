"use client";

import React, { forwardRef } from "react";
import { Card as PrimeCard } from "primereact/card";
import type { CardProps as PrimeCardProps } from "primereact/card";
import { cn } from "../../utils/cn";

/**
 * Props for Card component
 */
export interface CardProps extends Omit<PrimeCardProps, "pt"> {
  /**
   * Title content for the card
   */
  title?: React.ReactNode;

  /**
   * Subtitle content for the card
   */
  subTitle?: React.ReactNode;

  /**
   * Header content (can include images, icons, etc.)
   */
  header?: React.ReactNode;

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Card body content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Card - Container component for content using PrimeReact
 *
 * @description
 * PrimeReact Card with CSS custom properties for theming.
 * Provides a flexible container for grouping related content.
 *
 * @example
 * ```tsx
 * <Card
 *   title="Card Title"
 *   subTitle="Card subtitle"
 *   footer={<Button label="Action" />}
 * >
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      title,
      subTitle,
      header,
      footer,
      children,
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const cardClasses = cn("ui-card", className);

    return (
      <PrimeCard
        ref={ref}
        title={title}
        subTitle={subTitle}
        header={header}
        footer={footer}
        pt={{
          root: { className: cardClasses },
          body: { className: "ui-card__body" },
          title: { className: "ui-card__title" },
          subTitle: { className: "ui-card__subtitle" },
          header: { className: "ui-card__header" },
          footer: { className: "ui-card__footer" },
          content: { className: "ui-card__content" },
        }}
        {...props}
      >
        {children}
      </PrimeCard>
    );
  }
);

export default Card;

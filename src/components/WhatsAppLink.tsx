"use client";

import type { ReactNode } from "react";
import { useWhatsAppUrl } from "@/lib/useWhatsAppUrl";

type Props = {
  className?: string;
  children?: ReactNode;
  icon?: boolean;
  iconSize?: number;
  "aria-label"?: string;
};

export default function WhatsAppLink({
  className,
  children,
  icon = false,
  iconSize = 18,
  "aria-label": ariaLabel,
}: Props) {
  const href = useWhatsAppUrl();

  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
      {icon && (
        <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} fill="currentColor" aria-hidden>
          <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0a11.9 11.9 0 0 0-10.2 17.9L0 24l6.3-1.7A11.9 11.9 0 0 0 12 24a11.9 11.9 0 0 0 8.5-20.5ZM12 21.9c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.9 9.9 0 1 1 12 21.9Zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7c0 1.6 1.1 3.2 1.3 3.4s2.3 3.5 5.6 4.9c2 .8 2.8.9 3.8.7a3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.3Z" />
        </svg>
      )}
      {children}
    </a>
  );
}
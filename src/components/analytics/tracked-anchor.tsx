"use client";

import type { ReactNode } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type TrackedAnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedAnchor({
  href,
  children,
  className,
  eventName,
  eventParams,
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        sendGAEvent("event", eventName, {
          link_url: href,
          ...eventParams,
        })
      }
    >
      {children}
    </a>
  );
}
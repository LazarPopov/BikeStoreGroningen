"use client";

import type { ReactNode } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type TrackedAnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
  rel?: string;
  target?: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedAnchor({
  href,
  children,
  className,
  rel,
  target,
  eventName,
  eventParams,
}: TrackedAnchorProps) {
  return (
    <a
      href={href}
      className={className}
      rel={rel}
      target={target}
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

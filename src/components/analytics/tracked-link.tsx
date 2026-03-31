"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { sendGAEvent } from "@next/third-parties/google";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventParams,
}: TrackedLinkProps) {
  return (
    <Link
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
    </Link>
  );
}
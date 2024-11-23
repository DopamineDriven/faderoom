"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export type ClientPortalProps = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};

export const ClientPortal = ({
  children,
  selector,
  show
}: ClientPortalProps) => {
  const ref = React.useRef<null | HTMLElement>(null);

  React.useEffect(() => {
    ref.current = window.document.getElementById(selector);
  }, [selector]);

  return show && ref.current != null
    ? createPortal(children, ref.current)
    : null;
};

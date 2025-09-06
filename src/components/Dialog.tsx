import { forwardRef } from "react";

interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  children?: React.ReactNode;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children, ...props }, ref) => {
    return <dialog ref={ref} {...props}>{children}</dialog>;
  }
);

import { Dialog } from "radix-ui";
import { css, Styles } from "styled-system/css";

export function DialogRoot({
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
}

export function DialogTrigger({
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props}>{children}</Dialog.Trigger>;
}

export function DialogPortal({
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal {...props}>{children}</Dialog.Portal>;
}

export function DialogOverlay({
  css: cssProp,
  ...props
}: { css: Styles } & React.ComponentProps<typeof Dialog.Overlay>) {
  const style = css(
    {
      position: "fixed",
      inset: 0,
      background: "slate.700",
      opacity: 0.5,
    },
    cssProp,
  );
  return <Dialog.Overlay className={style} {...props} />;
}

export function DialogContent({
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Content>) {
  return <Dialog.Content {...props}>{children}</Dialog.Content>;
}

export function DialogTitle({
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return <Dialog.Title {...props}>{children}</Dialog.Title>;
}

export function DialogClose({
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close {...props}>{children}</Dialog.Close>;
}

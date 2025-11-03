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
}: { css?: Styles } & React.ComponentProps<typeof Dialog.Overlay>) {
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
  css: cssProp,
  children,
  ...props
}: { css?: Styles } & React.ComponentProps<typeof Dialog.Content>) {
  const style = css(
    {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90vw",
      maxWidth: "2xl",
      maxH: "90vh",
      maxHeight: "90dvh",
      padding: "2rem 3rem",
      backgroundColor: "stone.50",
      borderRadius: "xs",
      boxShadow: "md",
    },
    cssProp,
  );
  return (
    <Dialog.Content className={style} {...props}>
      {children}
    </Dialog.Content>
  );
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

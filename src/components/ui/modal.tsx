import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/hooks/useI18n";
import { Icon } from "./icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  onBack?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide";
}

const modalRoot = document.getElementById("modal-root")!;

export function Modal({ open, onClose, title, onBack, children, className, size = "default" }: ModalProps) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.getElementById("root")!;

    if (open && !dialog.open) {
      triggerRef.current = document.activeElement;
      dialog.showModal();
      const autoFocusEl = dialog.querySelector<HTMLElement>("[autofocus]");
      if (autoFocusEl) autoFocusEl.focus();
      root.inert = true;
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
      root.inert = false;
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    }

    return () => {
      if (root.inert) {
        root.inert = false;
        document.body.style.overflow = "";
      }
    };
  }, [open]);

  function handleCancel(e: React.SyntheticEvent) {
    e.preventDefault();
    onClose();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className={clsx(
        "bg-bg-card rounded-card shadow-card m-auto max-h-[90dvh] w-full flex-col overflow-hidden p-0",
        { "max-w-md": size === "default", "max-w-xl": size === "wide" },
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        "open:flex",
        open && "animate-[modalIn_0.25s_ease-out]",
      )}
    >
      {/* Header */}
      <div className="border-border-divider flex shrink-0 items-center justify-between border-b px-4 py-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={t("Back")}
            className="text-text-secondary hover:text-text-primary -ml-1 p-1 transition-colors"
          >
            <Icon name="arrow-left" size={20} />
          </button>
        ) : (
          <div className="w-7" />
        )}
        {title && (
          <h2 className="text-text-primary text-h3 font-bold">{title}</h2>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close")}
          className="text-text-secondary hover:text-text-primary -mr-1 p-1 transition-colors"
        >
          <Icon name="x" size={20} />
        </button>
      </div>

      {/* Body */}
      <div className={clsx("flex-1 overflow-y-auto px-5 py-6", className)}>
        {children}
      </div>
    </dialog>,
    modalRoot,
  );
}

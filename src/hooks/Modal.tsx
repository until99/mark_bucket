import { useRef, useEffect } from "react";

export const useModal = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const showModal = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const close = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    useEffect(() => {
        const dialog = dialogRef.current;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        if (dialog) {
            dialog.addEventListener("keydown", handleKeyDown);
            return () => {
                dialog.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, []);

    return { dialogRef, showModal, close };
}
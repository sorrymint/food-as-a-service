import { toast as sonnerToast } from "sonner";

export const toast = (message: React.ReactNode, options?: any) =>
    sonnerToast(message, options);
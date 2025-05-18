
import { toast as sonnerToast } from "sonner";

let count = 0;

export function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function showToast(title: string, description?: string, variant: "default" | "destructive" = "default") {
  sonnerToast(title, {
    description,
    className: variant === "destructive" ? "bg-destructive text-white" : "",
  });
}

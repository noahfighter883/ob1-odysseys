import { cn } from "@/lib/utils";

export function Ob1Byline({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full font-heading text-xs font-semibold",
          tone === "light"
            ? "bg-white/15 text-white backdrop-blur"
            : "bg-brand/10 text-brand"
        )}
      >
        O1
      </div>
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-wide",
          tone === "light" ? "text-white/75" : "text-muted-foreground"
        )}
      >
        Field dispatch from OB1
      </span>
    </div>
  );
}

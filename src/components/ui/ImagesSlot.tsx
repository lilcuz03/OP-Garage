import Image from "next/image";
import { Camera } from "lucide-react";
import type { ImageSlot as ImageSlotType } from "@/data/Images";
import { cn } from "@/lib/utils";

/*
  Shows the real photo when `image.src` is set, otherwise a colored placeholder.
  The parent decides the size, e.g. className="aspect-[4/3] rounded-3xl".
  variant="bare" hides the placeholder icon and label (used behind page banners).
  fit="contain" shows the whole photo without cropping (used in the gallery lightbox).

  `image.placeholder` can be Tailwind classes ("bg-gradient-to-br from-steel/50 ...")
  or a CSS value ("linear-gradient(...)", "#0b4a37"). Both work.
*/

const isCssValue = (v: string) =>
  /^(#|rgb|hsl|linear-gradient|radial-gradient|conic-gradient|var\()/.test(
    v.trim(),
  );

export default function ImageSlot({
  image,
  sizes,
  priority = false,
  variant = "full",
  fit = "cover",
  className,
}: {
  image: ImageSlotType;
  sizes: string;
  priority?: boolean;
  variant?: "full" | "bare";
  fit?: "cover" | "contain";
  className?: string;
}) {
  const placeholder = image.placeholder ?? "bg-surface";
  const css = isCssValue(placeholder);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === "contain" ? "object-contain" : "object-cover"}
          style={
            image.position ? { objectPosition: image.position } : undefined
          }
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-white/80",
            !css && placeholder,
          )}
          style={css ? { background: placeholder } : undefined}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {variant === "full" && (
            <>
              <Camera
                className="relative size-10 opacity-60 sm:size-12"
                aria-hidden
              />
              <span className="relative max-w-xs text-[11px] font-medium uppercase tracking-[0.18em] opacity-75">
                {image.label ?? "Photo coming soon"}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

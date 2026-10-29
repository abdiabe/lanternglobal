import Image from "next/image";
import { photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

/**
 * Licensed photo from src/content/photos.json. Uses next/image for responsive
 * AVIF/WebP delivery. Pass `fill` inside a positioned, sized parent.
 */
export function Photo({
  id,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  fill = true,
  alt,
  position = "center",
}: {
  id: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  alt?: string;
  position?: string;
}) {
  const p = photo(id);
  if (fill) {
    return (
      <Image
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        style={{ objectPosition: position }}
      />
    );
  }
  return <Image src={p.src} alt={alt ?? p.alt} width={p.width} height={p.height} sizes={sizes} priority={priority} className={className} />;
}

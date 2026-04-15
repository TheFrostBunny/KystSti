import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-xl aspect-[4/3]">
        <img
          src={images[activeIndex]}
          alt={`${alt} - bilde ${activeIndex + 1}`}
          className="h-full w-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                i === activeIndex
                  ? "border-primary ring-1 ring-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              aria-label={`Vis bilde ${i + 1}`}
            >
              <img
                src={img}
                alt={`${alt} - miniatyr ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

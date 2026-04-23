import React from "react";

interface TourHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

export function TourHeader({ title, subtitle, description }: TourHeaderProps) {
  return (
    <>
      <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h1>
      <p className="mt-3 text-lg sm:text-xl text-muted-foreground">
        {subtitle}
      </p>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-lg mx-auto">
        {description}
      </p>
    </>
  );
}

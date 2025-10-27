// Image component that swaps to placeholder on error.
"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined;
  fallbackSrc?: string;
}

const PLACEHOLDER = "/placeholder.png";

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = PLACEHOLDER,
  alt,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc);

  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      alt={alt}
      src={currentSrc || fallbackSrc}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
};

import { ComponentProps, useEffect, useState } from "react";

import { cn } from "@/src/utils";

interface ImageProps extends ComponentProps<"img"> {
  src: string;
  alt: string;
  className?: string;
}

const ImageFadeIn = ({ className, ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = props.src;
    image.onload = () => {
      setIsLoaded(true);
    };
  }, [props.src]);

  return (
    <img
      className={cn("duration-300", className, !isLoaded && "opacity-0 ")}
      onLoad={() => setIsLoaded(true)}
      {...props}
    />
  );
};

export default ImageFadeIn;

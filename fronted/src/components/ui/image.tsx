import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  alt: string;
  loadingComponent?: React.ReactNode;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback = "/placeholder.svg",
  loadingComponent,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImgSrc(src);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (img) {
      observer.observe(img);
    }

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [src]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && loadingComponent && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {loadingComponent}
        </div>
      )}
      <img
        ref={imgRef}
        src={error ? fallback : imgSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        {...props}
      />
    </div>
  );
};

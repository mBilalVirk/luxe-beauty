import { useState } from "react";

const fallbackSrc =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <rect width="800" height="800" fill="#fbf3ee"/>
      <circle cx="400" cy="400" r="220" fill="#f3d9de" opacity="0.75"/>
      <circle cx="400" cy="400" r="120" fill="#c17e8b" opacity="0.8"/>
      <path d="M205 520C260 470 315 442 400 440C487 438 548 470 600 520" fill="none" stroke="#a85e6d" stroke-width="18" stroke-linecap="round"/>
      <path d="M310 265C342 230 370 210 400 210C430 210 458 230 490 265" fill="none" stroke="#a85e6d" stroke-width="14" stroke-linecap="round"/>
      <circle cx="328" cy="350" r="12" fill="#2c231f"/>
      <circle cx="472" cy="350" r="12" fill="#2c231f"/>
    </svg>
  `);

export default function ImageWithFallback({
  src,
  alt,
  className = "",
  loading = "lazy",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={handleError}
      onLoad={() => {
        if (src && imgSrc !== src) {
          setImgSrc(src);
        }
      }}
    />
  );
}

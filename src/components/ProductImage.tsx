'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ProductImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string | null | undefined;
  alt: string;
  fallbackSrc?: string;
}

export default function ProductImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.jpg',
  ...props 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  // Handle error saat gambar gagal dimuat
  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <span className="text-gray-500">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={handleError}
      unoptimized={process.env.NODE_ENV !== 'production'}
      {...props}
    />
  );
}

'use client'
import React, { useState } from 'react';

const ImageWithFallback: React.FC<ImageFallbackProp> = ({ src, fallbackSrc, alt, className }: ImageFallbackProp) => {
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleError = () => {
        if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
        }
    };


    return (
        <img src={currentSrc} alt={alt} onError={handleError} className={className} />
    );
};

interface ImageFallbackProp {
    src: string | undefined;
    fallbackSrc: string;
    alt: string | undefined;
    className?: string;
}

export default ImageWithFallback;

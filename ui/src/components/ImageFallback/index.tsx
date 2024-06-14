import React, { useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt, className }: ImageFallbackProp) => {
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

type ImageFallbackProp = {
    src: string | undefined;
    fallbackSrc: string;
    alt: string | undefined;
    className?: string;
}

export default ImageWithFallback;

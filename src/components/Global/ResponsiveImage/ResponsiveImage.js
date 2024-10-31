import React from "react";

const ResponsiveImage = ({ webpSrcSet, pngSrcSet, alt, width, height }) => {
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} />
      <img srcSet={pngSrcSet} alt={alt} width={width} height={height} />
    </picture>
  );
};

export default ResponsiveImage;

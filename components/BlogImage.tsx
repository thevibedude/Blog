import Image from 'next/image';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function cloudinaryUrl(
  publicId: string,
  width: number,
  quality = 80
) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_${width},q_${quality},f_auto/${publicId}`;
}

export function BlogImage({
  src,
  alt,
  width = 1200,
  height = 675,
  caption,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}) {
  // If src starts with / it is a local image
  // If src starts with http it is an external URL
  // Otherwise it is a Cloudinary public ID
  const isLocal    = src.startsWith('/');
  const isExternal = src.startsWith('http');
  const imageUrl   = isLocal || isExternal
    ? src
    : cloudinaryUrl(src, width);

  return (
    <figure className="blog-image">
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className="blog-img"
        loading="lazy"
      />
      {caption && (
        <figcaption className="blog-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

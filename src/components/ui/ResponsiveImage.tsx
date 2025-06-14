import clsx from 'clsx'

export function ResponsiveImage({
  src,
  alt,
  className,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}) {
  const isRasterImage = /\.(png|jpe?g)$/i.test(src)
  const webpSrc = isRasterImage ? src.replace(/\.(png|jpe?g)$/i, '.webp') : src

  return isRasterImage ? (
    <picture className="contents">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={clsx("block", className)}
        loading="lazy"
        width={width}
        height={height}
      />
    </picture>
  ) : (
    <img
      src={src}
      alt={alt}
      className={clsx("block", className)}
      loading="lazy"
      width={width}
      height={height}
    />
  )
}

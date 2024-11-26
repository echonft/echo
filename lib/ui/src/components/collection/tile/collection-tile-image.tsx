import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { Size } from '@echo/ui/constants/size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  alt: string
  size: Size.MD | Size.LG
  src: Nullable<string>
}

export const CollectionTileImage: FunctionComponent<Props> = ({ alt, size, src }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const width = size === Size.MD ? 336 : 432

  if (isNilOrEmpty(src) || error) {
    return (
      <div className={clsx('absolute', 'inset-0', 'rounded-2xl', 'bg-dark-500')}>
        <div className={clsx('absolute', 'inset-0', 'bg-imageFilter')} />
        <ImageNotFound width={width} height={width} className={clsx('rounded-2xl')} />
      </div>
    )
  }

  const url = addPictureSize(src, width)
  return (
    <div className={clsx('absolute', 'inset-0', 'rounded-2xl', 'bg-dark-500')}>
      <ImageSizeable
        className={clsx('select-none', 'bg-dark-500', 'rounded-2xl', 'transition-transform')}
        width={width}
        height={width}
        alt={alt}
        src={url}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      {loaded ? <div className={clsx('absolute', 'inset-0', 'bg-imageFilter')} /> : <ImagePlaceholder show={true} />}
    </div>
  )
}

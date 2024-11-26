import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  src: Nullable<string>
  alt: string
}

export const CollectionSelectorCollectionPicture: FunctionComponent<Props> = ({ src, alt }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(src) || error) {
    return <ImageNotFound width={57} height={57} className={clsx('rounded-2xl')} />
  }

  return (
    <div className={clsx('w-[3.5625rem]', 'h-[3.5625rem]', 'relative', 'overflow-clip', 'rounded-2xl', 'bg-dark-500')}>
      <ImageSizeable
        className={clsx(
          'select-none',
          'w-auto',
          'h-auto',
          'rounded-2xl',
          'bg-dark-500',
          'object-center',
          'object-contain'
        )}
        width={57}
        height={57}
        src={src}
        alt={alt}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      {loaded ? (
        <div className={clsx('absolute', 'inset-0', 'bg-gradient-to-b', 'from-transparent', 'to-black')} />
      ) : (
        <ImagePlaceholder show={true} />
      )}
    </div>
  )
}

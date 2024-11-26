import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  alt: string
  src: Nullable<string>
}

export const CollectionRowImage: FunctionComponent<Props> = ({ alt, src }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(src) || error) {
    return <ImageNotFound width={100} height={100} className={clsx('rounded')} />
  }

  return (
    <div className={clsx('w-[6.25rem]', 'h-[6.25rem]', 'rounded', 'bg-dark-500', 'relative')}>
      <ImageSizeable
        className={clsx('rounded', 'bg-dark-500')}
        src={src}
        alt={alt}
        width={100}
        height={100}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      <ImagePlaceholder className={clsx('rounded')} show={!loaded} />
    </div>
  )
}

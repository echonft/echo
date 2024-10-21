import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureURL: Nullable<string>
  alt: string
}

export const CollectionSelectorCollectionPicture: FunctionComponent<Props> = ({ pictureURL, alt }) => (
  <div className={clsx('w-[57px]', 'h-[57px]', 'relative', 'overflow-clip', 'rounded-2xl')}>
    <SizeableImage
      className={clsx('select-none', 'w-full', 'h-full', 'object-center', 'object-fill')}
      width={57}
      height={57}
      src={pictureURL}
      alt={alt}
    />
    <div
      className={clsx('absolute', 'top-0', 'bg-gradient-to-b', 'from-transparent', 'to-black', 'h-full', 'w-full')}
    />
  </div>
)

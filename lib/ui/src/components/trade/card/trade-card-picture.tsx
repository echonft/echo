import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  pictureURL: Nullable<string>
  alt: string
}

export const TradeCardPicture: FunctionComponent<Props> = ({ pictureURL, alt }) => (
  <div className={clsx('w-full', 'h-full', 'relative')}>
    <SizeableImage
      className={clsx('select-none', 'w-[88px]', 'h-[88px]', 'object-center', 'object-fill')}
      width={88}
      height={88}
      src={pictureURL}
      alt={alt}
    />
    <div
      className={clsx('absolute', 'top-0', 'bg-gradient-to-b', 'from-transparent', 'to-black', 'h-full', 'w-full')}
    />
  </div>
)

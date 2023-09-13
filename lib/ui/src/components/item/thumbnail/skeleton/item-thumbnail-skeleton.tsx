import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import type { ItemThumbnailSize } from '@echo/ui/types/item-thumbnail-size'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  size?: ItemThumbnailSize
}

export const ItemThumbnailSkeleton: FunctionComponent<Props> = ({ size = SizeMD }) => (
  <div
    className={clsx(
      size === SizeMD && ['rounded-lg', 'w-32', 'h-[9.6275rem]'],
      size === SizeLG && ['rounded-2xl', 'w-52', 'h-[16.07rem]'],
      'bg-white/[0.08]',
      'animate-pulse'
    )}
  />
)

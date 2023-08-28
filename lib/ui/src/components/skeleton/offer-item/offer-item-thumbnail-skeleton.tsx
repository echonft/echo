import { OfferItemThumbnailSize } from '../../offer-item/offer-item-thumbnail-size'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferItemThumbnailSkeletonProps {
  size?: OfferItemThumbnailSize
}

export const OfferItemThumbnailSkeleton: FunctionComponent<OfferItemThumbnailSkeletonProps> = ({ size = SizeMD }) => (
  <div
    className={clsx(
      'flex',
      'flex-col',
      size === SizeMD && ['rounded-lg', 'w-32', 'h-[9.6275rem]'],
      size === SizeLG && ['rounded-2xl', 'w-52', 'h-[16.07rem]'],
      'bg-white/[0.08]',
      'animate-pulse'
    )}
  />
)

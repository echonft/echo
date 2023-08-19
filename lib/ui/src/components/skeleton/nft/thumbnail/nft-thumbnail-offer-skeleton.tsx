import { SizeLG, SizeMD } from '../../../../types/size'
import { NftThumbnailSize } from '../../../nft/nft-thumbnail-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferSkeletonProps {
  size?: NftThumbnailSize
}

export const NftThumbnailOfferSkeleton: FunctionComponent<NftThumbnailOfferSkeletonProps> = ({ size = SizeMD }) => (
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

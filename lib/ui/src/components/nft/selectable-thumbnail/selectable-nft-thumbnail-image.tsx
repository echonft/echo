'use client'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { SizeableImage } from '@echo/ui/components/base/sizeable-image'
import { PictureSize } from '@echo/ui/constants/picture-size'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  nft: OwnedNft
  onLoadComplete?: VoidFunction
}

export const SelectableNftThumbnailImage: FunctionComponent<Props> = ({ nft, onLoadComplete }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const loading = !loaded && !error

  if (error) {
    return (
      <div
        className={clsx('h-32', 'w-32', 'rounded-2xl', 'min-w-0', 'flex', 'flex-col', 'justify-center', 'items-center')}
      >
        <p className={clsx('prose-label-xs', 'text-white', 'truncate')}>{nft.collection.name}</p>
        <p className={clsx('prose-label-xs-light', 'text-white/70', 'truncate')}>{nftLabel(nft)}</p>
      </div>
    )
  }
  return (
    <div className={clsx('h-32', 'w-32', 'rounded-2xl')}>
      <SizeableImage
        className={clsx(
          'w-auto',
          'h-auto',
          'rounded-2xl',
          'transition-transform',
          'select-none',
          'object-center',
          'object-contain',
          'group-hover:scale-125'
        )}
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        width={PictureSize.MD}
        height={PictureSize.MD}
        onLoad={() => {
          setLoaded(true)
          onLoadComplete?.()
        }}
        onError={() => {
          setError(true)
          onLoadComplete?.()
        }}
      />
      <ImagePlaceholder show={loading} />
      <div className={clsx('absolute', 'inset-0', 'bg-nftCardGradient', loading && 'hidden')} />
    </div>
  )
}

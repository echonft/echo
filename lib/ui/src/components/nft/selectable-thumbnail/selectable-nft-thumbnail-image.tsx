'use client'
import type { Nft } from '@echo/model/types/nft'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { PICTURE_SIZE_MD } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent, useState } from 'react'

interface Props {
  nft: Nft
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
        <p className={clsx('prose-label-xs-light', 'text-white/70', 'truncate')}>
          {getTokenIdString(nft.tokenId, nft.collection.totalSupply)}
        </p>
      </div>
    )
  }
  return (
    <div className={clsx('h-32', 'w-32', 'rounded-2xl')}>
      <Image
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
        src={addPictureSizeToUrl(nft.pictureUrl, PICTURE_SIZE_MD)}
        alt={nft.tokenId.toString()}
        width={PICTURE_SIZE_MD}
        height={PICTURE_SIZE_MD}
        crossOrigin={'anonymous'}
        unoptimized={true}
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

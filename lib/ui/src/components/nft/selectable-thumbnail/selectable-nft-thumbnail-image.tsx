'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  nft: OwnedNft
  onLoadComplete?: VoidFunction
}

export const SelectableNftThumbnailImage: FunctionComponent<Props> = ({ nft, onLoadComplete }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (isNilOrEmpty(nft.pictureUrl) || error) {
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
    <div className={clsx('h-32', 'w-32', 'rounded-2xl', 'bg-dark-500', 'relative')}>
      <ImageSizeable
        className={clsx(
          'rounded-2xl',
          'bg-dark-500',
          'transition-transform',
          'select-none',
          'object-center',
          'object-contain',
          'group-hover:scale-125'
        )}
        src={nft.pictureUrl}
        alt={nftLabel(nft)}
        width={128}
        height={128}
        onLoad={() => {
          setLoaded(true)
          onLoadComplete?.()
        }}
        onError={() => {
          setError(true)
          onLoadComplete?.()
        }}
      />
      {loaded ? (
        <div className={clsx('absolute', 'inset-0', 'rounded-2xl', 'bg-cardImageGradient')} />
      ) : (
        <ImagePlaceholder className={clsx('rounded-2xl')} show={true} />
      )}
    </div>
  )
}

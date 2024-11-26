'use client'
import type { Nft } from '@echo/model/types/nft'
import { ImageNotFound } from '@echo/ui/components/base/image-not-found'
import { ImagePlaceholder } from '@echo/ui/components/base/image-placeholder'
import { ImageSizeable } from '@echo/ui/components/base/image-sizeable'
import { NftThumbnailPictureLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-picture-layout'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  nft: Nft
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ nft }) => {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (isNilOrEmpty(nft.pictureUrl) || error) {
    return <ImageNotFound width={128} height={128} className={clsx('rounded-lg', 'bg-dark-500')} />
  }

  return (
    <NftThumbnailPictureLayout>
      <ImageSizeable
        className={clsx('select-none', 'rounded-lg', 'bg-dark-500', 'w-auto', 'h-auto')}
        src={nft.pictureUrl}
        alt={nftLabel(nft)}
        width={128}
        height={128}
        priority={true}
        onLoad={() => {
          setLoaded(true)
        }}
        onError={() => {
          setLoaded(true)
          setError(true)
        }}
      />
      <ImagePlaceholder show={!loaded} />
    </NftThumbnailPictureLayout>
  )
}

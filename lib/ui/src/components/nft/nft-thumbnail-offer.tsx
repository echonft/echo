import { NftThumbnailOfferTitle } from './nft-thumbnail-offer-title'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { NftThumbnailSize } from './nft-thumbnail-size'
import { Nft } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferProps {
  nft: Nft
  onRemove?: (id: string) => unknown
}

export const NftThumbnailOffer: FunctionComponent<NftThumbnailOfferProps> = ({ nft }) => {
  const { id, name, tokenId, thumbnailUrl, owner, collection } = nft
  return (
    <div className={clsx('flex', 'flex-col', 'rounded-2xl', 'w-32', 'h-max', 'border', 'border-solid')}>
      <div className={'relative'}>
        <NftThumbnailPicture title={name} tokenId={tokenId} pictureUrl={thumbnailUrl} size={NftThumbnailSize.MEDIUM} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-2', 'rounded-b-2xl', 'bg-white/[0.08]', 'w-full', 'p-2')}>
        <NftThumbnailOfferTitle name={name} tokenId={tokenId} collectionName={collection.name} />
      </div>
    </div>
  )
}

import { Nft } from '../../types/nft'
import { SizeMD } from '../../types/size'
import { NftThumbnailOfferSelector } from './nft-thumbnail-offer-selector'
import { NftThumbnailOfferTitle } from './nft-thumbnail-offer-title'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferProps {
  nft: Nft
  onRemove?: (nft: Nft) => unknown
}

export const NftThumbnailOffer: FunctionComponent<NftThumbnailOfferProps> = ({ nft, onRemove }) => {
  const { name, tokenId, thumbnailUrl, collection } = nft
  return (
    <div className={clsx('flex', 'flex-col', 'rounded-2xl', 'w-32', 'h-max')}>
      <div className={'relative'}>
        <NftThumbnailPicture alt={name} tokenId={tokenId} pictureUrl={thumbnailUrl} size={SizeMD} />
        <NftThumbnailOfferSelector onRemove={() => onRemove?.(nft)} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-2', 'rounded-b-2xl', 'bg-white/[0.08]', 'w-full', 'p-2')}>
        <NftThumbnailOfferTitle name={name} tokenId={tokenId} collectionName={collection.name} />
      </div>
    </div>
  )
}

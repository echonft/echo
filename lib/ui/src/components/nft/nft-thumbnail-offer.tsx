import { Nft } from '../../types/nft'
import { SizeLG, SizeMD } from '../../types/size'
import { UserDiscordTagOffer } from '../user/user-discord-tag-offer'
import { NftThumbnailOfferSelector } from './nft-thumbnail-offer-selector'
import { NftThumbnailOfferTitle } from './nft-thumbnail-offer-title'
import { NftThumbnailPicture } from './nft-thumbnail-picture'
import { NftThumbnailSize } from './nft-thumbnail-size'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferProps {
  nft: Nft
  size?: NftThumbnailSize
  discordUsername?: string
  onRemove?: (nft: Nft) => unknown
}

export const NftThumbnailOffer: FunctionComponent<NftThumbnailOfferProps> = ({
  nft,
  discordUsername,
  size = SizeMD,
  onRemove
}) => {
  const { name, tokenId, thumbnailUrl, collection } = nft
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        size === SizeMD && ['rounded-lg', 'w-32'],
        size === SizeLG && ['rounded-2xl', 'w-52'],
        'h-max',
        'overflow-clip'
      )}
    >
      <div className={'relative'}>
        <NftThumbnailPicture alt={name} tokenId={tokenId} pictureUrl={thumbnailUrl} size={size} />

        {onRemove && <NftThumbnailOfferSelector onRemove={() => onRemove?.(nft)} />}
        {discordUsername && (
          <div className={clsx('absolute', 'bottom-[0.69rem]', 'left-2', 'z-10')}>
            <UserDiscordTagOffer owner={discordUsername} />
          </div>
        )}
      </div>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'bg-white/[0.08]',
          'w-full',
          size === SizeMD && ['px-1.5', 'pt-1', 'pb-2'],
          size === SizeLG && ['px-1', 'pt-2.5', 'pb-3.5']
        )}
      >
        <NftThumbnailOfferTitle tokenId={tokenId} collectionName={collection.name} size={size} />
      </div>
    </div>
  )
}

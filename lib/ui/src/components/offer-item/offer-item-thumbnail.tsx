import { NftThumbnailPicture } from '../nft/nft-thumbnail-picture'
import { UserDiscordTagOffer } from '../user/user-discord-tag-offer'
import { OfferItemThumbnailSelector } from './offer-item-thumbnail-selector'
import { OfferItemThumbnailSize } from './offer-item-thumbnail-size'
import { OfferItemThumbnailTitle } from './offer-item-thumbnail-title'
import { OfferItem, SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferItemThumbnailProps {
  item: OfferItem
  size: OfferItemThumbnailSize
  discordUsername?: string
  onRemove?: (item: OfferItem) => unknown
}

export const OfferItemThumbnail: FunctionComponent<OfferItemThumbnailProps> = ({
  item,
  discordUsername,
  size,
  onRemove
}) => {
  const { name, tokenId, thumbnailUrl, collection } = item.nft
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

        {onRemove && <OfferItemThumbnailSelector onRemove={() => onRemove?.(item)} />}
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
          size === SizeLG && ['px-2', 'pt-2.5', 'pb-3.5']
        )}
      >
        <OfferItemThumbnailTitle tokenId={tokenId} collectionName={collection.name} size={size} />
      </div>
    </div>
  )
}

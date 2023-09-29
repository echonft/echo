import { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ItemThumbnailSelector } from '@echo/ui/components/item/thumbnail/item-thumbnail-selector'
import { ItemThumbnailTitle } from '@echo/ui/components/item/thumbnail/item-thumbnail-title'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { UserDiscordTagOffer } from '@echo/ui/components/shared/user-discord-tag-offer'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import type { ItemThumbnailSize } from '@echo/ui/types/item-thumbnail-size'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  item: OfferItem | ListingItem | OfferItemResponse | ListingItemResponse
  size: ItemThumbnailSize
  discordUsername?: string
  onRemove?: (itemNftId: string) => unknown
}

export const ItemThumbnail: FunctionComponent<Props> = ({ item, discordUsername, size, onRemove }) => {
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
        <NftThumbnailPicture alt={name} pictureUrl={thumbnailUrl} size={size} />
        <HideIfNil
          checks={onRemove}
          render={(onRemove) => (
            <ItemThumbnailSelector
              onRemove={() => {
                onRemove?.(item.nft.id)
              }}
            />
          )}
        />
        <HideIfNil
          checks={discordUsername}
          render={(discordUsername) => (
            <div className={clsx('absolute', 'bottom-[0.69rem]', 'left-2', 'z-10')}>
              <UserDiscordTagOffer owner={discordUsername} />
            </div>
          )}
        />
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
        <ItemThumbnailTitle tokenId={tokenId} collectionName={collection.name} size={size} />
      </div>
    </div>
  )
}

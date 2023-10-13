import { ListingItemResponse } from '@echo/api/types/responses/model/listing-item-response'
import { OfferItemResponse } from '@echo/api/types/responses/model/offer-item-response'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ItemThumbnailSelector } from '@echo/ui/components/item/thumbnail/item-thumbnail-selector'
import { ItemThumbnailTitle } from '@echo/ui/components/item/thumbnail/item-thumbnail-title'
import { NftThumbnailPicture } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-picture'
import { SizeMD } from '@echo/ui/constants/size'
import { getNftName } from '@echo/ui/helpers/nft/get-nft-name'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  item: OfferItem | ListingItem | OfferItemResponse | ListingItemResponse
  onRemove?: (itemNftId: string) => unknown
}

export const ItemThumbnail: FunctionComponent<Props> = ({ item, onRemove }) => {
  const { tokenId, thumbnailUrl, collection } = item.nft
  const name = getNftName(item.nft)
  return (
    <div className={clsx('flex', 'flex-col', 'rounded-lg', 'w-32', 'h-max', 'overflow-clip')}>
      <div className={'relative'}>
        <NftThumbnailPicture alt={name} pictureUrl={thumbnailUrl} size={SizeMD} />
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
      </div>
      <div className={clsx('flex', 'flex-col', 'bg-white/[0.08]', 'w-full', 'px-1.5', 'pt-1', 'pb-2')}>
        <ItemThumbnailTitle tokenId={tokenId} collectionName={collection.name} />
      </div>
    </div>
  )
}

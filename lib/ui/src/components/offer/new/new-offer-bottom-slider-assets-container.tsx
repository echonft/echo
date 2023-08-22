<<<<<<<< HEAD:lib/ui/src/components/offer/new-offer-bottom-slider-items-container.tsx
import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
========
import { Nft } from '../../../types/nft'
import { NftThumbnailOffer } from '../../nft/nft-thumbnail-offer'
>>>>>>>> 46bfb6d0 (added offer row + refactored code structure):lib/ui/src/components/offer/new/new-offer-bottom-slider-assets-container.tsx
import { NewOfferAddMoreButton } from './new-offer-add-more-button'
import { NewOfferAssetsTitle } from './new-offer-assets-title'
import { NewOfferEmptyAssets } from './new-offer-empty-assets'
import { OfferItem } from '@echo/ui-model'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
  onAddMore?: () => unknown
  onRemove?: (item: OfferItem) => unknown
}

export const NewOfferBottomSliderItemsContainer: FunctionComponent<Props> = ({
  isReceiver,
  items = [],
  onAddMore,
  onRemove
}) => {
  const t = useTranslations('offer.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <NewOfferAssetsTitle isReceiving={isReceiving} title={t(isReceiving ? 'assetsInTitle' : 'assetsOutTitle')} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(items) ? (
          <NewOfferEmptyAssets onAddMore={onAddMore} />
        ) : (
          <>
            {items.map(({ amount, nft }) => (
              <NftThumbnailOffer
                nft={nft}
                key={nft.id}
                onRemove={(nftToRemove) => {
                  onRemove?.({ amount, nft: nftToRemove })
                }}
              />
            ))}
            <NewOfferAddMoreButton onClick={onAddMore} />)
          </>
        )}
      </div>
    </div>
  )
}

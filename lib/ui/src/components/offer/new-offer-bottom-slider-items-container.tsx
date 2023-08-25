import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
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
  const t = useTranslations('offer.new.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <NewOfferAssetsTitle isReceiver={isReceiver} title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(items) ? (
          <NewOfferEmptyAssets onAddMore={onAddMore} />
        ) : (
          <>
            {items.map(({ amount, nft, approved }) => (
              <NftThumbnailOffer
                nft={nft}
                key={nft.id}
                onRemove={(nftToRemove) => {
                  onRemove?.({ amount, nft: nftToRemove, approved })
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

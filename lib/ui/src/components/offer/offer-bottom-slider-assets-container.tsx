import { Nft } from '../../types/nft'
import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import { NftThumbnailOfferAddMore } from '../nft/nft-thumbnail-offer-add-more'
import { OfferBottomSliderAssetsTitle } from './offer-bottom-slider-assets-title'
import { OfferBottomSliderEmptyAssets } from './offer-bottom-slider-empty-assets'
import clsx from 'clsx'
import { isEmpty } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  assets: Nft[]
  onAddMore?: () => void
  onRemove?: (nft: Nft) => void
}

export const OfferBottomSliderAssetsContainer: FunctionComponent<Props> = ({
  isReceiver,
  assets = [],
  onAddMore,
  onRemove
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <OfferBottomSliderAssetsTitle isReceiver={isReceiver} />
      {/* We need to force height in case there is only the add more button */}
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(assets) ? (
          <OfferBottomSliderEmptyAssets onAddMore={onAddMore} />
        ) : (
          <>
            {assets.map((nft) => (
              <NftThumbnailOffer nft={nft} key={nft.id} onRemove={onRemove} />
            ))}
            <NftThumbnailOfferAddMore onClick={onAddMore} />)
          </>
        )}
      </div>
    </div>
  )
}

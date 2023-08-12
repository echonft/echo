import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import { NftThumbnailOfferAddMore } from '../nft/nft-thumbnail-offer-add-more'
import { OfferBottomSliderAssetsTitle } from './offer-bottom-slider-assets-title'
import { Nft } from '@echo/model'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  assets?: Nft[]
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
    <div className={clsx('flex', 'flex-col', 'gap-8')}>
      <OfferBottomSliderAssetsTitle isReceiver={isReceiver} />
      {/* We need to force height in case there is only the add more button */}
      <div className={clsx('flex', 'flex-row', 'gap-4', '!h-[174px]')}>
        {assets.map((nft) => (
          <NftThumbnailOffer nft={nft} key={nft.id} onRemove={onRemove} />
        ))}
        <NftThumbnailOfferAddMore onClick={onAddMore} />
      </div>
    </div>
  )
}

import { NftThumbnailOffer } from '../nft/nft-thumbnail-offer'
import { NftThumbnailOfferAddMore } from '../nft/nft-thumbnail-offer-add-more'
import { OfferBottomSliderAssetsTitle } from './offer-bottom-slider-assets-title'
import { Nft } from '@echo/model'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  counterparty: boolean
  assets?: Nft[]
}

export const OfferBottomSliderAssetsContainer: FunctionComponent<Props> = ({ counterparty, assets = [] }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-8')}>
      <OfferBottomSliderAssetsTitle counterparty={counterparty} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {assets.map((nft) => (
          <NftThumbnailOffer nft={nft} key={nft.id} />
        ))}
        <NftThumbnailOfferAddMore />
      </div>
      <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
    </div>
  )
}
